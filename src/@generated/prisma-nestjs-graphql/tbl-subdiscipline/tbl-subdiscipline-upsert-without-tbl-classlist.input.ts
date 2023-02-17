import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_subdisciplineUpdateWithoutTbl_classlistInput } from './tbl-subdiscipline-update-without-tbl-classlist.input';
import { Type } from 'class-transformer';
import { tbl_subdisciplineCreateWithoutTbl_classlistInput } from './tbl-subdiscipline-create-without-tbl-classlist.input';

@InputType()
export class tbl_subdisciplineUpsertWithoutTbl_classlistInput {

    @Field(() => tbl_subdisciplineUpdateWithoutTbl_classlistInput, {nullable:false})
    @Type(() => tbl_subdisciplineUpdateWithoutTbl_classlistInput)
    update!: tbl_subdisciplineUpdateWithoutTbl_classlistInput;

    @Field(() => tbl_subdisciplineCreateWithoutTbl_classlistInput, {nullable:false})
    @Type(() => tbl_subdisciplineCreateWithoutTbl_classlistInput)
    create!: tbl_subdisciplineCreateWithoutTbl_classlistInput;
}
