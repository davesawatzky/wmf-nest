import {
  RawBodyRequest,
} from '@nestjs/common'
import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PaymentService } from './payment.service'
import { PaymentCreateDto } from './dto/payment.dto'

@Controller('payment')
// @UseGuards(RestJwtAuthGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly configService: ConfigService,
  ) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: PaymentCreateDto) {
    const calculateOrderAmount = body.amount

    const paymentIntent = await this.paymentService.createPaymentIntent(
      calculateOrderAmount,
      'cad',
    )
    return { clientSecret: paymentIntent.client_secret }
  }

  @Post('webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = await this.configService.get('STRIPE_WEBHOOK_KEY')
    return await this.paymentService.webhook(req, signature, endpointSecret)
  }
}
