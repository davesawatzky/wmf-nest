import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistWhereInput } from '../tbl-classlist/tbl-classlist-where.input'
import { Type } from 'class-transformer'

@InputType()
export class Tbl_classlistListRelationFilter {
  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  every?: tbl_classlistWhereInput

  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  some?: tbl_classlistWhereInput

  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  none?: tbl_classlistWhereInput
}
