import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_categoryCreateWithoutTbl_classlistInput } from './tbl-category-create-without-tbl-classlist.input'
import { Type } from 'class-transformer'
import { tbl_categoryCreateOrConnectWithoutTbl_classlistInput } from './tbl-category-create-or-connect-without-tbl-classlist.input'
import { tbl_categoryUpsertWithoutTbl_classlistInput } from './tbl-category-upsert-without-tbl-classlist.input'
import { tbl_categoryWhereUniqueInput } from './tbl-category-where-unique.input'
import { tbl_categoryUpdateWithoutTbl_classlistInput } from './tbl-category-update-without-tbl-classlist.input'

@InputType()
export class tbl_categoryUpdateOneRequiredWithoutTbl_classlistNestedInput {
  @Field(() => tbl_categoryCreateWithoutTbl_classlistInput, { nullable: true })
  @Type(() => tbl_categoryCreateWithoutTbl_classlistInput)
  create?: tbl_categoryCreateWithoutTbl_classlistInput

  @Field(() => tbl_categoryCreateOrConnectWithoutTbl_classlistInput, {
    nullable: true,
  })
  @Type(() => tbl_categoryCreateOrConnectWithoutTbl_classlistInput)
  connectOrCreate?: tbl_categoryCreateOrConnectWithoutTbl_classlistInput

  @Field(() => tbl_categoryUpsertWithoutTbl_classlistInput, { nullable: true })
  @Type(() => tbl_categoryUpsertWithoutTbl_classlistInput)
  upsert?: tbl_categoryUpsertWithoutTbl_classlistInput

  @Field(() => tbl_categoryWhereUniqueInput, { nullable: true })
  @Type(() => tbl_categoryWhereUniqueInput)
  connect?: tbl_categoryWhereUniqueInput

  @Field(() => tbl_categoryUpdateWithoutTbl_classlistInput, { nullable: true })
  @Type(() => tbl_categoryUpdateWithoutTbl_classlistInput)
  update?: tbl_categoryUpdateWithoutTbl_classlistInput
}
