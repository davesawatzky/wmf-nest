import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_class_trophyCreateWithoutTbl_trophyInput } from './tbl-class-trophy-create-without-tbl-trophy.input'
import { Type } from 'class-transformer'
import { tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput } from './tbl-class-trophy-create-or-connect-without-tbl-trophy.input'
import { tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_trophyInput } from './tbl-class-trophy-upsert-with-where-unique-without-tbl-trophy.input'
import { tbl_class_trophyCreateManyTbl_trophyInputEnvelope } from './tbl-class-trophy-create-many-tbl-trophy-input-envelope.input'
import { tbl_class_trophyWhereUniqueInput } from './tbl-class-trophy-where-unique.input'
import { tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_trophyInput } from './tbl-class-trophy-update-with-where-unique-without-tbl-trophy.input'
import { tbl_class_trophyUpdateManyWithWhereWithoutTbl_trophyInput } from './tbl-class-trophy-update-many-with-where-without-tbl-trophy.input'
import { tbl_class_trophyScalarWhereInput } from './tbl-class-trophy-scalar-where.input'

@InputType()
export class tbl_class_trophyUpdateManyWithoutTbl_trophyNestedInput {
  @Field(() => [tbl_class_trophyCreateWithoutTbl_trophyInput], {
    nullable: true,
  })
  @Type(() => tbl_class_trophyCreateWithoutTbl_trophyInput)
  create?: Array<tbl_class_trophyCreateWithoutTbl_trophyInput>

  @Field(() => [tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput], {
    nullable: true,
  })
  @Type(() => tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput)
  connectOrCreate?: Array<tbl_class_trophyCreateOrConnectWithoutTbl_trophyInput>

  @Field(() => [tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_trophyInput], {
    nullable: true,
  })
  @Type(() => tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_trophyInput)
  upsert?: Array<tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_trophyInput>

  @Field(() => tbl_class_trophyCreateManyTbl_trophyInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_class_trophyCreateManyTbl_trophyInputEnvelope)
  createMany?: tbl_class_trophyCreateManyTbl_trophyInputEnvelope

  @Field(() => [tbl_class_trophyWhereUniqueInput], { nullable: true })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  set?: Array<tbl_class_trophyWhereUniqueInput>

  @Field(() => [tbl_class_trophyWhereUniqueInput], { nullable: true })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  disconnect?: Array<tbl_class_trophyWhereUniqueInput>

  @Field(() => [tbl_class_trophyWhereUniqueInput], { nullable: true })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  delete?: Array<tbl_class_trophyWhereUniqueInput>

  @Field(() => [tbl_class_trophyWhereUniqueInput], { nullable: true })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  connect?: Array<tbl_class_trophyWhereUniqueInput>

  @Field(() => [tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_trophyInput], {
    nullable: true,
  })
  @Type(() => tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_trophyInput)
  update?: Array<tbl_class_trophyUpdateWithWhereUniqueWithoutTbl_trophyInput>

  @Field(() => [tbl_class_trophyUpdateManyWithWhereWithoutTbl_trophyInput], {
    nullable: true,
  })
  @Type(() => tbl_class_trophyUpdateManyWithWhereWithoutTbl_trophyInput)
  updateMany?: Array<tbl_class_trophyUpdateManyWithWhereWithoutTbl_trophyInput>

  @Field(() => [tbl_class_trophyScalarWhereInput], { nullable: true })
  @Type(() => tbl_class_trophyScalarWhereInput)
  deleteMany?: Array<tbl_class_trophyScalarWhereInput>
}
