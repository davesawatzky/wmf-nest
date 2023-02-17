import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateWithoutTbl_reg_groupInput } from './tbl-registration-create-without-tbl-reg-group.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput } from './tbl-registration-create-or-connect-without-tbl-reg-group.input';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';

@InputType()
export class tbl_registrationCreateNestedOneWithoutTbl_reg_groupInput {

    @Field(() => tbl_registrationCreateWithoutTbl_reg_groupInput, {nullable:true})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_groupInput)
    create?: tbl_registrationCreateWithoutTbl_reg_groupInput;

    @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput, {nullable:true})
    @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput)
    connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_groupInput;

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:true})
    @Type(() => tbl_registrationWhereUniqueInput)
    connect?: tbl_registrationWhereUniqueInput;
}
