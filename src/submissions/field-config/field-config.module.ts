import { Module } from '@nestjs/common'
import { FieldConfigService } from './field-config.service'
import { FieldConfigResolver } from './field-config.resolver'

@Module({
  providers: [FieldConfigResolver, FieldConfigService],
  exports: [FieldConfigService],
})
export class FieldConfigModule {}
