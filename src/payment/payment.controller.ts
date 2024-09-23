import { RestJwtAuthGuard } from '@/auth/jwt-auth.guard'
import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PaymentCreateDto } from './dto/payment.dto'
import { PaymentService } from './payment.service'

@Controller('payment')
// @UseGuards(RestJwtAuthGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/summarize-payment')
  // @UseGuards(RestJwtAuthGuard)
  async summarizePayment(@Body() body) {
    const { regId, tokenId } = body
    const paymentDetails = await this.paymentService.summarizePayment(regId, tokenId)
    return paymentDetails
  }

  @Post('create-payment-intent')
  // @UseGuards(RestJwtAuthGuard)
  async createPaymentIntent(@Body() body) {
    const { regId, WMFconfirmationId, tokenId } = body
    const paymentIntent = await this.paymentService.createPaymentIntent(regId, WMFconfirmationId, tokenId)
    console.log(paymentIntent)
    return {
      totalPayment: paymentIntent.amount,
      client_secret: paymentIntent.client_secret,
    }
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
