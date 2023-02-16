import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_categoryWhereUniqueInput } from '../tbl-category/tbl-category-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquetblCategoryArgs {
  @Field(() => tbl_categoryWhereUniqueInput, { nullable: false })
  @Type(() => tbl_categoryWhereUniqueInput)
  where!: tbl_categoryWhereUniqueInput
}
