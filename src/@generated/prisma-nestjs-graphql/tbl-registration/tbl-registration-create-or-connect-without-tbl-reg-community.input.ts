import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registrationWhereUniqueInput } from './tbl-registration-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_registrationCreateWithoutTbl_reg_communityInput } from './tbl-registration-create-without-tbl-reg-community.input';

@InputType()
export class tbl_registrationCreateOrConnectWithoutTbl_reg_communityInput {

    @Field(() => tbl_registrationWhereUniqueInput, {nullable:false})
    @Type(() => tbl_registrationWhereUniqueInput)
    where!: tbl_registrationWhereUniqueInput;

    @Field(() => tbl_registrationCreateWithoutTbl_reg_communityInput, {nullable:false})
    @Type(() => tbl_registrationCreateWithoutTbl_reg_communityInput)
    create!: tbl_registrationCreateWithoutTbl_reg_communityInput;
}
