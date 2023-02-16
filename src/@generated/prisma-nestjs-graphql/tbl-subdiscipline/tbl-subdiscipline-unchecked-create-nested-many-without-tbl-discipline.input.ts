import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_subdisciplineCreateWithoutTbl_disciplineInput } from './tbl-subdiscipline-create-without-tbl-discipline.input'
import { Type } from 'class-transformer'
import { tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput } from './tbl-subdiscipline-create-or-connect-without-tbl-discipline.input'
import { tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope } from './tbl-subdiscipline-create-many-tbl-discipline-input-envelope.input'
import { tbl_subdisciplineWhereUniqueInput } from './tbl-subdiscipline-where-unique.input'

@InputType()
export class tbl_subdisciplineUncheckedCreateNestedManyWithoutTbl_disciplineInput {
  @Field(() => [tbl_subdisciplineCreateWithoutTbl_disciplineInput], {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineCreateWithoutTbl_disciplineInput)
  create?: Array<tbl_subdisciplineCreateWithoutTbl_disciplineInput>

  @Field(() => [tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput], {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput)
  connectOrCreate?: Array<tbl_subdisciplineCreateOrConnectWithoutTbl_disciplineInput>

  @Field(() => tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope)
  createMany?: tbl_subdisciplineCreateManyTbl_disciplineInputEnvelope

  @Field(() => [tbl_subdisciplineWhereUniqueInput], { nullable: true })
  @Type(() => tbl_subdisciplineWhereUniqueInput)
  connect?: Array<tbl_subdisciplineWhereUniqueInput>
}
