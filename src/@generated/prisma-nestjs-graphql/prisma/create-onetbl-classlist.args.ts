import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_classlistCreateInput } from '../tbl-classlist/tbl-classlist-create.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateOnetblClasslistArgs {
  @Field(() => tbl_classlistCreateInput, { nullable: false })
  @Type(() => tbl_classlistCreateInput)
  data!: tbl_classlistCreateInput
}
