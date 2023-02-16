import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@InputType()
export class tbl_reg_groupCreateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  groupType?: string

  @Field(() => Int, { nullable: true })
  numberOfPerformers?: number

  @Field(() => Int, { nullable: true })
  age?: number

  @Field(() => String, { nullable: true })
  instruments?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string
}
