import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registration_performerType } from '../tbl-registration/tbl-registration-performer-type.enum';
import { NestedEnumtbl_registration_performerTypeWithAggregatesFilter } from './nested-enumtbl-registration-performer-type-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumtbl_registration_performerTypeFilter } from './nested-enumtbl-registration-performer-type-filter.input';

@InputType()
export class Enumtbl_registration_performerTypeWithAggregatesFilter {

    @Field(() => tbl_registration_performerType, {nullable:true})
    equals?: keyof typeof tbl_registration_performerType;

    @Field(() => [tbl_registration_performerType], {nullable:true})
    in?: Array<keyof typeof tbl_registration_performerType>;

    @Field(() => [tbl_registration_performerType], {nullable:true})
    notIn?: Array<keyof typeof tbl_registration_performerType>;

    @Field(() => NestedEnumtbl_registration_performerTypeWithAggregatesFilter, {nullable:true})
    not?: NestedEnumtbl_registration_performerTypeWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumtbl_registration_performerTypeFilter, {nullable:true})
    _min?: NestedEnumtbl_registration_performerTypeFilter;

    @Field(() => NestedEnumtbl_registration_performerTypeFilter, {nullable:true})
    _max?: NestedEnumtbl_registration_performerTypeFilter;
}
