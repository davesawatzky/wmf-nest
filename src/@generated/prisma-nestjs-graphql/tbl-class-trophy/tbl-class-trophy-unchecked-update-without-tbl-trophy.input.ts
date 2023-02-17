import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';

@InputType()
export class tbl_class_trophyUncheckedUpdateWithoutTbl_trophyInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    classID?: IntFieldUpdateOperationsInput;
}
