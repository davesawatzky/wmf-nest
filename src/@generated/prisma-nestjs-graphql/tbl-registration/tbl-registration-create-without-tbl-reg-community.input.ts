import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registration_performerType } from './tbl-registration-performer-type.enum'
import { Decimal } from '@prisma/client/runtime'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'
import { transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform } from 'class-transformer'
import { Type } from 'class-transformer'
import { tbl_userCreateNestedOneWithoutTbl_registrationInput } from '../tbl-user/tbl-user-create-nested-one-without-tbl-registration.input'
import { tbl_reg_classesCreateNestedManyWithoutTbl_registrationInput } from '../tbl-reg-classes/tbl-reg-classes-create-nested-many-without-tbl-registration.input'
import { tbl_reg_groupCreateNestedManyWithoutTbl_registrationInput } from '../tbl-reg-group/tbl-reg-group-create-nested-many-without-tbl-registration.input'
import { tbl_reg_performerCreateNestedManyWithoutTbl_registrationInput } from '../tbl-reg-performer/tbl-reg-performer-create-nested-many-without-tbl-registration.input'
import { tbl_reg_schoolCreateNestedOneWithoutTbl_registrationInput } from '../tbl-reg-school/tbl-reg-school-create-nested-one-without-tbl-registration.input'
import { tbl_reg_teacherCreateNestedOneWithoutTbl_registrationInput } from '../tbl-reg-teacher/tbl-reg-teacher-create-nested-one-without-tbl-registration.input'

@InputType()
export class tbl_registrationCreateWithoutTbl_reg_communityInput {
  @Field(() => String, { nullable: true })
  label?: string

  @Field(() => tbl_registration_performerType, { nullable: true })
  performerType?: keyof typeof tbl_registration_performerType

  @Field(() => Date, { nullable: true })
  submittedAt?: Date | string

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  totalAmt?: Decimal

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  payedAmt?: Decimal

  @Field(() => String, { nullable: true })
  transactionInfo?: string

  @Field(() => String, { nullable: true })
  confirmation?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string

  @Field(() => tbl_userCreateNestedOneWithoutTbl_registrationInput, {
    nullable: true,
  })
  @Type(() => tbl_userCreateNestedOneWithoutTbl_registrationInput)
  tbl_user?: tbl_userCreateNestedOneWithoutTbl_registrationInput

  @Field(() => tbl_reg_classesCreateNestedManyWithoutTbl_registrationInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_classesCreateNestedManyWithoutTbl_registrationInput)
  tbl_reg_classes?: tbl_reg_classesCreateNestedManyWithoutTbl_registrationInput

  @Field(() => tbl_reg_groupCreateNestedManyWithoutTbl_registrationInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_groupCreateNestedManyWithoutTbl_registrationInput)
  tbl_reg_group?: tbl_reg_groupCreateNestedManyWithoutTbl_registrationInput

  @Field(() => tbl_reg_performerCreateNestedManyWithoutTbl_registrationInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_performerCreateNestedManyWithoutTbl_registrationInput)
  tbl_reg_performer?: tbl_reg_performerCreateNestedManyWithoutTbl_registrationInput

  @Field(() => tbl_reg_schoolCreateNestedOneWithoutTbl_registrationInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_schoolCreateNestedOneWithoutTbl_registrationInput)
  tbl_reg_school?: tbl_reg_schoolCreateNestedOneWithoutTbl_registrationInput

  @Field(() => tbl_reg_teacherCreateNestedOneWithoutTbl_registrationInput, {
    nullable: true,
  })
  @Type(() => tbl_reg_teacherCreateNestedOneWithoutTbl_registrationInput)
  tbl_reg_teacher?: tbl_reg_teacherCreateNestedOneWithoutTbl_registrationInput
}
