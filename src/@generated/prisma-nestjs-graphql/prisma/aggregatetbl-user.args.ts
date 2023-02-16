import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_userWhereInput } from '../tbl-user/tbl-user-where.input'
import { Type } from 'class-transformer'
import { tbl_userOrderByWithRelationInput } from '../tbl-user/tbl-user-order-by-with-relation.input'
import { tbl_userWhereUniqueInput } from '../tbl-user/tbl-user-where-unique.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class AggregatetblUserArgs {
  @Field(() => tbl_userWhereInput, { nullable: true })
  @Type(() => tbl_userWhereInput)
  where?: tbl_userWhereInput

  @Field(() => [tbl_userOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<tbl_userOrderByWithRelationInput>

  @Field(() => tbl_userWhereUniqueInput, { nullable: true })
  cursor?: tbl_userWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
