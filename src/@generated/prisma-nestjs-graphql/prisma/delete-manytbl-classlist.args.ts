import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_classlistWhereInput } from '../tbl-classlist/tbl-classlist-where.input'
import { Type } from 'class-transformer'

@ArgsType()
export class DeleteManytblClasslistArgs {
  @Field(() => tbl_classlistWhereInput, { nullable: true })
  @Type(() => tbl_classlistWhereInput)
  where?: tbl_classlistWhereInput
}
