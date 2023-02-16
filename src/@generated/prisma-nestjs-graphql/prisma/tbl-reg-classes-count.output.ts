import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_reg_classesCount {
  @Field(() => Int, { nullable: false })
  tbl_reg_selection!: number
}
