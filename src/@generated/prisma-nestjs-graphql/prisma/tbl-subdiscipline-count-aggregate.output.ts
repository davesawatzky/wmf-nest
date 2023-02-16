import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_subdisciplineCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  disciplineID!: number

  @Field(() => Int, { nullable: false })
  name!: number

  @Field(() => Int, { nullable: false })
  description!: number

  @Field(() => Int, { nullable: false })
  maxPerformers!: number

  @Field(() => Int, { nullable: false })
  minPerformers!: number

  @Field(() => Int, { nullable: false })
  SGSlabel!: number

  @Field(() => Int, { nullable: false })
  price!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
