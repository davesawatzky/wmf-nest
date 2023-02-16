import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_classesWhereInput } from '../tbl-reg-classes/tbl-reg-classes-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManytblRegClassesArgs {
  @Field(() => tbl_reg_classesWhereInput, { nullable: true })
  @Type(() => tbl_reg_classesWhereInput)
  where?: tbl_reg_classesWhereInput
}
