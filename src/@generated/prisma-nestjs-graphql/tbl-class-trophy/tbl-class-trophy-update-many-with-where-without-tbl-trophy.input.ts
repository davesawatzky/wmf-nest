import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_class_trophyScalarWhereInput } from './tbl-class-trophy-scalar-where.input';
import { Type } from 'class-transformer';
import { tbl_class_trophyUncheckedUpdateManyWithoutTbl_class_trophyInput } from './tbl-class-trophy-unchecked-update-many-without-tbl-class-trophy.input';

@InputType()
export class tbl_class_trophyUpdateManyWithWhereWithoutTbl_trophyInput {

    @Field(() => tbl_class_trophyScalarWhereInput, {nullable:false})
    @Type(() => tbl_class_trophyScalarWhereInput)
    where!: tbl_class_trophyScalarWhereInput;

    @Field(() => tbl_class_trophyUncheckedUpdateManyWithoutTbl_class_trophyInput, {nullable:false})
    @Type(() => tbl_class_trophyUncheckedUpdateManyWithoutTbl_class_trophyInput)
    data!: tbl_class_trophyUncheckedUpdateManyWithoutTbl_class_trophyInput;
}
