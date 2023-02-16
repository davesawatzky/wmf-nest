import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IntFilter } from '../prisma/int-filter.input'
import { StringFilter } from '../prisma/string-filter.input'
import { StringNullableFilter } from '../prisma/string-nullable-filter.input'
import { Enumtbl_SGSFilter } from '../prisma/enumtbl-sgs-filter.input'
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input'

@InputType()
export class tbl_classlistScalarWhereInput {
  @Field(() => [tbl_classlistScalarWhereInput], { nullable: true })
  @Type(() => tbl_classlistScalarWhereInput)
  AND?: Array<tbl_classlistScalarWhereInput>

  @Field(() => [tbl_classlistScalarWhereInput], { nullable: true })
  @Type(() => tbl_classlistScalarWhereInput)
  OR?: Array<tbl_classlistScalarWhereInput>

  @Field(() => [tbl_classlistScalarWhereInput], { nullable: true })
  @Type(() => tbl_classlistScalarWhereInput)
  NOT?: Array<tbl_classlistScalarWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => StringFilter, { nullable: true })
  classNumber?: StringFilter

  @Field(() => IntFilter, { nullable: true })
  subdisciplineID?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  categoryID?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  levelID?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  minSelection?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  maxSelection?: IntFilter

  @Field(() => StringNullableFilter, { nullable: true })
  requiredSelection?: StringNullableFilter

  @Field(() => Enumtbl_SGSFilter, { nullable: true })
  SGSlabel?: Enumtbl_SGSFilter

  @Field(() => DecimalNullableFilter, { nullable: true })
  @Type(() => DecimalNullableFilter)
  price?: DecimalNullableFilter
}
