import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_categoryWhereInput } from '../tbl-category/tbl-category-where.input';
import { Type } from 'class-transformer';
import { tbl_categoryOrderByWithRelationInput } from '../tbl-category/tbl-category-order-by-with-relation.input';
import { tbl_categoryWhereUniqueInput } from '../tbl-category/tbl-category-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_categoryScalarFieldEnum } from './tbl-category-scalar-field.enum';

@ArgsType()
export class FindFirsttblCategoryArgs {

    @Field(() => tbl_categoryWhereInput, {nullable:true})
    @Type(() => tbl_categoryWhereInput)
    where?: tbl_categoryWhereInput;

    @Field(() => [tbl_categoryOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_categoryOrderByWithRelationInput>;

    @Field(() => tbl_categoryWhereUniqueInput, {nullable:true})
    cursor?: tbl_categoryWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_categoryScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_categoryScalarFieldEnum>;
}
