import { Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { FieldConfigResolver } from './field-config.resolver'
import { FieldConfigService } from './field-config.service'

@Module({
  providers: [FieldConfigResolver, FieldConfigService],
  imports: [AbilityModule],
  exports: [FieldConfigService],
})
export class FieldConfigModule {}
