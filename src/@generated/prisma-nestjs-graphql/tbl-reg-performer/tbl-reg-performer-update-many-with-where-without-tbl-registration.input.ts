import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_performerScalarWhereInput } from './tbl-reg-performer-scalar-where.input'
import { Type } from 'class-transformer'
import { tbl_reg_performerUpdateManyMutationInput } from './tbl-reg-performer-update-many-mutation.input'

@InputType()
export class tbl_reg_performerUpdateManyWithWhereWithoutTbl_registrationInput {
  @Field(() => tbl_reg_performerScalarWhereInput, { nullable: false })
  @Type(() => tbl_reg_performerScalarWhereInput)
  where!: tbl_reg_performerScalarWhereInput

  @Field(() => tbl_reg_performerUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_reg_performerUpdateManyMutationInput)
  data!: tbl_reg_performerUpdateManyMutationInput
}
