import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import * as Validator from 'class-validator'
import { tbl_registrationUncheckedCreateNestedManyWithoutTbl_userInput } from '../tbl-registration/tbl-registration-unchecked-create-nested-many-without-tbl-user.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_userUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: false })
  @Validator.IsEmail()
  email!: string

  @Field(() => String, { nullable: false })
  password!: string

  @Field(() => Boolean, { nullable: true })
  staff?: boolean

  @Field(() => Boolean, { nullable: true })
  admin?: boolean

  @Field(() => String, { nullable: true })
  firstName?: string

  @Field(() => String, { nullable: true })
  lastName?: string

  @Field(() => String, { nullable: true })
  apartment?: string

  @Field(() => String, { nullable: true })
  streetNumber?: string

  @Field(() => String, { nullable: true })
  streetName?: string

  @Field(() => String, { nullable: true })
  city?: string

  @Field(() => String, { nullable: true })
  @Validator.MaxLength(3)
  province?: string

  @Field(() => String, { nullable: true })
  @Validator.IsPostalCode('CA')
  postalCode?: string

  @Field(() => String, { nullable: true })
  @Validator.IsPhoneNumber('CA')
  phone?: string

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => tbl_registrationUncheckedCreateNestedManyWithoutTbl_userInput, {
    nullable: true,
  })
  @Type(() => tbl_registrationUncheckedCreateNestedManyWithoutTbl_userInput)
  tbl_registration?: tbl_registrationUncheckedCreateNestedManyWithoutTbl_userInput
}
