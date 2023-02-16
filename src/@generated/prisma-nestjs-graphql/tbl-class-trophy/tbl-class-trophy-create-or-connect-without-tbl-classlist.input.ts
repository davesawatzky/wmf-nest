import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_class_trophyWhereUniqueInput } from './tbl-class-trophy-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_class_trophyCreateWithoutTbl_classlistInput } from './tbl-class-trophy-create-without-tbl-classlist.input'

@InputType()
export class tbl_class_trophyCreateOrConnectWithoutTbl_classlistInput {
  @Field(() => tbl_class_trophyWhereUniqueInput, { nullable: false })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  where!: tbl_class_trophyWhereUniqueInput

  @Field(() => tbl_class_trophyCreateWithoutTbl_classlistInput, {
    nullable: false,
  })
  @Type(() => tbl_class_trophyCreateWithoutTbl_classlistInput)
  create!: tbl_class_trophyCreateWithoutTbl_classlistInput
}
