import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateNestedManyWithoutTbl_categoryInput } from '../tbl-classlist/tbl-classlist-create-nested-many-without-tbl-category.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_categoryCreateInput {
  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  requiredComposer?: string

  @Field(() => tbl_classlistCreateNestedManyWithoutTbl_categoryInput, {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateNestedManyWithoutTbl_categoryInput)
  tbl_classlist?: tbl_classlistCreateNestedManyWithoutTbl_categoryInput
}
