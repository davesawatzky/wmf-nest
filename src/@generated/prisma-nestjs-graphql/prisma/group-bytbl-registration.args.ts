import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_registrationWhereInput } from '../tbl-registration/tbl-registration-where.input'
import { Type } from 'class-transformer'
import { tbl_registrationOrderByWithAggregationInput } from '../tbl-registration/tbl-registration-order-by-with-aggregation.input'
import { Tbl_registrationScalarFieldEnum } from './tbl-registration-scalar-field.enum'
import { tbl_registrationScalarWhereWithAggregatesInput } from '../tbl-registration/tbl-registration-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class GroupBytblRegistrationArgs {
  @Field(() => tbl_registrationWhereInput, { nullable: true })
  @Type(() => tbl_registrationWhereInput)
  where?: tbl_registrationWhereInput

  @Field(() => [tbl_registrationOrderByWithAggregationInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationOrderByWithAggregationInput)
  orderBy?: Array<tbl_registrationOrderByWithAggregationInput>

  @Field(() => [Tbl_registrationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof Tbl_registrationScalarFieldEnum>

  @Field(() => tbl_registrationScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationScalarWhereWithAggregatesInput)
  having?: tbl_registrationScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
