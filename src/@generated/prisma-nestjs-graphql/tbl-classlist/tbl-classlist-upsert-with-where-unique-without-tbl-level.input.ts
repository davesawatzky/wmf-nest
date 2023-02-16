import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_classlistUpdateWithoutTbl_levelInput } from './tbl-classlist-update-without-tbl-level.input'
import { tbl_classlistCreateWithoutTbl_levelInput } from './tbl-classlist-create-without-tbl-level.input'

@InputType()
export class tbl_classlistUpsertWithWhereUniqueWithoutTbl_levelInput {
  @Field(() => tbl_classlistWhereUniqueInput, { nullable: false })
  @Type(() => tbl_classlistWhereUniqueInput)
  where!: tbl_classlistWhereUniqueInput

  @Field(() => tbl_classlistUpdateWithoutTbl_levelInput, { nullable: false })
  @Type(() => tbl_classlistUpdateWithoutTbl_levelInput)
  update!: tbl_classlistUpdateWithoutTbl_levelInput

  @Field(() => tbl_classlistCreateWithoutTbl_levelInput, { nullable: false })
  @Type(() => tbl_classlistCreateWithoutTbl_levelInput)
  create!: tbl_classlistCreateWithoutTbl_levelInput
}
