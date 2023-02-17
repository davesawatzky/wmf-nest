import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_selectionWhereInput } from '../tbl-reg-selection/tbl-reg-selection-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_selectionOrderByWithRelationInput } from '../tbl-reg-selection/tbl-reg-selection-order-by-with-relation.input';
import { tbl_reg_selectionWhereUniqueInput } from '../tbl-reg-selection/tbl-reg-selection-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_reg_selectionScalarFieldEnum } from './tbl-reg-selection-scalar-field.enum';

@ArgsType()
export class FindFirsttblRegSelectionArgs {

    @Field(() => tbl_reg_selectionWhereInput, {nullable:true})
    @Type(() => tbl_reg_selectionWhereInput)
    where?: tbl_reg_selectionWhereInput;

    @Field(() => [tbl_reg_selectionOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_reg_selectionOrderByWithRelationInput>;

    @Field(() => tbl_reg_selectionWhereUniqueInput, {nullable:true})
    cursor?: tbl_reg_selectionWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_reg_selectionScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_reg_selectionScalarFieldEnum>;
}
