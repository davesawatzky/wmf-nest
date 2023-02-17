import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateWithoutTbl_reg_schoolInput } from './tbl-registration-create-without-tbl-reg-school.input';

@InputType()
export class tbl_registrationCreateOrConnectWithoutTbl_reg_schoolInput {

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:false})
    @Type(() => tbl_registrationWhereUniqueInput)
    where!: tbl_registrationWhereUniqueInput;

    @Field(() => tbl_registrationCreateWithoutTbl_reg_schoolInput, {nullable:false})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_schoolInput)
    create!: tbl_registrationCreateWithoutTbl_reg_schoolInput;
}
