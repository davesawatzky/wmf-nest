import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaModule } from '@/prisma/prisma.module.js'
import { StripeModule } from '@/stripe/stripe.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'
import { PaymentController } from './payment.controller.js'
import { PaymentService } from './payment.service.js'

@Module({
  controllers: [PaymentController],
  providers: [PaymentModule, PaymentService],
  imports: [
    RegistrationModule,
    PrismaModule,
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_SERVER_KEY'),
        options: {
          apiVersion: '2025-10-29.clover' as any,
        },
      }),
    }),
  ],
})
export class PaymentModule {}
