import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_reg_unavailableUncheckedCreateNestedManyWithoutTbl_reg_groupInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-unchecked-create-nested-many-without-tbl-reg-group.input';

@InputType()
export class tbl_reg_groupUncheckedCreateWithoutTbl_registrationInput {

    @Field(() => Int, {nullable:true})
    id?: number;

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

    @Field(() => tbl_reg_unavailableUncheckedCreateNestedManyWithoutTbl_reg_groupInput, {nullable:true})
    tbl_reg_unavailable?: tbl_reg_unavailableUncheckedCreateNestedManyWithoutTbl_reg_groupInput;
}
