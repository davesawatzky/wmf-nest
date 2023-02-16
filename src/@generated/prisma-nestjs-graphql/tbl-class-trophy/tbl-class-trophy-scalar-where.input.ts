import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'

@InputType()
export class tbl_class_trophyScalarWhereInput {
  @Field(() => [tbl_class_trophyScalarWhereInput], { nullable: true })
  AND?: Array<tbl_class_trophyScalarWhereInput>

  @Field(() => [tbl_class_trophyScalarWhereInput], { nullable: true })
  OR?: Array<tbl_class_trophyScalarWhereInput>

  @Field(() => [tbl_class_trophyScalarWhereInput], { nullable: true })
  NOT?: Array<tbl_class_trophyScalarWhereInput>

  @Field(() => IntFilter, { nullable: true })
  classID?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  trophyID?: IntFilter
}
