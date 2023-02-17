import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_selectionUpdateInput } from '../tbl-reg-selection/tbl-reg-selection-update.input';
import { Type } from 'class-transformer';
import { tbl_reg_selectionWhereUniqueInput } from '../tbl-reg-selection/tbl-reg-selection-where-unique.input';

@ArgsType()
export class UpdateOnetblRegSelectionArgs {

    @Field(() => tbl_reg_selectionUpdateInput, {nullable:false})
    @Type(() => tbl_reg_selectionUpdateInput)
    data!: tbl_reg_selectionUpdateInput;

    @Field(() => tbl_reg_selectionWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_selectionWhereUniqueInput)
    where!: tbl_reg_selectionWhereUniqueInput;
}
