import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_selectionWhereInput } from '../tbl-reg-selection/tbl-reg-selection-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblRegSelectionArgs {

    @Field(() => tbl_reg_selectionWhereInput, {nullable:true})
    @Type(() => tbl_reg_selectionWhereInput)
    where?: tbl_reg_selectionWhereInput;
}
