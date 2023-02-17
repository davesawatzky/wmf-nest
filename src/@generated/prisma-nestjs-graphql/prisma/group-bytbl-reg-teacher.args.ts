import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_teacherWhereInput } from '../tbl-reg-teacher/tbl-reg-teacher-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_teacherOrderByWithAggregationInput } from '../tbl-reg-teacher/tbl-reg-teacher-order-by-with-aggregation.input';
import { Tbl_reg_teacherScalarFieldEnum } from './tbl-reg-teacher-scalar-field.enum';
import { tbl_reg_teacherScalarWhereWithAggregatesInput } from '../tbl-reg-teacher/tbl-reg-teacher-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupBytblRegTeacherArgs {

    @Field(() => tbl_reg_teacherWhereInput, {nullable:true})
    @Type(() => tbl_reg_teacherWhereInput)
    where?: tbl_reg_teacherWhereInput;

    @Field(() => [tbl_reg_teacherOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<tbl_reg_teacherOrderByWithAggregationInput>;

    @Field(() => [Tbl_reg_teacherScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Tbl_reg_teacherScalarFieldEnum>;

    @Field(() => tbl_reg_teacherScalarWhereWithAggregatesInput, {nullable:true})
    having?: tbl_reg_teacherScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
