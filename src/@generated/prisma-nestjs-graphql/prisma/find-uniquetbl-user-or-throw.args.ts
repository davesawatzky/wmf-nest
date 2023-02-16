import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_userWhereUniqueInput } from '../tbl-user/tbl-user-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquetblUserOrThrowArgs {
  @Field(() => tbl_userWhereUniqueInput, { nullable: false })
  @Type(() => tbl_userWhereUniqueInput)
  where!: tbl_userWhereUniqueInput
}
