import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_classesScalarWhereInput } from './tbl-reg-classes-scalar-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesUpdateManyMutationInput } from './tbl-reg-classes-update-many-mutation.input'

@InputType()
export class tbl_reg_classesUpdateManyWithWhereWithoutTbl_registrationInput {
  @Field(() => tbl_reg_classesScalarWhereInput, { nullable: false })
  @Type(() => tbl_reg_classesScalarWhereInput)
  where!: tbl_reg_classesScalarWhereInput

  @Field(() => tbl_reg_classesUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_reg_classesUpdateManyMutationInput)
  data!: tbl_reg_classesUpdateManyMutationInput
}
