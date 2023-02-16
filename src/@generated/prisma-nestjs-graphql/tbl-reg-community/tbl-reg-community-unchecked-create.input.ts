import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@InputType()
export class tbl_reg_communityUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => Int, { nullable: false })
  regID!: number

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => Int, { nullable: true })
  groupSize?: number

  @Field(() => Int, { nullable: true })
  chaperones?: number

  @Field(() => Int, { nullable: true })
  wheelchairs?: number

  @Field(() => String, { nullable: true })
  earliestTime?: string

  @Field(() => String, { nullable: true })
  latestTime?: string

  @Field(() => String, { nullable: true })
  unavailable?: string

  @Field(() => String, { nullable: true })
  conflictPerformers?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string
}
