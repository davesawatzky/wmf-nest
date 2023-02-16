import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_trophyCount {
  @Field(() => Int, { nullable: false })
  tbl_class_trophy!: number
}
