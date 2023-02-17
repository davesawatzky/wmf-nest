import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { tbl_subdisciplineUpdateManyWithoutTbl_disciplineNestedInput } from '../tbl-subdiscipline/tbl-subdiscipline-update-many-without-tbl-discipline-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class tbl_disciplineUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => tbl_subdisciplineUpdateManyWithoutTbl_disciplineNestedInput, {nullable:true})
    @Type(() => tbl_subdisciplineUpdateManyWithoutTbl_disciplineNestedInput)
    tbl_subdiscipline?: tbl_subdisciplineUpdateManyWithoutTbl_disciplineNestedInput;
}
