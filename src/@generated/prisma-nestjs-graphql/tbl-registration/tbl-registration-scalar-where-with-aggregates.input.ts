import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input'
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input'
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input'
import { Enumtbl_registration_performerTypeWithAggregatesFilter } from '../prisma/enumtbl-registration-performer-type-with-aggregates-filter.input'
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input'
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input'
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input'
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input'

@InputType()
export class tbl_registrationScalarWhereWithAggregatesInput {
  @Field(() => [tbl_registrationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationScalarWhereWithAggregatesInput)
  AND?: Array<tbl_registrationScalarWhereWithAggregatesInput>

  @Field(() => [tbl_registrationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationScalarWhereWithAggregatesInput)
  OR?: Array<tbl_registrationScalarWhereWithAggregatesInput>

  @Field(() => [tbl_registrationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  @Type(() => tbl_registrationScalarWhereWithAggregatesInput)
  NOT?: Array<tbl_registrationScalarWhereWithAggregatesInput>

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  userID?: IntNullableWithAggregatesFilter

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  label?: StringWithAggregatesFilter

  @Field(() => Enumtbl_registration_performerTypeWithAggregatesFilter, {
    nullable: true,
  })
  performerType?: Enumtbl_registration_performerTypeWithAggregatesFilter

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  submittedAt?: DateTimeNullableWithAggregatesFilter

  @Field(() => DecimalNullableWithAggregatesFilter, { nullable: true })
  @Type(() => DecimalNullableWithAggregatesFilter)
  totalAmt?: DecimalNullableWithAggregatesFilter

  @Field(() => DecimalNullableWithAggregatesFilter, { nullable: true })
  @Type(() => DecimalNullableWithAggregatesFilter)
  payedAmt?: DecimalNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  transactionInfo?: StringNullableWithAggregatesFilter

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  confirmation?: StringNullableWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter
}
