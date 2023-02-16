import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_class_trophyWhereUniqueInput } from './tbl-class-trophy-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_class_trophyUpdateWithoutTbl_trophyInput } from './tbl-class-trophy-update-without-tbl-trophy.input'

@InputType()
export class tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_trophyInput {
  @Field(() => tbl_class_trophyWhereUniqueInput, { nullable: false })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  where!: tbl_class_trophyWhereUniqueInput

  @Field(() => tbl_class_trophyUpdateWithoutTbl_trophyInput, {
    nullable: false,
  })
  @Type(() => tbl_class_trophyUpdateWithoutTbl_trophyInput)
  data!: tbl_class_trophyUpdateWithoutTbl_trophyInput
}
