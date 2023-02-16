import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class tbl_reg_selectionCreateWithoutTbl_reg_classesInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  largerWork?: string

  @Field(() => String, { nullable: true })
  movement?: string

  @Field(() => String, { nullable: true })
  composer?: string

  @Field(() => String, { nullable: true })
  duration?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string
}
