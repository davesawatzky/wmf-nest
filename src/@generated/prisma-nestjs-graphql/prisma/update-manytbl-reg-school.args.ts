import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_schoolUpdateManyMutationInput } from '../tbl-reg-school/tbl-reg-school-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_reg_schoolWhereInput } from '../tbl-reg-school/tbl-reg-school-where.input'

@ArgsType()
export class UpdateManytblRegSchoolArgs {
  @Field(() => tbl_reg_schoolUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_reg_schoolUpdateManyMutationInput)
  data!: tbl_reg_schoolUpdateManyMutationInput

  @Field(() => tbl_reg_schoolWhereInput, { nullable: true })
  @Type(() => tbl_reg_schoolWhereInput)
  where?: tbl_reg_schoolWhereInput
}
