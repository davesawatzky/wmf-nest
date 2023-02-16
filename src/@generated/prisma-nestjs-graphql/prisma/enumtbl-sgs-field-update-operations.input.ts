import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_SGS } from './tbl-sgs.enum'

@InputType()
export class Enumtbl_SGSFieldUpdateOperationsInput {
  @Field(() => tbl_SGS, { nullable: true })
  set?: keyof typeof tbl_SGS
}
