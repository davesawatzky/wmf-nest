import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput } from '../tbl-classlist/tbl-classlist-update-one-required-without-tbl-class-trophy-nested.input';
import { Type } from 'class-transformer';
import { tbl_trophyUpdateOneRequiredWithoutTbl_class_trophyNestedInput } from '../tbl-trophy/tbl-trophy-update-one-required-without-tbl-class-trophy-nested.input';

@InputType()
export class tbl_class_trophyUpdateInput {

    @Field(() => tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput, {nullable:true})
    @Type(() => tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput)
    tbl_classlist?: tbl_classlistUpdateOneRequiredWithoutTbl_class_trophyNestedInput;

    @Field(() => tbl_trophyUpdateOneRequiredWithoutTbl_class_trophyNestedInput, {nullable:true})
    tbl_trophy?: tbl_trophyUpdateOneRequiredWithoutTbl_class_trophyNestedInput;
}
