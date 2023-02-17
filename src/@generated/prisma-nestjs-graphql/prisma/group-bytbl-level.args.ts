import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_levelWhereInput } from '../tbl-level/tbl-level-where.input';
import { Type } from 'class-transformer';
import { tbl_levelOrderByWithAggregationInput } from '../tbl-level/tbl-level-order-by-with-aggregation.input';
import { Tbl_levelScalarFieldEnum } from './tbl-level-scalar-field.enum';
import { tbl_levelScalarWhereWithAggregatesInput } from '../tbl-level/tbl-level-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblLevelArgs {

    @Field(() => tbl_levelWhereInput, {nullable:true})
    @Type(() => tbl_levelWhereInput)
    where?: tbl_levelWhereInput;

    @Field(() => [tbl_levelOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_levelOrderByWithAggregationInput>;

    @Field(() => [Tbl_levelScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_levelScalarFieldEnum>;

    @Field(() => tbl_levelScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_levelScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
