import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_registrationCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  userID!: number

  @Field(() => Int, { nullable: false })
  label!: number

  @Field(() => Int, { nullable: false })
  performerType!: number

  @Field(() => Int, { nullable: false })
  submittedAt!: number

  @Field(() => Int, { nullable: false })
  totalAmt!: number

  @Field(() => Int, { nullable: false })
  payedAmt!: number

  @Field(() => Int, { nullable: false })
  transactionInfo!: number

  @Field(() => Int, { nullable: false })
  confirmation!: number

  @Field(() => Int, { nullable: false })
  createdAt!: number

  @Field(() => Int, { nullable: false })
  updatedAt!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
