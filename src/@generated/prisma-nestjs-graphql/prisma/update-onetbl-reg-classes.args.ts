import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_classesUpdateInput } from '../tbl-reg-classes/tbl-reg-classes-update.input'
import { Type } from 'class-transformer'
import { tbl_reg_classesWhereUniqueInput } from '../tbl-reg-classes/tbl-reg-classes-where-unique.input'

@ArgsType()
export class UpdateOnetblRegClassesArgs {
  @Field(() => tbl_reg_classesUpdateInput, { nullable: false })
  @Type(() => tbl_reg_classesUpdateInput)
  data!: tbl_reg_classesUpdateInput

  @Field(() => tbl_reg_classesWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  where!: tbl_reg_classesWhereUniqueInput
}
