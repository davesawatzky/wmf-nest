import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_registrationCreateNestedOneWithoutTbl_reg_groupInput } from '../tbl-registration/tbl-registration-create-nested-one-without-tbl-reg-group.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_reg_groupCreateWithoutTbl_reg_unavailableInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    groupType?: string;

    @Field(() => Int, {nullable:true})
    numberOfPerformers?: number;

    @Field(() => Int, {nullable:true})
    age?: number;

    @Field(() => String, {nullable:true})
    instruments?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => tbl_registrationCreateNestedOneWithoutTbl_reg_groupInput, {nullable:false})
    @Type(() => tbl_registrationCreateNestedOneWithoutTbl_reg_groupInput)
    tbl_registration!: tbl_registrationCreateNestedOneWithoutTbl_reg_groupInput;
}
