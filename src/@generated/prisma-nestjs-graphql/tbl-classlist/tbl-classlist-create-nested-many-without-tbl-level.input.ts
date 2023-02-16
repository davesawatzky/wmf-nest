import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateWithoutTbl_levelInput } from './tbl-classlist-create-without-tbl-level.input'
import { Type } from 'class-transformer'
import { tbl_classlistCreateOrConnectWithoutTbl_levelInput } from './tbl-classlist-create-or-connect-without-tbl-level.input'
import { tbl_classlistCreateManyTbl_levelInputEnvelope } from './tbl-classlist-create-many-tbl-level-input-envelope.input'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'

@InputType()
export class tbl_classlistCreateNestedManyWithoutTbl_levelInput {
  @Field(() => [tbl_classlistCreateWithoutTbl_levelInput], { nullable: true })
  @Type(() => tbl_classlistCreateWithoutTbl_levelInput)
  create?: Array<tbl_classlistCreateWithoutTbl_levelInput>

  @Field(() => [tbl_classlistCreateOrConnectWithoutTbl_levelInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateOrConnectWithoutTbl_levelInput)
  connectOrCreate?: Array<tbl_classlistCreateOrConnectWithoutTbl_levelInput>

  @Field(() => tbl_classlistCreateManyTbl_levelInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateManyTbl_levelInputEnvelope)
  createMany?: tbl_classlistCreateManyTbl_levelInputEnvelope

  @Field(() => [tbl_classlistWhereUniqueInput], { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  connect?: Array<tbl_classlistWhereUniqueInput>
}
