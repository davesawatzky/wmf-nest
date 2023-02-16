import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_classlistCreateWithoutTbl_levelInput } from './tbl-classlist-create-without-tbl-level.input'

@InputType()
export class tbl_classlistCreateOrConnectWithoutTbl_levelInput {
  @Field(() => tbl_classlistWhereUniqueInput, { nullable: false })
  @Type(() => tbl_classlistWhereUniqueInput)
  where!: tbl_classlistWhereUniqueInput

  @Field(() => tbl_classlistCreateWithoutTbl_levelInput, { nullable: false })
  @Type(() => tbl_classlistCreateWithoutTbl_levelInput)
  create!: tbl_classlistCreateWithoutTbl_levelInput
}
