import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { Enumtbl_registration_performerTypeFieldUpdateOperationsInput } from '../prisma/enumtbl-registration-performer-type-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input';
import { Type } from 'class-transformer';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { tbl_reg_communityUncheckedUpdateManyWithoutTbl_registrationNestedInput } from '../tbl-reg-community/tbl-reg-community-unchecked-update-many-without-tbl-registration-nested.input';
import { tbl_reg_groupUncheckedUpdateManyWithoutTbl_registrationNestedInput } from '../tbl-reg-group/tbl-reg-group-unchecked-update-many-without-tbl-registration-nested.input';
import { tbl_reg_performerUncheckedUpdateManyWithoutTbl_registrationNestedInput } from '../tbl-reg-performer/tbl-reg-performer-unchecked-update-many-without-tbl-registration-nested.input';
import { tbl_reg_schoolUncheckedUpdateOneWithoutTbl_registrationNestedInput } from '../tbl-reg-school/tbl-reg-school-unchecked-update-one-without-tbl-registration-nested.input';
import { tbl_reg_teacherUncheckedUpdateOneWithoutTbl_registrationNestedInput } from '../tbl-reg-teacher/tbl-reg-teacher-unchecked-update-one-without-tbl-registration-nested.input';

@InputType()
export class tbl_registrationUncheckedUpdateWithoutTbl_reg_classesInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    id?: IntFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    userID?: NullableIntFieldUpdateOperationsInput;

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

    @Field(() => tbl_reg_communityUncheckedUpdateManyWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_communityUncheckedUpdateManyWithoutTbl_registrationNestedInput)
    tbl_reg_community?: tbl_reg_communityUncheckedUpdateManyWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_groupUncheckedUpdateManyWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_groupUncheckedUpdateManyWithoutTbl_registrationNestedInput)
    tbl_reg_group?: tbl_reg_groupUncheckedUpdateManyWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_performerUncheckedUpdateManyWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_performerUncheckedUpdateManyWithoutTbl_registrationNestedInput)
    tbl_reg_performer?: tbl_reg_performerUncheckedUpdateManyWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_schoolUncheckedUpdateOneWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_schoolUncheckedUpdateOneWithoutTbl_registrationNestedInput)
    tbl_reg_school?: tbl_reg_schoolUncheckedUpdateOneWithoutTbl_registrationNestedInput;

    @Field(() => tbl_reg_teacherUncheckedUpdateOneWithoutTbl_registrationNestedInput, {nullable:true})
    @Type(() => tbl_reg_teacherUncheckedUpdateOneWithoutTbl_registrationNestedInput)
    tbl_reg_teacher?: tbl_reg_teacherUncheckedUpdateOneWithoutTbl_registrationNestedInput;
}
