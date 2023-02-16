import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_levelWhereUniqueInput } from '../tbl-level/tbl-level-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_levelCreateInput } from '../tbl-level/tbl-level-create.input'
import { tbl_levelUpdateInput } from '../tbl-level/tbl-level-update.input'

@ArgsType()
export class UpsertOnetblLevelArgs {
  @Field(() => tbl_levelWhereUniqueInput, { nullable: false })
  @Type(() => tbl_levelWhereUniqueInput)
  where!: tbl_levelWhereUniqueInput

  @Field(() => tbl_levelCreateInput, { nullable: false })
  @Type(() => tbl_levelCreateInput)
  create!: tbl_levelCreateInput

  @Field(() => tbl_levelUpdateInput, { nullable: false })
  @Type(() => tbl_levelUpdateInput)
  update!: tbl_levelUpdateInput
}
