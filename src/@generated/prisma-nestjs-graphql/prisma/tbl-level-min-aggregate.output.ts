import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_levelMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Int, { nullable: true })
  order?: number
}
