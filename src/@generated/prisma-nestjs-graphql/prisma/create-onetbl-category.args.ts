import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_categoryCreateInput } from '../tbl-category/tbl-category-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblCategoryArgs {
  @Field(() => tbl_categoryCreateInput, { nullable: false })
  @Type(() => tbl_categoryCreateInput)
  data!: tbl_categoryCreateInput
}
