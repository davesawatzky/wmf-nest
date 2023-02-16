import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_groupSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: true })
  regID?: number

  @Field(() => Int, { nullable: true })
  numberOfPerformers?: number

  @Field(() => Int, { nullable: true })
  age?: number
}
