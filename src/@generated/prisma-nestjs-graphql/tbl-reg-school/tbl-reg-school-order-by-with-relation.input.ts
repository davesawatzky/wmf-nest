import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { tbl_registrationOrderByWithRelationInput } from '../tbl-registration/tbl-registration-order-by-with-relation.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_reg_schoolOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    regID?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    division?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    streetNumber?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    streetName?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    city?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    province?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    postalCode?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    phone?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => tbl_registrationOrderByWithRelationInput, {nullable:true})
    @Type(() => tbl_registrationOrderByWithRelationInput)
    tbl_registration?: tbl_registrationOrderByWithRelationInput;
}
