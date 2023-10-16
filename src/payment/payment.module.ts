import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { StripeModule } from '../stripe/stripe.module'
import { ConfigService } from '@nestjs/config'

@Module({
  controllers: [PaymentController],
  providers: [PaymentModule, PaymentService],
  imports: [
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_SERVER_KEY'),
        options: {
          apiVersion: '2023-08-16',
        },
      }),
    }),
  ],
})
export class PaymentModule {}
