import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_registrationOrderByWithRelationInput } from '../tbl-registration/tbl-registration-order-by-with-relation.input';
import { Type } from 'class-transformer';
import { tbl_reg_unavailableOrderByRelationAggregateInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-order-by-relation-aggregate.input';

@InputType()
export class tbl_reg_groupOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    regID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    groupType?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    numberOfPerformers?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    age?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    instruments?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => tbl_registrationOrderByWithRelationInput, {nullable:true})
    @Type(() => tbl_registrationOrderByWithRelationInput)
    tbl_registration?: tbl_registrationOrderByWithRelationInput;

    @Field(() => tbl_reg_unavailableOrderByRelationAggregateInput, {nullable:true})
    tbl_reg_unavailable?: tbl_reg_unavailableOrderByRelationAggregateInput;
}
