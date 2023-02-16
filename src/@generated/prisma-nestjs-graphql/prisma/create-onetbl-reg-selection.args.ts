import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_selectionCreateInput } from '../tbl-reg-selection/tbl-reg-selection-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblRegSelectionArgs {
  @Field(() => tbl_reg_selectionCreateInput, { nullable: false })
  @Type(() => tbl_reg_selectionCreateInput)
  data!: tbl_reg_selectionCreateInput
}
