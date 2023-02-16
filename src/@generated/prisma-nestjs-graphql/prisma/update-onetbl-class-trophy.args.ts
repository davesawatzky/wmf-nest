import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_class_trophyUpdateInput } from '../tbl-class-trophy/tbl-class-trophy-update.input'
import { Type } from 'class-transformer'
import { tbl_class_trophyWhereUniqueInput } from '../tbl-class-trophy/tbl-class-trophy-where-unique.input'

@ArgsType()
export class UpdateOnetblClassTrophyArgs {
  @Field(() => tbl_class_trophyUpdateInput, { nullable: false })
  @Type(() => tbl_class_trophyUpdateInput)
  data!: tbl_class_trophyUpdateInput

  @Field(() => tbl_class_trophyWhereUniqueInput, { nullable: false })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  where!: tbl_class_trophyWhereUniqueInput
}
