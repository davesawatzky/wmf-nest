import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_groupCount {
  @Field(() => Int, { nullable: false })
  tbl_reg_unavailable!: number
}
