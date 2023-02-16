import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistWhereInput } from '../tbl-classlist/tbl-classlist-where.input'
import { Type } from 'class-transformer'

@InputType()
export class Tbl_classlistRelationFilter {
  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  is?: tbl_classlistWhereInput

  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  isNot?: tbl_classlistWhereInput
}
