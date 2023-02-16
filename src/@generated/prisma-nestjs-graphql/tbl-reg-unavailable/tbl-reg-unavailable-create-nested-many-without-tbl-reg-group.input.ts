import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_unavailableCreateWithoutTbl_reg_groupInput } from './tbl-reg-unavailable-create-without-tbl-reg-group.input'
import { Type } from 'class-transformer'
import { tbl_reg_unavailableCreateOrConnectWithoutTbl_reg_groupInput } from './tbl-reg-unavailable-create-or-connect-without-tbl-reg-group.input'
import { tbl_reg_unavailableCreateManyTbl_reg_groupInputEnvelope } from './tbl-reg-unavailable-create-many-tbl-reg-group-input-envelope.input'
import { tbl_reg_unavailableWhereUniqueInput } from './tbl-reg-unavailable-where-unique.input'

@InputType()
export class tbl_reg_unavailableCreateNestedManyWithoutTbl_reg_groupInput {
  @Field(() => [tbl_reg_unavailableCreateWithoutTbl_reg_groupInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_unavailableCreateWithoutTbl_reg_groupInput)
  create?: Array<tbl_reg_unavailableCreateWithoutTbl_reg_groupInput>

  @Field(() => [tbl_reg_unavailableCreateOrConnectWithoutTbl_reg_groupInput], {
    nullable: true,
  })
  @Type(() => tbl_reg_unavailableCreateOrConnectWithoutTbl_reg_groupInput)
  connectOrCreate?: Array<tbl_reg_unavailableCreateOrConnectWithoutTbl_reg_groupInput>

  @Field(() => tbl_reg_unavailableCreateManyTbl_reg_groupInputEnvelope, {
    nullable: true,
  })
  @Type(() => tbl_reg_unavailableCreateManyTbl_reg_groupInputEnvelope)
  createMany?: tbl_reg_unavailableCreateManyTbl_reg_groupInputEnvelope

  @Field(() => [tbl_reg_unavailableWhereUniqueInput], { nullable: true })
  @Type(() => tbl_reg_unavailableWhereUniqueInput)
  connect?: Array<tbl_reg_unavailableWhereUniqueInput>
}
