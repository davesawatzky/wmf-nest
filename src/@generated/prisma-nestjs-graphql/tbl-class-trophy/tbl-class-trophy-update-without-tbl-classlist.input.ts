import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_trophyUpdateOneRequiredWithoutTbl_class_trophyNestedInput } from '../tbl-trophy/tbl-trophy-update-one-required-without-tbl-class-trophy-nested.input';

@InputType()
export class tbl_class_trophyUpdateWithoutTbl_classlistInput {

    @Field(() => tbl_trophyUpdateOneRequiredWithoutTbl_class_trophyNestedInput, {nullable:true})
    tbl_trophy?: tbl_trophyUpdateOneRequiredWithoutTbl_class_trophyNestedInput;
}
