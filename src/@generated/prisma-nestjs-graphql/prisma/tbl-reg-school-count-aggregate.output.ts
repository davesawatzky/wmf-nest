import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_schoolCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => Int, { nullable: false })
  name!: number

  @Field(() => Int, { nullable: false })
  division!: number

  @Field(() => Int, { nullable: false })
  streetNumber!: number

  @Field(() => Int, { nullable: false })
  streetName!: number

  @Field(() => Int, { nullable: false })
  city!: number

  @Field(() => Int, { nullable: false })
  province!: number

  @Field(() => Int, { nullable: false })
  postalCode!: number

  @Field(() => Int, { nullable: false })
  phone!: number

  @Field(() => Int, { nullable: false })
  createdAt!: number

  @Field(() => Int, { nullable: false })
  updatedAt!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
