import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_instrumentsWhereInput } from '../tbl-instruments/tbl-instruments-where.input';
import { Type } from 'class-transformer';
import { tbl_instrumentsOrderByWithAggregationInput } from '../tbl-instruments/tbl-instruments-order-by-with-aggregation.input';
import { Tbl_instrumentsScalarFieldEnum } from './tbl-instruments-scalar-field.enum';
import { tbl_instrumentsScalarWhereWithAggregatesInput } from '../tbl-instruments/tbl-instruments-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblInstrumentsArgs {

    @Field(() => tbl_instrumentsWhereInput, {nullable:true})
    @Type(() => tbl_instrumentsWhereInput)
    where?: tbl_instrumentsWhereInput;

    @Field(() => [tbl_instrumentsOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_instrumentsOrderByWithAggregationInput>;

    @Field(() => [Tbl_instrumentsScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_instrumentsScalarFieldEnum>;

    @Field(() => tbl_instrumentsScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_instrumentsScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
