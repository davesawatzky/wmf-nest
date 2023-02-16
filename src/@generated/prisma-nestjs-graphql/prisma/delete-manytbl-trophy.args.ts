import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_trophyWhereInput } from '../tbl-trophy/tbl-trophy-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManytblTrophyArgs {
  @Field(() => tbl_trophyWhereInput, { nullable: true })
  @Type(() => tbl_trophyWhereInput)
  where?: tbl_trophyWhereInput
}
