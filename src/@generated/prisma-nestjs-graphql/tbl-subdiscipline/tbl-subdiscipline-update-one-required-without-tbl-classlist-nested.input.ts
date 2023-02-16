import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_subdisciplineCreateWithoutTbl_classlistInput } from './tbl-subdiscipline-create-without-tbl-classlist.input'
import { Type } from 'class-transformer'
import { tbl_subdisciplineCreateOrConnectWithoutTbl_classlistInput } from './tbl-subdiscipline-create-or-connect-without-tbl-classlist.input'
import { tbl_subdisciplineUpsertWithoutTbl_classlistInput } from './tbl-subdiscipline-upsert-without-tbl-classlist.input'
import { tbl_subdisciplineWhereUniqueInput } from './tbl-subdiscipline-where-unique.input'
import { tbl_subdisciplineUpdateWithoutTbl_classlistInput } from './tbl-subdiscipline-update-without-tbl-classlist.input'

@InputType()
export class tbl_subdisciplineUpdateOneRequiredWithoutTbl_classlistNestedInput {
  @Field(() => tbl_subdisciplineCreateWithoutTbl_classlistInput, {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineCreateWithoutTbl_classlistInput)
  create?: tbl_subdisciplineCreateWithoutTbl_classlistInput

  @Field(() => tbl_subdisciplineCreateOrConnectWithoutTbl_classlistInput, {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineCreateOrConnectWithoutTbl_classlistInput)
  connectOrCreate?: tbl_subdisciplineCreateOrConnectWithoutTbl_classlistInput

  @Field(() => tbl_subdisciplineUpsertWithoutTbl_classlistInput, {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineUpsertWithoutTbl_classlistInput)
  upsert?: tbl_subdisciplineUpsertWithoutTbl_classlistInput

  @Field(() => tbl_subdisciplineWhereUniqueInput, { nullable: true })
  @Type(() => tbl_subdisciplineWhereUniqueInput)
  connect?: tbl_subdisciplineWhereUniqueInput

  @Field(() => tbl_subdisciplineUpdateWithoutTbl_classlistInput, {
    nullable: true,
  })
  @Type(() => tbl_subdisciplineUpdateWithoutTbl_classlistInput)
  update?: tbl_subdisciplineUpdateWithoutTbl_classlistInput
}
