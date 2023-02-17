import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_groupWhereInput } from '../tbl-reg-group/tbl-reg-group-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_groupOrderByWithRelationInput } from '../tbl-reg-group/tbl-reg-group-order-by-with-relation.input';
import { tbl_reg_groupWhereUniqueInput } from '../tbl-reg-group/tbl-reg-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_reg_groupScalarFieldEnum } from './tbl-reg-group-scalar-field.enum';

@ArgsType()
export class FindFirsttblRegGroupOrThrowArgs {

    @Field(() => tbl_reg_groupWhereInput, {nullable:true})
    @Type(() => tbl_reg_groupWhereInput)
    where?: tbl_reg_groupWhereInput;

    @Field(() => [tbl_reg_groupOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_reg_groupOrderByWithRelationInput>;

    @Field(() => tbl_reg_groupWhereUniqueInput, {nullable:true})
    cursor?: tbl_reg_groupWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_reg_groupScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_reg_groupScalarFieldEnum>;
}
