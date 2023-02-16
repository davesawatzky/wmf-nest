import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_classesCreateManyInput } from '../tbl-reg-classes/tbl-reg-classes-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblRegClassesArgs {
  @Field(() => [tbl_reg_classesCreateManyInput], { nullable: false })
  @Type(() => tbl_reg_classesCreateManyInput)
  data!: Array<tbl_reg_classesCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
