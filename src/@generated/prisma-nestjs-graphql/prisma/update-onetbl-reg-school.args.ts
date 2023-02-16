import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_schoolUpdateInput } from '../tbl-reg-school/tbl-reg-school-update.input'
import { Type } from 'class-transformer'
import { tbl_reg_schoolWhereUniqueInput } from '../tbl-reg-school/tbl-reg-school-where-unique.input'

@ArgsType()
export class UpdateOnetblRegSchoolArgs {
  @Field(() => tbl_reg_schoolUpdateInput, { nullable: false })
  @Type(() => tbl_reg_schoolUpdateInput)
  data!: tbl_reg_schoolUpdateInput

  @Field(() => tbl_reg_schoolWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_schoolWhereUniqueInput)
  where!: tbl_reg_schoolWhereUniqueInput
}
