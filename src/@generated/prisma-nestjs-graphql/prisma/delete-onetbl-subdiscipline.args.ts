import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_subdisciplineWhereUniqueInput } from '../tbl-subdiscipline/tbl-subdiscipline-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteOnetblSubdisciplineArgs {
  @Field(() => tbl_subdisciplineWhereUniqueInput, { nullable: false })
  @Type(() => tbl_subdisciplineWhereUniqueInput)
  where!: tbl_subdisciplineWhereUniqueInput
}
