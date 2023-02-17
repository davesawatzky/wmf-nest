import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_SGS } from './tbl-sgs.enum';

@InputType()
export class NestedEnumtbl_SGSFilter {

    @Field(() => tbl_SGS, {nullable:true})
    equals?: keyof typeof tbl_SGS;

    @Field(() => [tbl_SGS], {nullable:true})
    in?: Array<keyof typeof tbl_SGS>;

    @Field(() => [tbl_SGS], {nullable:true})
    notIn?: Array<keyof typeof tbl_SGS>;

    @Field(() => NestedEnumtbl_SGSFilter, {nullable:true})
    not?: NestedEnumtbl_SGSFilter;
}
