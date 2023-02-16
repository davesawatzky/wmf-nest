import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_subdisciplineWhereInput } from '../tbl-subdiscipline/tbl-subdiscipline-where.input'
import { Type } from 'class-transformer'
import { tbl_subdisciplineOrderByWithAggregationInput } from '../tbl-subdiscipline/tbl-subdiscipline-order-by-with-aggregation.input'
import { Tbl_subdisciplineScalarFieldEnum } from './tbl-subdiscipline-scalar-field.enum'
import { tbl_subdisciplineScalarWhereWithAggregatesInput } from '../tbl-subdiscipline/tbl-subdiscipline-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblSubdisciplineArgs {
  @Field(() => tbl_subdisciplineWhereInput, { nullable: true })
  @Type(() => tbl_subdisciplineWhereInput)
  where?: tbl_subdisciplineWhereInput

  @Field(() => [tbl_subdisciplineOrderByWithAggregationInput], {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineOrderByWithAggregationInput)
  orderBy?: Array<tbl_subdisciplineOrderByWithAggregationInput>

  @Field(() => [Tbl_subdisciplineScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_subdisciplineScalarFieldEnum>

  @Field(() => tbl_subdisciplineScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineScalarWhereWithAggregatesInput)
  having?: tbl_subdisciplineScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
