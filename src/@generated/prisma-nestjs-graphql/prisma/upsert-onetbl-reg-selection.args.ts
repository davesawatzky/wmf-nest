import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_selectionWhereUniqueInput } from '../tbl-reg-selection/tbl-reg-selection-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_selectionCreateInput } from '../tbl-reg-selection/tbl-reg-selection-create.input'
import { tbl_reg_selectionUpdateInput } from '../tbl-reg-selection/tbl-reg-selection-update.input'

@ArgsType()
export class UpsertOnetblRegSelectionArgs {
  @Field(() => tbl_reg_selectionWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_selectionWhereUniqueInput)
  where!: tbl_reg_selectionWhereUniqueInput

  @Field(() => tbl_reg_selectionCreateInput, { nullable: false })
  @Type(() => tbl_reg_selectionCreateInput)
  create!: tbl_reg_selectionCreateInput

  @Field(() => tbl_reg_selectionUpdateInput, { nullable: false })
  @Type(() => tbl_reg_selectionUpdateInput)
  update!: tbl_reg_selectionUpdateInput
}
