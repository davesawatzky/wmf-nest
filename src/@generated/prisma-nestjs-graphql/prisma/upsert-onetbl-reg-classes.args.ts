import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_classesWhereUniqueInput } from '../tbl-reg-classes/tbl-reg-classes-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesCreateInput } from '../tbl-reg-classes/tbl-reg-classes-create.input'
import { tbl_reg_classesUpdateInput } from '../tbl-reg-classes/tbl-reg-classes-update.input'

@ArgsType()
export class UpsertOnetblRegClassesArgs {
  @Field(() => tbl_reg_classesWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  where!: tbl_reg_classesWhereUniqueInput

  @Field(() => tbl_reg_classesCreateInput, { nullable: false })
  @Type(() => tbl_reg_classesCreateInput)
  create!: tbl_reg_classesCreateInput

  @Field(() => tbl_reg_classesUpdateInput, { nullable: false })
  @Type(() => tbl_reg_classesUpdateInput)
  update!: tbl_reg_classesUpdateInput
}
