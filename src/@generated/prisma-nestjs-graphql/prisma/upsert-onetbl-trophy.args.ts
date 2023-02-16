import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_trophyWhereUniqueInput } from '../tbl-trophy/tbl-trophy-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_trophyCreateInput } from '../tbl-trophy/tbl-trophy-create.input'
import { tbl_trophyUpdateInput } from '../tbl-trophy/tbl-trophy-update.input'

@ArgsType()
export class UpsertOnetblTrophyArgs {
  @Field(() => tbl_trophyWhereUniqueInput, { nullable: false })
  @Type(() => tbl_trophyWhereUniqueInput)
  where!: tbl_trophyWhereUniqueInput

  @Field(() => tbl_trophyCreateInput, { nullable: false })
  @Type(() => tbl_trophyCreateInput)
  create!: tbl_trophyCreateInput

  @Field(() => tbl_trophyUpdateInput, { nullable: false })
  @Type(() => tbl_trophyUpdateInput)
  update!: tbl_trophyUpdateInput
}
