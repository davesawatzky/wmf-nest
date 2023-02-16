import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_disciplineCreateWithoutTbl_subdisciplineInput } from './tbl-discipline-create-without-tbl-subdiscipline.input'
import { Type } from 'class-transformer'
import { tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput } from './tbl-discipline-create-or-connect-without-tbl-subdiscipline.input'
import { tbl_disciplineUpsertWithoutTbl_subdisciplineInput } from './tbl-discipline-upsert-without-tbl-subdiscipline.input'
import { tbl_disciplineWhereUniqueInput } from './tbl-discipline-where-unique.input'
import { tbl_disciplineUpdateWithoutTbl_subdisciplineInput } from './tbl-discipline-update-without-tbl-subdiscipline.input'

@InputType()
export class tbl_disciplineUpdateOneRequiredWithoutTbl_subdisciplineNestedInput {
  @Field(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput, {
    nullable: true,
  })
  @Type(() => tbl_disciplineCreateWithoutTbl_subdisciplineInput)
  create?: tbl_disciplineCreateWithoutTbl_subdisciplineInput

  @Field(() => tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput, {
    nullable: true,
  })
  @Type(() => tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput)
  connectOrCreate?: tbl_disciplineCreateOrConnectWithoutTbl_subdisciplineInput

  @Field(() => tbl_disciplineUpsertWithoutTbl_subdisciplineInput, {
    nullable: true,
  })
  @Type(() => tbl_disciplineUpsertWithoutTbl_subdisciplineInput)
  upsert?: tbl_disciplineUpsertWithoutTbl_subdisciplineInput

  @Field(() => tbl_disciplineWhereUniqueInput, { nullable: true })
  @Type(() => tbl_disciplineWhereUniqueInput)
  connect?: tbl_disciplineWhereUniqueInput

  @Field(() => tbl_disciplineUpdateWithoutTbl_subdisciplineInput, {
    nullable: true,
  })
  @Type(() => tbl_disciplineUpdateWithoutTbl_subdisciplineInput)
  update?: tbl_disciplineUpdateWithoutTbl_subdisciplineInput
}
