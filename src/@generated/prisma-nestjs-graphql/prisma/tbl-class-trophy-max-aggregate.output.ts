import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_class_trophyMaxAggregate {
  @Field(() => Int, { nullable: true })
  classID?: number

  @Field(() => Int, { nullable: true })
  trophyID?: number
}
