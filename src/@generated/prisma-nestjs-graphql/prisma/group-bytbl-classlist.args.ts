import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_classlistWhereInput } from '../tbl-classlist/tbl-classlist-where.input'
import { Type } from 'class-transformer'
import { tbl_classlistOrderByWithAggregationInput } from '../tbl-classlist/tbl-classlist-order-by-with-aggregation.input'
import { Tbl_classlistScalarFieldEnum } from './tbl-classlist-scalar-field.enum'
import { tbl_classlistScalarWhereWithAggregatesInput } from '../tbl-classlist/tbl-classlist-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblClasslistArgs {
  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  where?: tbl_classlistWhereInput

  @Field(() => [tbl_classlistOrderByWithAggregationInput], { nullable: true })
  @Type(() => tbl_classlistOrderByWithAggregationInput)
  orderBy?: Array<tbl_classlistOrderByWithAggregationInput>

  @Field(() => [Tbl_classlistScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_classlistScalarFieldEnum>

  @Field(() => tbl_classlistScalarWhereWithAggregatesInput, { nullable: true })
  @Type(() => tbl_classlistScalarWhereWithAggregatesInput)
  having?: tbl_classlistScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
