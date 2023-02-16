import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@InputType()
export class tbl_reg_schoolWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: true })
  regID?: number
}
