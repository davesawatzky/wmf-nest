import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_registration_performerType } from '../tbl-registration/tbl-registration-performer-type.enum';
import { NestedEnumtbl_registration_performerTypeFilter } from './nested-enumtbl-registration-performer-type-filter.input';

@InputType()
export class Enumtbl_registration_performerTypeFilter {

    @Field(() => tbl_registration_performerType, {nullable:true})
    equals?: keyof typeof tbl_registration_performerType;

    @Field(() => [tbl_registration_performerType], {nullable:true})
    in?: Array<keyof typeof tbl_registration_performerType>;

    @Field(() => [tbl_registration_performerType], {nullable:true})
    notIn?: Array<keyof typeof tbl_registration_performerType>;

    @Field(() => NestedEnumtbl_registration_performerTypeFilter, {nullable:true})
    not?: NestedEnumtbl_registration_performerTypeFilter;
}
