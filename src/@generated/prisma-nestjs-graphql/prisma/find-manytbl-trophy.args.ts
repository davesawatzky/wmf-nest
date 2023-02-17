import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_trophyWhereInput } from '../tbl-trophy/tbl-trophy-where.input';
import { Type } from 'class-transformer';
import { tbl_trophyOrderByWithRelationInput } from '../tbl-trophy/tbl-trophy-order-by-with-relation.input';
import { tbl_trophyWhereUniqueInput } from '../tbl-trophy/tbl-trophy-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_trophyScalarFieldEnum } from './tbl-trophy-scalar-field.enum';

@ArgsType()
export class FindManytblTrophyArgs {

    @Field(() => tbl_trophyWhereInput, {nullable:true})
    @Type(() => tbl_trophyWhereInput)
    where?: tbl_trophyWhereInput;

    @Field(() => [tbl_trophyOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_trophyOrderByWithRelationInput>;

    @Field(() => tbl_trophyWhereUniqueInput, {nullable:true})
    cursor?: tbl_trophyWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_trophyScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_trophyScalarFieldEnum>;
}
