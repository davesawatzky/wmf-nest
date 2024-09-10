import { Module } from '@nestjs/common'
import { FieldConfigResolver } from './field-config.resolver'
import { FieldConfigService } from './field-config.service'

@Module({
  providers: [FieldConfigResolver, FieldConfigService],
  exports: [FieldConfigService],
})
export class FieldConfigModule {}
