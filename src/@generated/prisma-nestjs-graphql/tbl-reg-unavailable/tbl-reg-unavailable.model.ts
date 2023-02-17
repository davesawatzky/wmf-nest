import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_reg_group } from '../tbl-reg-group/tbl-reg-group.model';

@ObjectType()
export class tbl_reg_unavailable {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    groupID!: number;

    @Field(() => Date, {nullable:false})
    date!: Date;

    @Field(() => Date, {nullable:false})
    time!: Date;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => tbl_reg_group, {nullable:false})
    tbl_reg_group?: tbl_reg_group;
}
