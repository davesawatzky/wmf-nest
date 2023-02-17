import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_registration } from '../tbl-registration/tbl-registration.model';
import { tbl_reg_unavailable } from '../tbl-reg-unavailable/tbl-reg-unavailable.model';
import { Tbl_reg_groupCount } from '../prisma/tbl-reg-group-count.output';

@ObjectType()
export class tbl_reg_group {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    regID!: number;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => String, {nullable:true})
    groupType!: string | null;

    @Field(() => Int, {nullable:true})
    numberOfPerformers!: number | null;

    @Field(() => Int, {nullable:true})
    age!: number | null;

    @Field(() => String, {nullable:true})
    instruments!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => tbl_registration, {nullable:false})
    tbl_registration?: tbl_registration;

    @Field(() => [tbl_reg_unavailable], {nullable:true})
    tbl_reg_unavailable?: Array<tbl_reg_unavailable>;

    @Field(() => Tbl_reg_groupCount, {nullable:false})
    _count?: Tbl_reg_groupCount;
}
