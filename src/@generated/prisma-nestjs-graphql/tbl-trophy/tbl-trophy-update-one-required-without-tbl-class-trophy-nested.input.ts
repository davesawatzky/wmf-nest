import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_trophyCreateWithoutTbl_class_trophyInput } from './tbl-trophy-create-without-tbl-class-trophy.input'
import { Type } from 'class-transformer'
import { tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput } from './tbl-trophy-create-or-connect-without-tbl-class-trophy.input'
import { tbl_trophyUpsertWithoutTbl_class_trophyInput } from './tbl-trophy-upsert-without-tbl-class-trophy.input'
import { tbl_trophyWhereUniqueInput } from './tbl-trophy-where-unique.input'
import { tbl_trophyUpdateWithoutTbl_class_trophyInput } from './tbl-trophy-update-without-tbl-class-trophy.input'

@InputType()
export class tbl_trophyUpdateOneRequiredWithoutTbl_class_trophyNestedInput {
  @Field(() => tbl_trophyCreateWithoutTbl_class_trophyInput, { nullable: true })
  @Type(() => tbl_trophyCreateWithoutTbl_class_trophyInput)
  create?: tbl_trophyCreateWithoutTbl_class_trophyInput

  @Field(() => tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput, {
    nullable: true,
  })
  @Type(() => tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput)
  connectOrCreate?: tbl_trophyCreateOrConnectWithoutTbl_class_trophyInput

  @Field(() => tbl_trophyUpsertWithoutTbl_class_trophyInput, { nullable: true })
  @Type(() => tbl_trophyUpsertWithoutTbl_class_trophyInput)
  upsert?: tbl_trophyUpsertWithoutTbl_class_trophyInput

  @Field(() => tbl_trophyWhereUniqueInput, { nullable: true })
  @Type(() => tbl_trophyWhereUniqueInput)
  connect?: tbl_trophyWhereUniqueInput

  @Field(() => tbl_trophyUpdateWithoutTbl_class_trophyInput, { nullable: true })
  @Type(() => tbl_trophyUpdateWithoutTbl_class_trophyInput)
  update?: tbl_trophyUpdateWithoutTbl_class_trophyInput
}
