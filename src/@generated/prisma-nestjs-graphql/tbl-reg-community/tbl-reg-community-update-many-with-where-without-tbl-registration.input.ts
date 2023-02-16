import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_communityScalarWhereInput } from './tbl-reg-community-scalar-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_communityUpdateManyMutationInput } from './tbl-reg-community-update-many-mutation.input'

@InputType()
export class tbl_reg_communityUpdateManyWithWhereWithoutTbl_registrationInput {
  @Field(() => tbl_reg_communityScalarWhereInput, { nullable: false })
  @Type(() => tbl_reg_communityScalarWhereInput)
  where!: tbl_reg_communityScalarWhereInput

  @Field(() => tbl_reg_communityUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_reg_communityUpdateManyMutationInput)
  data!: tbl_reg_communityUpdateManyMutationInput
}
