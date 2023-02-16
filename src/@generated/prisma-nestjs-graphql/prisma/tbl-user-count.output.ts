import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_userCount {
  @Field(() => Int, { nullable: false })
  tbl_registration!: number
}
