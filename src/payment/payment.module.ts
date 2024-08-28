import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { StripeModule } from '@/stripe/stripe.module'

@Module({
  controllers: [PaymentController],
  providers: [PaymentModule, PaymentService],
  imports: [
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_SERVER_KEY'),
        options: {
          apiVersion: '2024-06-20',
        },
      }),
    }),
  ],
})
export class PaymentModule {}
