import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_categoryUpdateWithoutTbl_classlistInput } from './tbl-category-update-without-tbl-classlist.input';
import { Type } from 'class-transformer';
import { tbl_categoryCreateWithoutTbl_classlistInput } from './tbl-category-create-without-tbl-classlist.input';

@InputType()
export class tbl_categoryUpsertWithoutTbl_classlistInput {

    @Field(() => tbl_categoryUpdateWithoutTbl_classlistInput, {nullable:false})
    @Type(() => tbl_categoryUpdateWithoutTbl_classlistInput)
    update!: tbl_categoryUpdateWithoutTbl_classlistInput;

    @Field(() => tbl_categoryCreateWithoutTbl_classlistInput, {nullable:false})
    @Type(() => tbl_categoryCreateWithoutTbl_classlistInput)
    create!: tbl_categoryCreateWithoutTbl_classlistInput;
}
