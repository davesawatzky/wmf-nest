import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_groupCreateWithoutTbl_reg_unavailableInput } from './tbl-reg-group-create-without-tbl-reg-unavailable.input';
import { Type } from 'class-transformer';
import { tbl_reg_groupCreateOrConnectWithoutTbl_reg_unavailableInput } from './tbl-reg-group-create-or-connect-without-tbl-reg-unavailable.input';
import { tbl_reg_groupUpsertWithoutTbl_reg_unavailableInput } from './tbl-reg-group-upsert-without-tbl-reg-unavailable.input';
import { tbl_reg_groupWhereUniqueInput } from './tbl-reg-group-where-unique.input';
import { tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput } from './tbl-reg-group-update-without-tbl-reg-unavailable.input';

@InputType()
export class tbl_reg_groupUpdateOneRequiredWithoutTbl_reg_unavailableNestedInput {

    @Field(() => tbl_reg_groupCreateWithoutTbl_reg_unavailableInput, {nullable:true})
    @Type(() => tbl_reg_groupCreateWithoutTbl_reg_unavailableInput)
    create?: tbl_reg_groupCreateWithoutTbl_reg_unavailableInput;

    @Field(() => tbl_reg_groupCreateOrConnectWithoutTbl_reg_unavailableInput, {nullable:true})
    @Type(() => tbl_reg_groupCreateOrConnectWithoutTbl_reg_unavailableInput)
    connectOrCreate?: tbl_reg_groupCreateOrConnectWithoutTbl_reg_unavailableInput;

    @Field(() => tbl_reg_groupUpsertWithoutTbl_reg_unavailableInput, {nullable:true})
    @Type(() => tbl_reg_groupUpsertWithoutTbl_reg_unavailableInput)
    upsert?: tbl_reg_groupUpsertWithoutTbl_reg_unavailableInput;

    @Field(() => tbl_reg_groupWhereUniqueInput, {nullable:true})
    @Type(() => tbl_reg_groupWhereUniqueInput)
    connect?: tbl_reg_groupWhereUniqueInput;

    @Field(() => tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput, {nullable:true})
    @Type(() => tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput)
    update?: tbl_reg_groupUpdateWithoutTbl_reg_unavailableInput;
}
