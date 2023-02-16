import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { IntNullableFilter } from '../prisma/int-nullable-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'

@InputType()
export class tbl_reg_groupScalarWhereInput {
  @Field(() => [tbl_reg_groupScalarWhereInput], { nullable: true })
  AND?: Array<tbl_reg_groupScalarWhereInput>

  @Field(() => [tbl_reg_groupScalarWhereInput], { nullable: true })
  OR?: Array<tbl_reg_groupScalarWhereInput>

  @Field(() => [tbl_reg_groupScalarWhereInput], { nullable: true })
  NOT?: Array<tbl_reg_groupScalarWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  regID?: IntFilter

  @Field(() => StringNullableFilter, { nullable: true })
  name?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  groupType?: StringNullableFilter

  @Field(() => IntNullableFilter, { nullable: true })
  numberOfPerformers?: IntNullableFilter

  @Field(() => IntNullableFilter, { nullable: true })
  age?: IntNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  instruments?: StringNullableFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter
}
