import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_classlistUpdateWithoutTbl_categoryInput } from './tbl-classlist-update-without-tbl-category.input';

@InputType()
export class tbl_classlistUpdateWithWhereUniqueWithoutTbl_categoryInput {

    @Field(() => tbl_classlistWhereUniqueInput, {nullable:false})
    @Type(() => tbl_classlistWhereUniqueInput)
    where!: tbl_classlistWhereUniqueInput;

    @Field(() => tbl_classlistUpdateWithoutTbl_categoryInput, {nullable:false})
    @Type(() => tbl_classlistUpdateWithoutTbl_categoryInput)
    data!: tbl_classlistUpdateWithoutTbl_categoryInput;
}
