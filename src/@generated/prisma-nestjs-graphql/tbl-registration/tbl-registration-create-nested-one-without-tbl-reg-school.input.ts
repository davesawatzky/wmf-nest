import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateWithoutTbl_reg_schoolInput } from './tbl-registration-create-without-tbl-reg-school.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput } from './tbl-registration-create-or-connect-without-tbl-reg-school.input';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';

@InputType()
export class tbl_registrationCreateNestedOneWithoutTbl_reg_schoolInput {

    @Field(() => tbl_registrationCreateWithoutTbl_reg_schoolInput, {nullable:true})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_schoolInput)
    create?: tbl_registrationCreateWithoutTbl_reg_schoolInput;

    @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput, {nullable:true})
    @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput)
    connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput;

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:true})
    @Type(() => tbl_registrationWhereUniqueInput)
    connect?: tbl_registrationWhereUniqueInput;
}
