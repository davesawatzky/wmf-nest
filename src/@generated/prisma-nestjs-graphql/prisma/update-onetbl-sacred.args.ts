import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_sacredUpdateInput } from '../tbl-sacred/tbl-sacred-update.input'
import { Type } from 'class-transformer'
import { tbl_sacredWhereUniqueInput } from '../tbl-sacred/tbl-sacred-where-unique.input'

@ArgsType()
export class UpdateOnetblSacredArgs {
  @Field(() => tbl_sacredUpdateInput, { nullable: false })
  @Type(() => tbl_sacredUpdateInput)
  data!: tbl_sacredUpdateInput

  @Field(() => tbl_sacredWhereUniqueInput, { nullable: false })
  @Type(() => tbl_sacredWhereUniqueInput)
  where!: tbl_sacredWhereUniqueInput
}
