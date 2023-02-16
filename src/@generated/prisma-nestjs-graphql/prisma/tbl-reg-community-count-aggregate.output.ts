import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_communityCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => Int, { nullable: false })
  name!: number

  @Field(() => Int, { nullable: false })
  groupSize!: number

  @Field(() => Int, { nullable: false })
  chaperones!: number

  @Field(() => Int, { nullable: false })
  wheelchairs!: number

  @Field(() => Int, { nullable: false })
  earliestTime!: number

  @Field(() => Int, { nullable: false })
  latestTime!: number

  @Field(() => Int, { nullable: false })
  unavailable!: number

  @Field(() => Int, { nullable: false })
  conflictPerformers!: number

  @Field(() => Int, { nullable: false })
  createdAt!: number

  @Field(() => Int, { nullable: false })
  updatedAt!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
