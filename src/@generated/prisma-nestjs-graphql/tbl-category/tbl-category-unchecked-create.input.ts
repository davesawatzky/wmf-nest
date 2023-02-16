import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { tbl_classlistUncheckedCreateNestedManyWithoutTbl_categoryInput } from '../tbl-classlist/tbl-classlist-unchecked-create-nested-many-without-tbl-category.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_categoryUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  requiredComposer?: string

  @Field(() => tbl_classlistUncheckedCreateNestedManyWithoutTbl_categoryInput, {
    nullable: true,
  })
  @Type(() => tbl_classlistUncheckedCreateNestedManyWithoutTbl_categoryInput)
  tbl_classlist?: tbl_classlistUncheckedCreateNestedManyWithoutTbl_categoryInput
}
