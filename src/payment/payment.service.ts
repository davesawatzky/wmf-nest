import { StripeService } from '@/stripe/stripe.service'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { HttpException, Injectable, RawBodyRequest } from '@nestjs/common'

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly registrationService: RegistrationService,
  ) {}

  async createPaymentIntent(regID: number, WMFconfirmationId: string, tokenId: string) {
    const { totalAmt } = await this.registrationService.findOne(regID)
    const confirmationToken = await this.stripeService.stripe.confirmationTokens.retrieve(tokenId)
    const { totalAmount } = this.findPaymentDetails(Number(totalAmt), confirmationToken)
    return await this.stripeService.stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'cad',
      metadata: {
        WMF_Confirmation_ID: WMFconfirmationId,
      }
    })
  }

  async summarizePayment(regID: number, tokenId: string) {
    const { totalAmt } = await this.registrationService.findOne(regID)
    const confirmationToken = await this.stripeService.stripe.confirmationTokens.retrieve(tokenId)
    const { amount, stripeFee, totalAmount } = this.findPaymentDetails(Number(totalAmt), confirmationToken)
    return { amount, stripeFee, totalAmount, confirmationToken }
  }

  private findPaymentDetails(amount: number, token: any): { amount: number, stripeFee: string, totalAmount: number } {
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
    return { amount, stripeFee, totalAmount }
  }

  async webhook(
    req: RawBodyRequest<Request>,
    signature: string,
    endpointSecret: string,
  ) {
    let event

    try {
      event = this.stripeService.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret,
      )
    }
    catch (err: any) {
      throw new HttpException(`Webhook Error: ${err.message}`, 400)
    }
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        console.log('Payment successful!')
        break
      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object
        console.log('Payment failed')
        break
      case 'payment_intent.processing':
        const paymentIntentProcess = event.data.object
        console.log('Payment processing')
        break
      default:
        console.log(`Unhandled event type ${event.type} switch`)
        break
    }
  }
}
