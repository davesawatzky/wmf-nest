import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_groupCreateNestedOneWithoutTbl_reg_unavailableInput } from '../tbl-reg-group/tbl-reg-group-create-nested-one-without-tbl-reg-unavailable.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_reg_unavailableCreateInput {

    @Field(() => Date, {nullable:false})
    date!: Date | string;

    @Field(() => Date, {nullable:false})
    time!: Date | string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => tbl_reg_groupCreateNestedOneWithoutTbl_reg_unavailableInput, {nullable:false})
    @Type(() => tbl_reg_groupCreateNestedOneWithoutTbl_reg_unavailableInput)
    tbl_reg_group!: tbl_reg_groupCreateNestedOneWithoutTbl_reg_unavailableInput;
}
