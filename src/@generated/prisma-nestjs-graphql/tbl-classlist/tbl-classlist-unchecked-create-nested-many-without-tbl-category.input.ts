import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_classlistCreateWithoutTbl_categoryInput } from './tbl-classlist-create-without-tbl-category.input'
import { Type } from 'class-transformer'
import { tbl_classlistCreateOrConnectWithoutTbl_categoryInput } from './tbl-classlist-create-or-connect-without-tbl-category.input'
import { tbl_classlistCreateManyTbl_categoryInputEnvelope } from './tbl-classlist-create-many-tbl-category-input-envelope.input'
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input'

@InputType()
export class tbl_classlistUncheckedCreateNestedManyWithoutTbl_categoryInput {
  @Field(() => [tbl_classlistCreateWithoutTbl_categoryInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateWithoutTbl_categoryInput)
  create?: Array<tbl_classlistCreateWithoutTbl_categoryInput>

  @Field(() => [tbl_classlistCreateOrConnectWithoutTbl_categoryInput], {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateOrConnectWithoutTbl_categoryInput)
  connectOrCreate?: Array<tbl_classlistCreateOrConnectWithoutTbl_categoryInput>

  @Field(() => tbl_classlistCreateManyTbl_categoryInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_classlistCreateManyTbl_categoryInputEnvelope)
  createMany?: tbl_classlistCreateManyTbl_categoryInputEnvelope

  @Field(() => [tbl_classlistWhereUniqueInput], { nullable: true })
  @Type(() => tbl_classlistWhereUniqueInput)
  connect?: Array<tbl_classlistWhereUniqueInput>
}
