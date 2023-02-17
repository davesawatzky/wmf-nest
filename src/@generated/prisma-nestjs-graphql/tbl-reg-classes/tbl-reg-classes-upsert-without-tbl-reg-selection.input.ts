import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_reg_classesUpdateWithoutTbl_reg_selectionInput } from './tbl-reg-classes-update-without-tbl-reg-selection.input';
import { Type } from 'class-transformer';
import { tbl_reg_classesCreateWithoutTbl_reg_selectionInput } from './tbl-reg-classes-create-without-tbl-reg-selection.input';

@InputType()
export class tbl_reg_classesUpsertWithoutTbl_reg_selectionInput {

    @Field(() => tbl_reg_classesUpdateWithoutTbl_reg_selectionInput, {nullable:false})
    @Type(() => tbl_reg_classesUpdateWithoutTbl_reg_selectionInput)
    update!: tbl_reg_classesUpdateWithoutTbl_reg_selectionInput;

    @Field(() => tbl_reg_classesCreateWithoutTbl_reg_selectionInput, {nullable:false})
    @Type(() => tbl_reg_classesCreateWithoutTbl_reg_selectionInput)
    create!: tbl_reg_classesCreateWithoutTbl_reg_selectionInput;
}
