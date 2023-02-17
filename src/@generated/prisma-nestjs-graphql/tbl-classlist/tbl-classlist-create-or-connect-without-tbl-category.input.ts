import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistWhereUniqueInput } from './tbl-classlist-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_classlistCreateWithoutTbl_categoryInput } from './tbl-classlist-create-without-tbl-category.input';

@InputType()
export class tbl_classlistCreateOrConnectWithoutTbl_categoryInput {

    @Field(() => tbl_classlistWhereUniqueInput, {nullable:false})
    @Type(() => tbl_classlistWhereUniqueInput)
    where!: tbl_classlistWhereUniqueInput;

    @Field(() => tbl_classlistCreateWithoutTbl_categoryInput, {nullable:false})
    @Type(() => tbl_classlistCreateWithoutTbl_categoryInput)
    create!: tbl_classlistCreateWithoutTbl_categoryInput;
}
