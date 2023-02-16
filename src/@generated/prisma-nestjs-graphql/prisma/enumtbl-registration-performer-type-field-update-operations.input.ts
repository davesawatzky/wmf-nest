import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registration_performerType } from '../tbl-registration/tbl-registration-performer-type.enum'

@InputType()
export class Enumtbl_registration_performerTypeFieldUpdateOperationsInput {
  @Field(() => tbl_registration_performerType, { nullable: true })
  set?: keyof typeof tbl_registration_performerType
}
