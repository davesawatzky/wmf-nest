import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_classlistCreateManyInput } from '../tbl-classlist/tbl-classlist-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblClasslistArgs {
  @Field(() => [tbl_classlistCreateManyInput], { nullable: false })
  @Type(() => tbl_classlistCreateManyInput)
  data!: Array<tbl_classlistCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
