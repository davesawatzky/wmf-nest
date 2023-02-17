import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_selectionUpdateManyMutationInput } from '../tbl-reg-selection/tbl-reg-selection-update-many-mutation.input';
import { Type } from 'class-transformer';
import { tbl_reg_selectionWhereInput } from '../tbl-reg-selection/tbl-reg-selection-where.input';

@ArgsType()
export class UpdateManytblRegSelectionArgs {

    @Field(() => tbl_reg_selectionUpdateManyMutationInput, {nullable:false})
    @Type(() => tbl_reg_selectionUpdateManyMutationInput)
    data!: tbl_reg_selectionUpdateManyMutationInput;

    @Field(() => tbl_reg_selectionWhereInput, {nullable:true})
    @Type(() => tbl_reg_selectionWhereInput)
    where?: tbl_reg_selectionWhereInput;
}
