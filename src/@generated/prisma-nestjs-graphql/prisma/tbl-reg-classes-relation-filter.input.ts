import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_classesWhereInput } from '../tbl-reg-classes/tbl-reg-classes-where.input'
import { Type } from 'class-transformer'

@InputType()
export class Tbl_reg_classesRelationFilter {
  @Field(() => tbl_reg_classesWhereInput, { nullable: true })
  @Type(() => tbl_reg_classesWhereInput)
  is?: tbl_reg_classesWhereInput

  @Field(() => tbl_reg_classesWhereInput, { nullable: true })
  @Type(() => tbl_reg_classesWhereInput)
  isNot?: tbl_reg_classesWhereInput
}
