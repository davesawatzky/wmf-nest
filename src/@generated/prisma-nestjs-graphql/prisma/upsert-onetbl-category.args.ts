import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_categoryWhereUniqueInput } from '../tbl-category/tbl-category-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_categoryCreateInput } from '../tbl-category/tbl-category-create.input'
import { tbl_categoryUpdateInput } from '../tbl-category/tbl-category-update.input'

@ArgsType()
export class UpsertOnetblCategoryArgs {
  @Field(() => tbl_categoryWhereUniqueInput, { nullable: false })
  @Type(() => tbl_categoryWhereUniqueInput)
  where!: tbl_categoryWhereUniqueInput

  @Field(() => tbl_categoryCreateInput, { nullable: false })
  @Type(() => tbl_categoryCreateInput)
  create!: tbl_categoryCreateInput

  @Field(() => tbl_categoryUpdateInput, { nullable: false })
  @Type(() => tbl_categoryUpdateInput)
  update!: tbl_categoryUpdateInput
}
