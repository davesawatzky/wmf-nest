import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { tbl_categoryCreateManyInput } from '../tbl-category/tbl-category-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManytblCategoryArgs {

    @Field(() => [tbl_categoryCreateManyInput], {nullable:false})
    @Type(() => tbl_categoryCreateManyInput)
    data!: Array<tbl_categoryCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
