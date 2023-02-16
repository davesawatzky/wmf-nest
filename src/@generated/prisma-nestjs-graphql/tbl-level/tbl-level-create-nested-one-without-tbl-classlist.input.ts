import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_levelCreateWithoutTbl_classlistInput } from './tbl-level-create-without-tbl-classlist.input'
import { Type } from 'class-transformer'
import { tbl_levelCreateOrConnectWithoutTbl_classlistInput } from './tbl-level-create-or-connect-without-tbl-classlist.input'
import { tbl_levelWhereUniqueInput } from './tbl-level-where-unique.input'

@InputType()
export class tbl_levelCreateNestedOneWithoutTbl_classlistInput {
  @Field(() => tbl_levelCreateWithoutTbl_classlistInput, { nullable: true })
  @Type(() => tbl_levelCreateWithoutTbl_classlistInput)
  create?: tbl_levelCreateWithoutTbl_classlistInput

  @Field(() => tbl_levelCreateOrConnectWithoutTbl_classlistInput, {
    nullable: true,
  })
  @Type(() => tbl_levelCreateOrConnectWithoutTbl_classlistInput)
  connectOrCreate?: tbl_levelCreateOrConnectWithoutTbl_classlistInput

  @Field(() => tbl_levelWhereUniqueInput, { nullable: true })
  @Type(() => tbl_levelWhereUniqueInput)
  connect?: tbl_levelWhereUniqueInput
}
