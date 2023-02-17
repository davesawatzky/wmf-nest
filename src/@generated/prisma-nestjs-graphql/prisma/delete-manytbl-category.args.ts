import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_categoryWhereInput } from '../tbl-category/tbl-category-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManytblCategoryArgs {

    @Field(() => tbl_categoryWhereInput, {nullable:true})
    @Type(() => tbl_categoryWhereInput)
    where?: tbl_categoryWhereInput;
}
