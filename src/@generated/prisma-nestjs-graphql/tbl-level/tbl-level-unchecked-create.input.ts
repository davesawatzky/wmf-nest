import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { tbl_classlistUncheckedCreateNestedManyWithoutTbl_levelInput } from '../tbl-classlist/tbl-classlist-unchecked-create-nested-many-without-tbl-level.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_levelUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => tbl_classlistUncheckedCreateNestedManyWithoutTbl_levelInput, {nullable:true})
    @Type(() => tbl_classlistUncheckedCreateNestedManyWithoutTbl_levelInput)
    tbl_classlist?: tbl_classlistUncheckedCreateNestedManyWithoutTbl_levelInput;
}
