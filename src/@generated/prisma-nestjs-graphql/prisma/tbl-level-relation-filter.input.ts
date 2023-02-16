import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_levelWhereInput } from '../tbl-level/tbl-level-where.input'

@InputType()
export class Tbl_levelRelationFilter {
  @Field(() => tbl_levelWhereInput, { nullable: true })
  is?: tbl_levelWhereInput

  @Field(() => tbl_levelWhereInput, { nullable: true })
  isNot?: tbl_levelWhereInput
}
