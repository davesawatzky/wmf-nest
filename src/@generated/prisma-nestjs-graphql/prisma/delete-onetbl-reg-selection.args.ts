import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_selectionWhereUniqueInput } from '../tbl-reg-selection/tbl-reg-selection-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOnetblRegSelectionArgs {

    @Field(() => tbl_reg_selectionWhereUniqueInput, {nullable:false})
    @Type(() => tbl_reg_selectionWhereUniqueInput)
    where!: tbl_reg_selectionWhereUniqueInput;
}
