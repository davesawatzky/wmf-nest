import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_levelUpdateWithoutTbl_classlistInput } from './tbl-level-update-without-tbl-classlist.input'
import { Type } from 'class-transformer'
import { tbl_levelCreateWithoutTbl_classlistInput } from './tbl-level-create-without-tbl-classlist.input'

@InputType()
export class tbl_levelUpsertWithoutTbl_classlistInput {
  @Field(() => tbl_levelUpdateWithoutTbl_classlistInput, { nullable: false })
  @Type(() => tbl_levelUpdateWithoutTbl_classlistInput)
  update!: tbl_levelUpdateWithoutTbl_classlistInput

  @Field(() => tbl_levelCreateWithoutTbl_classlistInput, { nullable: false })
  @Type(() => tbl_levelCreateWithoutTbl_classlistInput)
  create!: tbl_levelCreateWithoutTbl_classlistInput
}
