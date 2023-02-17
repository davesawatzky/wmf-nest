import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationCreateWithoutTbl_reg_performerInput } from './tbl-registration-create-without-tbl-reg-performer.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput } from './tbl-registration-create-or-connect-without-tbl-reg-performer.input';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';

@InputType()
export class tbl_registrationCreateNestedOneWithoutTbl_reg_performerInput {

    @Field(() => tbl_registrationCreateWithoutTbl_reg_performerInput, {nullable:true})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_performerInput)
    create?: tbl_registrationCreateWithoutTbl_reg_performerInput;

    @Field(() => tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput, {nullable:true})
    @Type(() => tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput)
    connectOrCreate?: tbl_registrationCreateOrConnectWithoutTbl_reg_performerInput;

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:true})
    @Type(() => tbl_registrationWhereUniqueInput)
    connect?: tbl_registrationWhereUniqueInput;
}
