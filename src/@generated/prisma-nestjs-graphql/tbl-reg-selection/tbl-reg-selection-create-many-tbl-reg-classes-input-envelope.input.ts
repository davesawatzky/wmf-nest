import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_selectionCreateManyTbl_reg_classesInput } from './tbl-reg-selection-create-many-tbl-reg-classes.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_selectionCreateManyTbl_reg_classesInputEnvelope {
  @Field(() => [tbl_reg_selectionCreateManyTbl_reg_classesInput], {
    nullable: false,
  })
  @Type(() => tbl_reg_selectionCreateManyTbl_reg_classesInput)
  data!: Array<tbl_reg_selectionCreateManyTbl_reg_classesInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
