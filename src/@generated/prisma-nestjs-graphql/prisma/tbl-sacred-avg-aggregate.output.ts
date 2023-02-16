import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Float } from '@nestjs/graphql'

@ObjectType()
export class Tbl_sacredAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number
}
