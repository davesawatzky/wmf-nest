import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_trophyCreateNestedOneWithoutTbl_class_trophyInput } from '../tbl-trophy/tbl-trophy-create-nested-one-without-tbl-class-trophy.input';

@InputType()
export class tbl_class_trophyCreateWithoutTbl_classlistInput {

    @Field(() => tbl_trophyCreateNestedOneWithoutTbl_class_trophyInput, {nullable:false})
    tbl_trophy!: tbl_trophyCreateNestedOneWithoutTbl_class_trophyInput;
}
