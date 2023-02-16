import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_selectionCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  classpickID!: number

  @Field(() => Int, { nullable: false })
  title!: number

  @Field(() => Int, { nullable: false })
  largerWork!: number

  @Field(() => Int, { nullable: false })
  movement!: number

  @Field(() => Int, { nullable: false })
  composer!: number

  @Field(() => Int, { nullable: false })
  duration!: number

  @Field(() => Int, { nullable: false })
  createdAt!: number

  @Field(() => Int, { nullable: false })
  updatedAt!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
