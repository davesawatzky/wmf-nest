import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_groupCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => Int, { nullable: false })
  name!: number

  @Field(() => Int, { nullable: false })
  groupType!: number

  @Field(() => Int, { nullable: false })
  numberOfPerformers!: number

  @Field(() => Int, { nullable: false })
  age!: number

  @Field(() => Int, { nullable: false })
  instruments!: number

  @Field(() => Int, { nullable: false })
  createdAt!: number

  @Field(() => Int, { nullable: false })
  updatedAt!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
