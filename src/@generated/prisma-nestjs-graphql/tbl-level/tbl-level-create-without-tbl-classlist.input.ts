import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@InputType()
export class tbl_levelCreateWithoutTbl_classlistInput {
  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Int, { nullable: true })
  order?: number
}
