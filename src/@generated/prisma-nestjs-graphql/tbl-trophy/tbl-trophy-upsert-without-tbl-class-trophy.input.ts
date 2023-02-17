import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_trophyUpdateWithoutTbl_class_trophyInput } from './tbl-trophy-update-without-tbl-class-trophy.input';
import { Type } from 'class-transformer';
import { tbl_trophyCreateWithoutTbl_class_trophyInput } from './tbl-trophy-create-without-tbl-class-trophy.input';

@InputType()
export class tbl_trophyUpsertWithoutTbl_class_trophyInput {

    @Field(() => tbl_trophyUpdateWithoutTbl_class_trophyInput, {nullable:false})
    @Type(() => tbl_trophyUpdateWithoutTbl_class_trophyInput)
    update!: tbl_trophyUpdateWithoutTbl_class_trophyInput;

    @Field(() => tbl_trophyCreateWithoutTbl_class_trophyInput, {nullable:false})
    @Type(() => tbl_trophyCreateWithoutTbl_class_trophyInput)
    create!: tbl_trophyCreateWithoutTbl_class_trophyInput;
}
