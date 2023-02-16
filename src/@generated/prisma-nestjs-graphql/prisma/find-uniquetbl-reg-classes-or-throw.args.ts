import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_classesWhereUniqueInput } from '../tbl-reg-classes/tbl-reg-classes-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquetblRegClassesOrThrowArgs {
  @Field(() => tbl_reg_classesWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_classesWhereUniqueInput)
  where!: tbl_reg_classesWhereUniqueInput
}
