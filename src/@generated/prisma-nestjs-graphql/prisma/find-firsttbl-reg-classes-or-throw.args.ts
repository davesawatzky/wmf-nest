import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_reg_classesWhereInput } from '../tbl-reg-classes/tbl-reg-classes-where.input';
import { Type } from 'class-transformer';
import { tbl_reg_classesOrderByWithRelationInput } from '../tbl-reg-classes/tbl-reg-classes-order-by-with-relation.input';
import { tbl_reg_classesWhereUniqueInput } from '../tbl-reg-classes/tbl-reg-classes-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Tbl_reg_classesScalarFieldEnum } from './tbl-reg-classes-scalar-field.enum';

@ArgsType()
export class FindFirsttblRegClassesOrThrowArgs {

    @Field(() => tbl_reg_classesWhereInput, {nullable:true})
    @Type(() => tbl_reg_classesWhereInput)
    where?: tbl_reg_classesWhereInput;

    @Field(() => [tbl_reg_classesOrderByWithRelationInput], {nullable:true})
    @Type(() => tbl_reg_classesOrderByWithRelationInput)
    orderBy?: Array<tbl_reg_classesOrderByWithRelationInput>;

    @Field(() => tbl_reg_classesWhereUniqueInput, {nullable:true})
    @Type(() => tbl_reg_classesWhereUniqueInput)
    cursor?: tbl_reg_classesWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Tbl_reg_classesScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Tbl_reg_classesScalarFieldEnum>;
}
