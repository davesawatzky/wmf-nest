import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateWithoutTbl_levelInput } from './tbl-classlist-create-without-tbl-level.input'
import { Type } from 'class-transformer'
import { tbl_classlistCreateOrConnectWithoutTbl_levelInput } from './tbl-classlist-create-or-connect-without-tbl-level.input'
import { tbl_classlistUpsertWithWhereUniqueWithoutTbl_levelInput } from './tbl-classlist-upsert-with-where-unique-without-tbl-level.input'
import { tbl_classlistCreateManyTbl_levelInputEnvelope } from './tbl-classlist-create-many-tbl-level-input-envelope.input'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'
import { tbl_classlistUpdateWithWhereUniqueWithoutTbl_levelInput } from './tbl-classlist-update-with-where-unique-without-tbl-level.input'
import { tbl_classlistUpdateManyWithWhereWithoutTbl_levelInput } from './tbl-classlist-update-many-with-where-without-tbl-level.input'
import { tbl_classlistScalarWhereInput } from './tbl-classlist-scalar-where.input'

@InputType()
export class tbl_classlistUncheckedUpdateManyWithoutTbl_levelNestedInput {
  @Field(() => [tbl_classlistCreateWithoutTbl_levelInput], { nullable: true })
  @Type(() => tbl_classlistCreateWithoutTbl_levelInput)
  create?: Array<tbl_classlistCreateWithoutTbl_levelInput>

  @Field(() => [tbl_classlistCreateOrConnectWithoutTbl_levelInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateOrConnectWithoutTbl_levelInput)
  connectOrCreate?: Array<tbl_classlistCreateOrConnectWithoutTbl_levelInput>

  @Field(() => [tbl_classlistUpsertWithWhereUniqueWithoutTbl_levelInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistUpsertWithWhereUniqueWithoutTbl_levelInput)
  upsert?: Array<tbl_classlistUpsertWithWhereUniqueWithoutTbl_levelInput>

  @Field(() => tbl_classlistCreateManyTbl_levelInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateManyTbl_levelInputEnvelope)
  createMany?: tbl_classlistCreateManyTbl_levelInputEnvelope

  @Field(() => [tbl_classlistWhereUniqueInput], { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  set?: Array<tbl_classlistWhereUniqueInput>

  @Field(() => [tbl_classlistWhereUniqueInput], { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  disconnect?: Array<tbl_classlistWhereUniqueInput>

  @Field(() => [tbl_classlistWhereUniqueInput], { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  delete?: Array<tbl_classlistWhereUniqueInput>

  @Field(() => [tbl_classlistWhereUniqueInput], { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  connect?: Array<tbl_classlistWhereUniqueInput>

  @Field(() => [tbl_classlistUpdateWithWhereUniqueWithoutTbl_levelInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistUpdateWithWhereUniqueWithoutTbl_levelInput)
  update?: Array<tbl_classlistUpdateWithWhereUniqueWithoutTbl_levelInput>

  @Field(() => [tbl_classlistUpdateManyWithWhereWithoutTbl_levelInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistUpdateManyWithWhereWithoutTbl_levelInput)
  updateMany?: Array<tbl_classlistUpdateManyWithWhereWithoutTbl_levelInput>

  @Field(() => [tbl_classlistScalarWhereInput], { nullable: true })
  @Type(() => tbl_classlistScalarWhereInput)
  deleteMany?: Array<tbl_classlistScalarWhereInput>
}
