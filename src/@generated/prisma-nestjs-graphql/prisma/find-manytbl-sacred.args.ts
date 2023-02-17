import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_sacredWhereInput } from '../tbl-sacred/tbl-sacred-where.input';
import { Type } from 'class-transformer';
import { tbl_sacredOrderByWithRelationInput } from '../tbl-sacred/tbl-sacred-order-by-with-relation.input';
import { tbl_sacredWhereUniqueInput } from '../tbl-sacred/tbl-sacred-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_sacredScalarFieldEnum } from './tbl-sacred-scalar-field.enum';

@ArgsType()
export class FindManytblSacredArgs {

    @Field(() => tbl_sacredWhereInput, {nullable:true})
    @Type(() => tbl_sacredWhereInput)
    where?: tbl_sacredWhereInput;

    @Field(() => [tbl_sacredOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_sacredOrderByWithRelationInput>;

    @Field(() => tbl_sacredWhereUniqueInput, {nullable:true})
    cursor?: tbl_sacredWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_sacredScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_sacredScalarFieldEnum>;
}
