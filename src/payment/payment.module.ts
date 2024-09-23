import { StripeModule } from '@/stripe/stripe.module'
import {RegistrationModule} from '@/submissions/registration/registration.module'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
          apiVersion: '2024-06-20',
        },
      }),
    }),
  ],
})
export class PaymentModule {}
