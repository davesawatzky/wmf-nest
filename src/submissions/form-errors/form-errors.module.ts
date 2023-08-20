import { Module } from '@nestjs/common'
import { FormErrorsService } from './form-errors.service'
import { FormErrorsResolver } from './form-errors.resolver'

@Module({
  providers: [FormErrorsResolver, FormErrorsService],
  exports: [FormErrorsService],
})
export class FormErrorsModule {}
