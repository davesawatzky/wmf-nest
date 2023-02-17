import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_disciplineWhereInput } from '../tbl-discipline/tbl-discipline-where.input';
import { Type } from 'class-transformer';
import { tbl_disciplineOrderByWithAggregationInput } from '../tbl-discipline/tbl-discipline-order-by-with-aggregation.input';
import { Tbl_disciplineScalarFieldEnum } from './tbl-discipline-scalar-field.enum';
import { tbl_disciplineScalarWhereWithAggregatesInput } from '../tbl-discipline/tbl-discipline-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblDisciplineArgs {

    @Field(() => tbl_disciplineWhereInput, {nullable:true})
    @Type(() => tbl_disciplineWhereInput)
    where?: tbl_disciplineWhereInput;

    @Field(() => [tbl_disciplineOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_disciplineOrderByWithAggregationInput>;

    @Field(() => [Tbl_disciplineScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_disciplineScalarFieldEnum>;

    @Field(() => tbl_disciplineScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_disciplineScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
