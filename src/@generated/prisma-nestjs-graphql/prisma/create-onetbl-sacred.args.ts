import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_sacredCreateInput } from '../tbl-sacred/tbl-sacred-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblSacredArgs {
  @Field(() => tbl_sacredCreateInput, { nullable: false })
  @Type(() => tbl_sacredCreateInput)
  data!: tbl_sacredCreateInput
}
