import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_categoryUpdateManyMutationInput } from '../tbl-category/tbl-category-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_categoryWhereInput } from '../tbl-category/tbl-category-where.input'

@ArgsType()
export class UpdateManytblCategoryArgs {
  @Field(() => tbl_categoryUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_categoryUpdateManyMutationInput)
  data!: tbl_categoryUpdateManyMutationInput

  @Field(() => tbl_categoryWhereInput, { nullable: true })
  @Type(() => tbl_categoryWhereInput)
  where?: tbl_categoryWhereInput
}
