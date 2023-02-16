import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateWithoutTbl_subdisciplineInput } from './tbl-classlist-create-without-tbl-subdiscipline.input'
import { Type } from 'class-transformer'
import { tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput } from './tbl-classlist-create-or-connect-without-tbl-subdiscipline.input'
import { tbl_classlistCreateManyTbl_subdisciplineInputEnvelope } from './tbl-classlist-create-many-tbl-subdiscipline-input-envelope.input'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'

@InputType()
export class tbl_classlistUncheckedCreateNestedManyWithoutTbl_subdisciplineInput {
  @Field(() => [tbl_classlistCreateWithoutTbl_subdisciplineInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateWithoutTbl_subdisciplineInput)
  create?: Array<tbl_classlistCreateWithoutTbl_subdisciplineInput>

  @Field(() => [tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput)
  connectOrCreate?: Array<tbl_classlistCreateOrConnectWithoutTbl_subdisciplineInput>

  @Field(() => tbl_classlistCreateManyTbl_subdisciplineInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateManyTbl_subdisciplineInputEnvelope)
  createMany?: tbl_classlistCreateManyTbl_subdisciplineInputEnvelope

  @Field(() => [tbl_classlistWhereUniqueInput], { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  connect?: Array<tbl_classlistWhereUniqueInput>
}
