import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_categoryWhereUniqueInput } from './tbl-category-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_categoryCreateWithoutTbl_classlistInput } from './tbl-category-create-without-tbl-classlist.input'

@InputType()
export class tbl_categoryCreateOrConnectWithoutTbl_classlistInput {
  @Field(() => tbl_categoryWhereUniqueInput, { nullable: false })
  @Type(() => tbl_categoryWhereUniqueInput)
  where!: tbl_categoryWhereUniqueInput

  @Field(() => tbl_categoryCreateWithoutTbl_classlistInput, { nullable: false })
  @Type(() => tbl_categoryCreateWithoutTbl_classlistInput)
  create!: tbl_categoryCreateWithoutTbl_classlistInput
}
