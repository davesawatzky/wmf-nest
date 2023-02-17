import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_instrumentsWhereInput } from '../tbl-instruments/tbl-instruments-where.input';
import { Type } from 'class-transformer';
import { tbl_instrumentsOrderByWithRelationInput } from '../tbl-instruments/tbl-instruments-order-by-with-relation.input';
import { tbl_instrumentsWhereUniqueInput } from '../tbl-instruments/tbl-instruments-where-unique.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class AggregatetblInstrumentsArgs {

    @Field(() => tbl_instrumentsWhereInput, {nullable:true})
    @Type(() => tbl_instrumentsWhereInput)
    where?: tbl_instrumentsWhereInput;

    @Field(() => [tbl_instrumentsOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_instrumentsOrderByWithRelationInput>;

    @Field(() => tbl_instrumentsWhereUniqueInput, {nullable:true})
    cursor?: tbl_instrumentsWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
