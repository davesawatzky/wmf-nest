import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_class_trophyWhereInput } from '../tbl-class-trophy/tbl-class-trophy-where.input';
import { Type } from 'class-transformer';
import { tbl_class_trophyOrderByWithRelationInput } from '../tbl-class-trophy/tbl-class-trophy-order-by-with-relation.input';
import { tbl_class_trophyWhereUniqueInput } from '../tbl-class-trophy/tbl-class-trophy-where-unique.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class AggregatetblClassTrophyArgs {

    @Field(() => tbl_class_trophyWhereInput, {nullable:true})
    @Type(() => tbl_class_trophyWhereInput)
    where?: tbl_class_trophyWhereInput;

    @Field(() => [tbl_class_trophyOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_class_trophyOrderByWithRelationInput>;

    @Field(() => tbl_class_trophyWhereUniqueInput, {nullable:true})
    cursor?: tbl_class_trophyWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
