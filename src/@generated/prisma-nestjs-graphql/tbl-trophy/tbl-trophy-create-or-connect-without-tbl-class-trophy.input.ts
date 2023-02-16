import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_trophyWhereUniqueInput } from './tbl-trophy-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_trophyCreateWithoutTbl_class_trophyInput } from './tbl-trophy-create-without-tbl-class-trophy.input'

@InputType()
export class tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput {
  @Field(() => tbl_trophyWhereUniqueInput, { nullable: false })
  @Type(() => tbl_trophyWhereUniqueInput)
  where!: tbl_trophyWhereUniqueInput

  @Field(() => tbl_trophyCreateWithoutTbl_class_trophyInput, {
    nullable: false,
  })
  @Type(() => tbl_trophyCreateWithoutTbl_class_trophyInput)
  create!: tbl_trophyCreateWithoutTbl_class_trophyInput
}
