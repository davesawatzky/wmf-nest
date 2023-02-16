import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_classlistUpdateInput } from '../tbl-classlist/tbl-classlist-update.input'
import { Type } from 'class-transformer'
import { tbl_classlistWhereUniqueInput } from '../tbl-classlist/tbl-classlist-where-unique.input'

@ArgsType()
export class UpdateOnetblClasslistArgs {
  @Field(() => tbl_classlistUpdateInput, { nullable: false })
  @Type(() => tbl_classlistUpdateInput)
  data!: tbl_classlistUpdateInput

  @Field(() => tbl_classlistWhereUniqueInput, { nullable: false })
  @Type(() => tbl_classlistWhereUniqueInput)
  where!: tbl_classlistWhereUniqueInput
}
