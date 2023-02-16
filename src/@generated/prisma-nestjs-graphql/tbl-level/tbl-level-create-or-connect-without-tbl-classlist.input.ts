import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_levelWhereUniqueInput } from './tbl-level-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_levelCreateWithoutTbl_classlistInput } from './tbl-level-create-without-tbl-classlist.input'

@InputType()
export class tbl_levelCreateOrConnectWithoutTbl_classlistInput {
  @Field(() => tbl_levelWhereUniqueInput, { nullable: false })
  @Type(() => tbl_levelWhereUniqueInput)
  where!: tbl_levelWhereUniqueInput

  @Field(() => tbl_levelCreateWithoutTbl_classlistInput, { nullable: false })
  @Type(() => tbl_levelCreateWithoutTbl_classlistInput)
  create!: tbl_levelCreateWithoutTbl_classlistInput
}
