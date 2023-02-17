import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_categoryUpdateInput } from '../tbl-category/tbl-category-update.input';
import { Type } from 'class-transformer';
import { tbl_categoryWhereUniqueInput } from '../tbl-category/tbl-category-where-unique.input';

@ArgsType()
export class UpdateOnetblCategoryArgs {

    @Field(() => tbl_categoryUpdateInput, {nullable:false})
    @Type(() => tbl_categoryUpdateInput)
    data!: tbl_categoryUpdateInput;

    @Field(() => tbl_categoryWhereUniqueInput, {nullable:false})
    @Type(() => tbl_categoryWhereUniqueInput)
    where!: tbl_categoryWhereUniqueInput;
}
