import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigurableModuleClass } from './stripe.module-definition'
import { StripeService } from './stripe.service'

@Module({
  imports: [ConfigModule],
  providers: [StripeModule, StripeService],
  exports: [StripeService],
})
export class StripeModule extends ConfigurableModuleClass {}
