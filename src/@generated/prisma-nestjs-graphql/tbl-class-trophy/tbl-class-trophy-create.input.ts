import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistCreateNestedOneWithoutTbl_class_trophyInput } from '../tbl-classlist/tbl-classlist-create-nested-one-without-tbl-class-trophy.input';
import { Type } from 'class-transformer';
import { tbl_trophyCreateNestedOneWithoutTbl_class_trophyInput } from '../tbl-trophy/tbl-trophy-create-nested-one-without-tbl-class-trophy.input';

@InputType()
export class tbl_class_trophyCreateInput {

    @Field(() => tbl_classlistCreateNestedOneWithoutTbl_class_trophyInput, {nullable:false})
    @Type(() => tbl_classlistCreateNestedOneWithoutTbl_class_trophyInput)
    tbl_classlist!: tbl_classlistCreateNestedOneWithoutTbl_class_trophyInput;

    @Field(() => tbl_trophyCreateNestedOneWithoutTbl_class_trophyInput, {nullable:false})
    tbl_trophy!: tbl_trophyCreateNestedOneWithoutTbl_class_trophyInput;
}
