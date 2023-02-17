import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_registrationOrderByWithRelationInput } from '../tbl-registration/tbl-registration-order-by-with-relation.input';
import { Type } from 'class-transformer';
import { tbl_reg_selectionOrderByRelationAggregateInput } from '../tbl-reg-selection/tbl-reg-selection-order-by-relation-aggregate.input';

@InputType()
export class tbl_reg_classesOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    regID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    classNumber?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    discipline?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    subdiscipline?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    level?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    category?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    numberOfSelections?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    schoolCommunityId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => tbl_registrationOrderByWithRelationInput, {nullable:true})
    @Type(() => tbl_registrationOrderByWithRelationInput)
    tbl_registration?: tbl_registrationOrderByWithRelationInput;

    @Field(() => tbl_reg_selectionOrderByRelationAggregateInput, {nullable:true})
    @Type(() => tbl_reg_selectionOrderByRelationAggregateInput)
    tbl_reg_selection?: tbl_reg_selectionOrderByRelationAggregateInput;
}
