import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_trophyCreateWithoutTbl_class_trophyInput } from './tbl-trophy-create-without-tbl-class-trophy.input'
import { Type } from 'class-transformer'
import { tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput } from './tbl-trophy-create-or-connect-without-tbl-class-trophy.input'
import { tbl_trophyWhereUniqueInput } from './tbl-trophy-where-unique.input'

@InputType()
export class tbl_trophyCreateNestedOneWithoutTbl_class_trophyInput {
  @Field(() => tbl_trophyCreateWithoutTbl_class_trophyInput, { nullable: true })
  @Type(() => tbl_trophyCreateWithoutTbl_class_trophyInput)
  create?: tbl_trophyCreateWithoutTbl_class_trophyInput

  @Field(() => tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput, {
    nullable: true,
  })
  @Type(() => tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput)
  connectOrCreate?: tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput

  @Field(() => tbl_trophyWhereUniqueInput, { nullable: true })
  @Type(() => tbl_trophyWhereUniqueInput)
  connect?: tbl_trophyWhereUniqueInput
}
