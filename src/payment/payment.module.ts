import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { StripeModule } from '@/stripe/stripe.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

@Module({
  controllers: [PaymentController],
  providers: [PaymentModule, PaymentService],
  imports: [
    RegistrationModule,
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_SERVER_KEY'),
        options: {
          apiVersion: '2025-10-29.clover',
        },
      }),
    }),
  ],
})
export class PaymentModule {}
