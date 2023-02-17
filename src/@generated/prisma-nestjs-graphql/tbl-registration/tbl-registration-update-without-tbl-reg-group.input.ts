import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { Enumtbl_registration_performerTypeFieldUpdateOperationsInput } from '../prisma/enumtbl-registration-performer-type-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input';
import { Type } from 'class-transformer';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { tbl_userUpdateOneWithoutTbl_registrationNestedInput } from '../tbl-user/tbl-user-update-one-without-tbl-registration-nested.input';
import { tbl_reg_classesUpdateManyWithoutTbl_registrationNestedInput } from '../tbl-reg-classes/tbl-reg-classes-update-many-without-tbl-registration-nested.input';
import { tbl_reg_communityUpdateManyWithoutTbl_registrationNestedInput } from '../tbl-reg-community/tbl-reg-community-update-many-without-tbl-registration-nested.input';
import { tbl_reg_performerUpdateManyWithoutTbl_registrationNestedInput } from '../tbl-reg-performer/tbl-reg-performer-update-many-without-tbl-registration-nested.input';
import { tbl_reg_schoolUpdateOneWithoutTbl_registrationNestedInput } from '../tbl-reg-school/tbl-reg-school-update-one-without-tbl-registration-nested.input';
import { tbl_reg_teacherUpdateOneWithoutTbl_registrationNestedInput } from '../tbl-reg-teacher/tbl-reg-teacher-update-one-without-tbl-registration-nested.input';

@InputType()
export class tbl_registrationUpdateWithoutTbl_reg_groupInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    label?: StringFieldUpdateOperationsInput;

    @Field(() => Enumtbl_registration_performerTypeFieldUpdateOperationsInput, {nullable:true})
    performerType?: Enumtbl_registration_performerTypeFieldUpdateOperationsInput;

    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput;

    @Field(() => NullableDecimalFieldUpdateOperationsInput, {nullable:true})
    @Type(() => NullableDecimalFieldUpdateOperationsInput)
    totalAmt?: NullableDecimalFieldUpdateOperationsInput;

    @Field(() => NullableDecimalFieldUpdateOperationsInput, {nullable:true})
    @Type(() => NullableDecimalFieldUpdateOperationsInput)
    payedAmt?: NullableDecimalFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    transactionInfo?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    confirmation?: NullableStringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => tbl_userUpdateOneWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_userUpdateOneWithoutTbl_registrationNestedInput)
    tbl_user?: tbl_userUpdateOneWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_classesUpdateManyWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_classesUpdateManyWithoutTbl_registrationNestedInput)
    tbl_reg_classes?: tbl_reg_classesUpdateManyWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_communityUpdateManyWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_communityUpdateManyWithoutTbl_registrationNestedInput)
    tbl_reg_community?: tbl_reg_communityUpdateManyWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_performerUpdateManyWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_performerUpdateManyWithoutTbl_registrationNestedInput)
    tbl_reg_performer?: tbl_reg_performerUpdateManyWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_schoolUpdateOneWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_schoolUpdateOneWithoutTbl_registrationNestedInput)
    tbl_reg_school?: tbl_reg_schoolUpdateOneWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_teacherUpdateOneWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_teacherUpdateOneWithoutTbl_registrationNestedInput)
    tbl_reg_teacher?: tbl_reg_teacherUpdateOneWithoutTbl_registrationNestedInput;
}
