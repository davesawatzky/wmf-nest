import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { tbl_classlistUncheckedUpdateManyWithoutTbl_levelNestedInput } from '../tbl-classlist/tbl-classlist-unchecked-update-many-without-tbl-level-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_levelUncheckedUpdateInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    id?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    order?: NullableIntFieldUpdateOperationsInput;

    @Field(() => tbl_classlistUncheckedUpdateManyWithoutTbl_levelNestedInput, {nullable:true})
    @Type(() => tbl_classlistUncheckedUpdateManyWithoutTbl_levelNestedInput)
    tbl_classlist?: tbl_classlistUncheckedUpdateManyWithoutTbl_levelNestedInput;
}
