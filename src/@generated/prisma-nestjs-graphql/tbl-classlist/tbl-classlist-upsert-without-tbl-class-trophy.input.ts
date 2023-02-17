import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistUpdateWithoutTbl_class_trophyInput } from './tbl-classlist-update-without-tbl-class-trophy.input';
import { Type } from 'class-transformer';
import { tbl_classlistCreateWithoutTbl_class_trophyInput } from './tbl-classlist-create-without-tbl-class-trophy.input';

@InputType()
export class tbl_classlistUpsertWithoutTbl_class_trophyInput {

    @Field(() => tbl_classlistUpdateWithoutTbl_class_trophyInput, {nullable:false})
    @Type(() => tbl_classlistUpdateWithoutTbl_class_trophyInput)
    update!: tbl_classlistUpdateWithoutTbl_class_trophyInput;

    @Field(() => tbl_classlistCreateWithoutTbl_class_trophyInput, {nullable:false})
    @Type(() => tbl_classlistCreateWithoutTbl_class_trophyInput)
    create!: tbl_classlistCreateWithoutTbl_class_trophyInput;
}
