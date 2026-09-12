import { Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'

import { FieldConfigResolver } from './field-config.resolver.js'
import { FieldConfigService } from './field-config.service.js'

@Module({
  providers: [FieldConfigResolver, FieldConfigService],
  imports: [AbilityModule],
  exports: [FieldConfigService],
})
export class FieldConfigModule {}
