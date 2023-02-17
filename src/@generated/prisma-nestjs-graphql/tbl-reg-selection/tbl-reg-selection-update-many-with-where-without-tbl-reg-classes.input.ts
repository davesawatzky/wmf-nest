import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_selectionScalarWhereInput } from './tbl-reg-selection-scalar-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_selectionUpdateManyMutationInput } from './tbl-reg-selection-update-many-mutation.input';

@InputType()
export class tbl_reg_selectionUpdateManyWithWhereWithoutTbl_reg_classesInput {

    @Field(() => tbl_reg_selectionScalarWhereInput, {nullable:false})
    @Type(() => tbl_reg_selectionScalarWhereInput)
    where!: tbl_reg_selectionScalarWhereInput;

    @Field(() => tbl_reg_selectionUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_reg_selectionUpdateManyMutationInput)
    data!: tbl_reg_selectionUpdateManyMutationInput;
}
