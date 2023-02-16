import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_registrationCreateNestedOneWithoutTbl_reg_communityInput } from '../tbl-registration/tbl-registration-create-nested-one-without-tbl-reg-community.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_communityCreateInput {
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

  @Field(() => tbl_registrationCreateNestedOneWithoutTbl_reg_communityInput, {
    nullable: false,
  })
  @Type(() => tbl_registrationCreateNestedOneWithoutTbl_reg_communityInput)
  tbl_registration!: tbl_registrationCreateNestedOneWithoutTbl_reg_communityInput
}
