import { HttpException, Injectable, RawBodyRequest } from '@nestjs/common'
import { StripeService } from '@/stripe/stripe.service'

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripeService.stripe.paymentIntents.create({
      amount,
      currency,
    })
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
