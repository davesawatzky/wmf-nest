import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_performerWhereInput } from '../tbl-reg-performer/tbl-reg-performer-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_performerOrderByWithRelationInput } from '../tbl-reg-performer/tbl-reg-performer-order-by-with-relation.input';
import { tbl_reg_performerWhereUniqueInput } from '../tbl-reg-performer/tbl-reg-performer-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_reg_performerScalarFieldEnum } from './tbl-reg-performer-scalar-field.enum';

@ArgsType()
export class FindFirsttblRegPerformerOrThrowArgs {

    @Field(() => tbl_reg_performerWhereInput, {nullable:true})
    @Type(() => tbl_reg_performerWhereInput)
    where?: tbl_reg_performerWhereInput;

    @Field(() => [tbl_reg_performerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<tbl_reg_performerOrderByWithRelationInput>;

    @Field(() => tbl_reg_performerWhereUniqueInput, {nullable:true})
    cursor?: tbl_reg_performerWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_reg_performerScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_reg_performerScalarFieldEnum>;
}
