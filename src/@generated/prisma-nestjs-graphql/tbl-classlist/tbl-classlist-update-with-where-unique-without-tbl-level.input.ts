import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_classlistUpdateWithoutTbl_levelInput } from './tbl-classlist-update-without-tbl-level.input'

@InputType()
export class tbl_classlistUpdateWithWhereUniqueWithoutTbl_levelInput {
  @Field(() => tbl_classlistWhereUniqueInput, { nullable: false })
  @Type(() => tbl_classlistWhereUniqueInput)
  where!: tbl_classlistWhereUniqueInput

  @Field(() => tbl_classlistUpdateWithoutTbl_levelInput, { nullable: false })
  @Type(() => tbl_classlistUpdateWithoutTbl_levelInput)
  data!: tbl_classlistUpdateWithoutTbl_levelInput
}
