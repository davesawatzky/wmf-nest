import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_userWhereInput } from '../tbl-user/tbl-user-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManytblUserArgs {
  @Field(() => tbl_userWhereInput, { nullable: true })
  @Type(() => tbl_userWhereInput)
  where?: tbl_userWhereInput
}
