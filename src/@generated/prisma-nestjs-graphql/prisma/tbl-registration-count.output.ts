import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class Tbl_registrationCount {
  @Field(() => Int, { nullable: false })
  tbl_reg_classes!: number

  @Field(() => Int, { nullable: false })
  tbl_reg_community!: number

  @Field(() => Int, { nullable: false })
  tbl_reg_group!: number

  @Field(() => Int, { nullable: false })
  tbl_reg_performer!: number
}
