import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_selectionCreateManyInput } from '../tbl-reg-selection/tbl-reg-selection-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblRegSelectionArgs {
  @Field(() => [tbl_reg_selectionCreateManyInput], { nullable: false })
  @Type(() => tbl_reg_selectionCreateManyInput)
  data!: Array<tbl_reg_selectionCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
