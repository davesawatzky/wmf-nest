import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_categoryCreateWithoutTbl_classlistInput } from './tbl-category-create-without-tbl-classlist.input'
import { Type } from 'class-transformer'
import { tbl_categoryCreateOrConnectWithoutTbl_classlistInput } from './tbl-category-create-or-connect-without-tbl-classlist.input'
import { tbl_categoryWhereUniqueInput } from './tbl-category-where-unique.input'

@InputType()
export class tbl_categoryCreateNestedOneWithoutTbl_classlistInput {
  @Field(() => tbl_categoryCreateWithoutTbl_classlistInput, { nullable: true })
  @Type(() => tbl_categoryCreateWithoutTbl_classlistInput)
  create?: tbl_categoryCreateWithoutTbl_classlistInput

  @Field(() => tbl_categoryCreateOrConnectWithoutTbl_classlistInput, {
    nullable: true,
  })
  @Type(() => tbl_categoryCreateOrConnectWithoutTbl_classlistInput)
  connectOrCreate?: tbl_categoryCreateOrConnectWithoutTbl_classlistInput

  @Field(() => tbl_categoryWhereUniqueInput, { nullable: true })
  @Type(() => tbl_categoryWhereUniqueInput)
  connect?: tbl_categoryWhereUniqueInput
}
