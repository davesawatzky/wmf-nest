import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger, RawBodyRequest } from '@nestjs/common'
import { StripeService } from '@/stripe/stripe.service'
import { RegistrationService } from '@/submissions/registration/registration.service'

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name)

  constructor(
    private readonly stripeService: StripeService,
    private readonly registrationService: RegistrationService,
  ) {}

  async createPaymentIntent(regID: number, WMFconfirmationId: string, tokenId: string) {
    this.logger.debug(`Creating payment intent for registration ID: ${regID}, confirmation ID: ${WMFconfirmationId}`)

    if (!regID || !WMFconfirmationId || !tokenId) {
      this.logger.warn('Missing required parameters for payment intent creation', { regID, WMFconfirmationId, tokenId })
      throw new BadRequestException('Registration ID, confirmation ID, and token ID are required')
    }

    try {
      const { totalAmt } = await this.registrationService.findOne(regID)

      if (!totalAmt || Number(totalAmt) <= 0) {
        this.logger.warn(`Invalid total amount for registration ID ${regID}: ${totalAmt}`)
        throw new BadRequestException('Invalid total amount for payment')
      }

      const confirmationToken = await this.stripeService.stripe.confirmationTokens.retrieve(tokenId)
      const { totalAmount } = this.findPaymentDetails(Number(totalAmt), confirmationToken)

      const paymentIntent = await this.stripeService.stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency: 'cad',
        metadata: {
          WMF_Confirmation_ID: WMFconfirmationId,
        },
      })

      this.logger.log(`Successfully created payment intent for registration ID: ${regID}, amount: $${totalAmount}`)
      return paymentIntent
    }
    catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error
      }

      this.logger.error(`Failed to create payment intent for registration ID ${regID}: ${error.message}`, error.stack)
      throw new InternalServerErrorException('Failed to create payment intent')
    }
  }

  async summarizePayment(regID: number, tokenId: string) {
    this.logger.debug(`Summarizing payment for registration ID: ${regID}`)

    if (!regID || !tokenId) {
      this.logger.warn('Missing required parameters for payment summary', { regID, tokenId })
      throw new BadRequestException('Registration ID and token ID are required')
    }

    try {
      const { totalAmt } = await this.registrationService.findOne(regID)

      if (!totalAmt || Number(totalAmt) <= 0) {
        this.logger.warn(`Invalid total amount for registration ID ${regID}: ${totalAmt}`)
        throw new BadRequestException('Invalid total amount for payment')
      }

      const confirmationToken = await this.stripeService.stripe.confirmationTokens.retrieve(tokenId)
      const { amount, stripeFee, totalAmount } = this.findPaymentDetails(Number(totalAmt), confirmationToken)

      this.logger.log(`Successfully summarized payment for registration ID: ${regID}, total: $${totalAmount}`)
      return { amount, stripeFee, totalAmount, confirmationToken }
    }
    catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error
      }

      this.logger.error(`Failed to summarize payment for registration ID ${regID}: ${error.message}`, error.stack)
      throw new InternalServerErrorException('Failed to summarize payment')
    }
  }

  private findPaymentDetails(amount: number, token: any): { amount: number, stripeFee: string, totalAmount: number } {
    this.logger.debug(`Calculating payment details for amount: $${amount}`)

    const domesticFeePercent: number = 0.029
    const internationalFeePercent: number = 0.008
    const transactionFee: number = 0.3

    const country: string = token.payment_method_preview.card.country
    let stripeFee: string

    if (country === 'CA') {
      stripeFee = (
        Number(amount + transactionFee) / (1 - domesticFeePercent) - amount
      ).toFixed(2)
    }
    else {
      stripeFee = (
        Number(amount + transactionFee) / (1 - (domesticFeePercent + internationalFeePercent)) - amount
      ).toFixed(2)
    }

    const totalAmount = amount + Number(stripeFee)

    this.logger.debug(`Payment calculation completed`, {
      amount,
      stripeFee,
      totalAmount,
      country,
      isDomestic: country === 'CA',
    })

    return { amount, stripeFee, totalAmount }
  }

  async webhook(
    req: RawBodyRequest<Request>,
    signature: string,
    endpointSecret: string,
  ) {
    this.logger.debug('Processing webhook request')

    let event

    try {
      event = this.stripeService.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret,
      )

      this.logger.debug(`Webhook event received: ${event.type}`)
    }
    catch (err: any) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`, err.stack)
      throw new HttpException(`Webhook Error: ${err.message}`, 400)
    }

    // Handle the event
    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntentSucceeded = event.data.object
          this.logger.log(`Payment successful for payment intent: ${paymentIntentSucceeded.id}`, {
            paymentIntentId: paymentIntentSucceeded.id,
            amount: paymentIntentSucceeded.amount,
            currency: paymentIntentSucceeded.currency,
            metadata: paymentIntentSucceeded.metadata,
          })
          break
        }
        case 'payment_intent.payment_failed': {
          const paymentIntentFailed = event.data.object
          this.logger.warn(`Payment failed for payment intent: ${paymentIntentFailed.id}`, {
            paymentIntentId: paymentIntentFailed.id,
            lastPaymentError: paymentIntentFailed.last_payment_error,
            metadata: paymentIntentFailed.metadata,
          })
          break
        }
        case 'payment_intent.processing': {
          const paymentIntentProcess = event.data.object
          this.logger.log(`Payment processing for payment intent: ${paymentIntentProcess.id}`, {
            paymentIntentId: paymentIntentProcess.id,
            metadata: paymentIntentProcess.metadata,
          })
          break
        }
        default: {
          this.logger.warn(`Unhandled webhook event type: ${event.type}`, { eventType: event.type })
          break
        }
      }
    }
    catch (error: any) {
      this.logger.error(`Error processing webhook event ${event.type}: ${error.message}`, error.stack)
      throw new InternalServerErrorException('Failed to process webhook event')
    }
  }
}
