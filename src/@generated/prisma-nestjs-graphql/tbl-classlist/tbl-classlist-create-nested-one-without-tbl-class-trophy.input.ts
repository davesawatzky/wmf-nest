import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateWithoutTbl_class_trophyInput } from './tbl-classlist-create-without-tbl-class-trophy.input'
import { Type } from 'class-transformer'
import { tbl_classlistCreateOrConnectWithoutTbl_class_trophyInput } from './tbl-classlist-create-or-connect-without-tbl-class-trophy.input'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'

@InputType()
export class tbl_classlistCreateNestedOneWithoutTbl_class_trophyInput {
  @Field(() => tbl_classlistCreateWithoutTbl_class_trophyInput, {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateWithoutTbl_class_trophyInput)
  create?: tbl_classlistCreateWithoutTbl_class_trophyInput

  @Field(() => tbl_classlistCreateOrConnectWithoutTbl_class_trophyInput, {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateOrConnectWithoutTbl_class_trophyInput)
  connectOrCreate?: tbl_classlistCreateOrConnectWithoutTbl_class_trophyInput

  @Field(() => tbl_classlistWhereUniqueInput, { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  connect?: tbl_classlistWhereUniqueInput
}
