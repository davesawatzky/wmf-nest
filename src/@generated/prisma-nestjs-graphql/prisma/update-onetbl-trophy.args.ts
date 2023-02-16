import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_trophyUpdateInput } from '../tbl-trophy/tbl-trophy-update.input'
import { Type } from 'class-transformer'
import { tbl_trophyWhereUniqueInput } from '../tbl-trophy/tbl-trophy-where-unique.input'

@ArgsType()
export class UpdateOnetblTrophyArgs {
  @Field(() => tbl_trophyUpdateInput, { nullable: false })
  @Type(() => tbl_trophyUpdateInput)
  data!: tbl_trophyUpdateInput

  @Field(() => tbl_trophyWhereUniqueInput, { nullable: false })
  @Type(() => tbl_trophyWhereUniqueInput)
  where!: tbl_trophyWhereUniqueInput
}
