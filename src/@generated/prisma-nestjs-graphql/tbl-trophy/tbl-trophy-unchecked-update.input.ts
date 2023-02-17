import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { tbl_class_trophyUncheckedUpdateManyWithoutTbl_trophyNestedInput } from '../tbl-class-trophy/tbl-class-trophy-unchecked-update-many-without-tbl-trophy-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_trophyUncheckedUpdateInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    id?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => tbl_class_trophyUncheckedUpdateManyWithoutTbl_trophyNestedInput, {nullable:true})
    @Type(() => tbl_class_trophyUncheckedUpdateManyWithoutTbl_trophyNestedInput)
    tbl_class_trophy?: tbl_class_trophyUncheckedUpdateManyWithoutTbl_trophyNestedInput;
}
