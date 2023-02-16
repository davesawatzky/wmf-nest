import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_subdisciplineCreateWithoutTbl_classlistInput } from './tbl-subdiscipline-create-without-tbl-classlist.input'
import { Type } from 'class-transformer'
import { tbl_subdisciplineCreateOrConnectWithoutTbl_classlistInput } from './tbl-subdiscipline-create-or-connect-without-tbl-classlist.input'
import { tbl_subdisciplineWhereUniqueInput } from './tbl-subdiscipline-where-unique.input'

@InputType()
export class tbl_subdisciplineCreateNestedOneWithoutTbl_classlistInput {
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

  @Field(() => tbl_subdisciplineWhereUniqueInput, { nullable: true })
  @Type(() => tbl_subdisciplineWhereUniqueInput)
  connect?: tbl_subdisciplineWhereUniqueInput
}
