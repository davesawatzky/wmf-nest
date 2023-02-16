import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_schoolCreateInput } from '../tbl-reg-school/tbl-reg-school-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblRegSchoolArgs {
  @Field(() => tbl_reg_schoolCreateInput, { nullable: false })
  @Type(() => tbl_reg_schoolCreateInput)
  data!: tbl_reg_schoolCreateInput
}
