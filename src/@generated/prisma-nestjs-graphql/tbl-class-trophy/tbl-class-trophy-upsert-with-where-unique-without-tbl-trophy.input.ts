import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyWhereUniqueInput } from './tbl-class-trophy-where-unique.input';
import { Type } from 'class-transformer';
import { tbl_class_trophyUpdateWithoutTbl_trophyInput } from './tbl-class-trophy-update-without-tbl-trophy.input';
import { tbl_class_trophyCreateWithoutTbl_trophyInput } from './tbl-class-trophy-create-without-tbl-trophy.input';

@InputType()
export class tbl_class_trophyUpsertWithWhereUniqueWithoutTbl_trophyInput {

    @Field(() => tbl_class_trophyWhereUniqueInput, {nullable:false})
    @Type(() => tbl_class_trophyWhereUniqueInput)
    where!: tbl_class_trophyWhereUniqueInput;

    @Field(() => tbl_class_trophyUpdateWithoutTbl_trophyInput, {nullable:false})
    @Type(() => tbl_class_trophyUpdateWithoutTbl_trophyInput)
    update!: tbl_class_trophyUpdateWithoutTbl_trophyInput;

    @Field(() => tbl_class_trophyCreateWithoutTbl_trophyInput, {nullable:false})
    @Type(() => tbl_class_trophyCreateWithoutTbl_trophyInput)
    create!: tbl_class_trophyCreateWithoutTbl_trophyInput;
}
