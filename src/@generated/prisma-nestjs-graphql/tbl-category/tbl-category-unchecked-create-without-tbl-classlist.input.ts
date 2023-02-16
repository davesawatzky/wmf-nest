import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@InputType()
export class tbl_categoryUncheckedCreateWithoutTbl_classlistInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  requiredComposer?: string
}
