import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_class_trophyWhereUniqueInput } from '../tbl-class-trophy/tbl-class-trophy-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteOnetblClassTrophyArgs {
  @Field(() => tbl_class_trophyWhereUniqueInput, { nullable: false })
  @Type(() => tbl_class_trophyWhereUniqueInput)
  where!: tbl_class_trophyWhereUniqueInput
}
