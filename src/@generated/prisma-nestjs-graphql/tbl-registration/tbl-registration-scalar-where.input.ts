import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IntFilter } from '../prisma/int-filter.input'
import { IntNullableFilter } from '../prisma/int-nullable-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { Enumtbl_registration_performerTypeFilter } from '../prisma/enumtbl-registration-performer-type-filter.input'
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input'
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'

@InputType()
export class tbl_registrationScalarWhereInput {
  @Field(() => [tbl_registrationScalarWhereInput], { nullable: true })
  @Type(() => tbl_registrationScalarWhereInput)
  AND?: Array<tbl_registrationScalarWhereInput>

  @Field(() => [tbl_registrationScalarWhereInput], { nullable: true })
  @Type(() => tbl_registrationScalarWhereInput)
  OR?: Array<tbl_registrationScalarWhereInput>

  @Field(() => [tbl_registrationScalarWhereInput], { nullable: true })
  @Type(() => tbl_registrationScalarWhereInput)
  NOT?: Array<tbl_registrationScalarWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => IntNullableFilter, { nullable: true })
  userID?: IntNullableFilter

  @Field(() => StringFilter, { nullable: true })
  label?: StringFilter

  @Field(() => Enumtbl_registration_performerTypeFilter, { nullable: true })
  performerType?: Enumtbl_registration_performerTypeFilter

  @Field(() => DateTimeNullableFilter, { nullable: true })
  submittedAt?: DateTimeNullableFilter

  @Field(() => DecimalNullableFilter, { nullable: true })
  @Type(() => DecimalNullableFilter)
  totalAmt?: DecimalNullableFilter

  @Field(() => DecimalNullableFilter, { nullable: true })
  @Type(() => DecimalNullableFilter)
  payedAmt?: DecimalNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  transactionInfo?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  confirmation?: StringNullableFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter
}
