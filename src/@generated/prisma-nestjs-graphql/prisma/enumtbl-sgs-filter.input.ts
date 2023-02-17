import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_SGS } from './tbl-sgs.enum';
import { NestedEnumtbl_SGSFilter } from './nested-enumtbl-sgs-filter.input';

@InputType()
export class Enumtbl_SGSFilter {

    @Field(() => tbl_SGS, {nullable:true})
    equals?: keyof typeof tbl_SGS;

    @Field(() => [tbl_SGS], {nullable:true})
    in?: Array<keyof typeof tbl_SGS>;

    @Field(() => [tbl_SGS], {nullable:true})
    notIn?: Array<keyof typeof tbl_SGS>;

    @Field(() => NestedEnumtbl_SGSFilter, {nullable:true})
    not?: NestedEnumtbl_SGSFilter;
}
