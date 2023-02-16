import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'

@InputType()
export class tbl_reg_unavailableScalarWhereInput {
  @Field(() => [tbl_reg_unavailableScalarWhereInput], { nullable: true })
  AND?: Array<tbl_reg_unavailableScalarWhereInput>

  @Field(() => [tbl_reg_unavailableScalarWhereInput], { nullable: true })
  OR?: Array<tbl_reg_unavailableScalarWhereInput>

  @Field(() => [tbl_reg_unavailableScalarWhereInput], { nullable: true })
  NOT?: Array<tbl_reg_unavailableScalarWhereInput>

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter

  @Field(() => IntFilter, { nullable: true })
  groupID?: IntFilter

  @Field(() => DateTimeFilter, { nullable: true })
  date?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  time?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter
}
