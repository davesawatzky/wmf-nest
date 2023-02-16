import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { IntFilter } from '../prisma/int-filter.input'
import { DateTimeFilter } from '../prisma/date-time-filter.input'
import { Tbl_reg_groupRelationFilter } from '../prisma/tbl-reg-group-relation-filter.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_unavailableWhereInput {
  @Field(() => [tbl_reg_unavailableWhereInput], { nullable: true })
  AND?: Array<tbl_reg_unavailableWhereInput>

  @Field(() => [tbl_reg_unavailableWhereInput], { nullable: true })
  OR?: Array<tbl_reg_unavailableWhereInput>

  @Field(() => [tbl_reg_unavailableWhereInput], { nullable: true })
  NOT?: Array<tbl_reg_unavailableWhereInput>

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

  @Field(() => Tbl_reg_groupRelationFilter, { nullable: true })
  @Type(() => Tbl_reg_groupRelationFilter)
  tbl_reg_group?: Tbl_reg_groupRelationFilter
}
