import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_groupScalarWhereInput } from './tbl-reg-group-scalar-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_groupUpdateManyMutationInput } from './tbl-reg-group-update-many-mutation.input';

@InputType()
export class tbl_reg_groupUpdateManyWithWhereWithoutTbl_registrationInput {

    @Field(() => tbl_reg_groupScalarWhereInput, {nullable:false})
    @Type(() => tbl_reg_groupScalarWhereInput)
    where!: tbl_reg_groupScalarWhereInput;

    @Field(() => tbl_reg_groupUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_reg_groupUpdateManyMutationInput)
    data!: tbl_reg_groupUpdateManyMutationInput;
}
