import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_unavailableWhereInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_unavailableOrderByWithRelationInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-order-by-with-relation.input'
import { tbl_reg_unavailableWhereUniqueInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-where-unique.input'
import { Int } from '@nestjs/graphql'
import { Tbl_reg_unavailableScalarFieldEnum } from './tbl-reg-unavailable-scalar-field.enum'

@ArgsType()
export class FindManytblRegUnavailableArgs {
  @Field(() => tbl_reg_unavailableWhereInput, { nullable: true })
  @Type(() => tbl_reg_unavailableWhereInput)
  where?: tbl_reg_unavailableWhereInput

  @Field(() => [tbl_reg_unavailableOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: Array<tbl_reg_unavailableOrderByWithRelationInput>

  @Field(() => tbl_reg_unavailableWhereUniqueInput, { nullable: true })
  cursor?: tbl_reg_unavailableWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => [Tbl_reg_unavailableScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof Tbl_reg_unavailableScalarFieldEnum>
}
