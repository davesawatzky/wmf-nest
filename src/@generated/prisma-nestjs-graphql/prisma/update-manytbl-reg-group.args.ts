import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_groupUpdateManyMutationInput } from '../tbl-reg-group/tbl-reg-group-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_reg_groupWhereInput } from '../tbl-reg-group/tbl-reg-group-where.input'

@ArgsType()
export class UpdateManytblRegGroupArgs {
  @Field(() => tbl_reg_groupUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_reg_groupUpdateManyMutationInput)
  data!: tbl_reg_groupUpdateManyMutationInput

  @Field(() => tbl_reg_groupWhereInput, { nullable: true })
  @Type(() => tbl_reg_groupWhereInput)
  where?: tbl_reg_groupWhereInput
}
