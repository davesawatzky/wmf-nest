import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_subdiscipline_SGSlabel } from './tbl-subdiscipline-sg-slabel.enum'

@InputType()
export class Enumtbl_subdiscipline_SGSlabelFieldUpdateOperationsInput {
  @Field(() => tbl_subdiscipline_SGSlabel, { nullable: true })
  set?: keyof typeof tbl_subdiscipline_SGSlabel
}
