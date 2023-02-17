import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_classlistWhereInput } from '../tbl-classlist/tbl-classlist-where.input';
import { Type } from 'class-transformer';
import { tbl_classlistOrderByWithRelationInput } from '../tbl-classlist/tbl-classlist-order-by-with-relation.input';
import { tbl_classlistWhereUniqueInput } from '../tbl-classlist/tbl-classlist-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_classlistScalarFieldEnum } from './tbl-classlist-scalar-field.enum';

@ArgsType()
export class FindManytblClasslistArgs {

    @Field(() => tbl_classlistWhereInput, {nullable:true})
    @Type(() => tbl_classlistWhereInput)
    where?: tbl_classlistWhereInput;

    @Field(() => [tbl_classlistOrderByWithRelationInput], {nullable:true})
    @Type(() => tbl_classlistOrderByWithRelationInput)
    orderBy?: Array<tbl_classlistOrderByWithRelationInput>;

    @Field(() => tbl_classlistWhereUniqueInput, {nullable:true})
    @Type(() => tbl_classlistWhereUniqueInput)
    cursor?: tbl_classlistWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_classlistScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_classlistScalarFieldEnum>;
}
