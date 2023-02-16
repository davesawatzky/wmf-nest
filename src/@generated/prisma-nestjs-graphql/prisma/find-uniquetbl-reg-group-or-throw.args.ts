import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_groupWhereUniqueInput } from '../tbl-reg-group/tbl-reg-group-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquetblRegGroupOrThrowArgs {
  @Field(() => tbl_reg_groupWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_groupWhereUniqueInput)
  where!: tbl_reg_groupWhereUniqueInput
}
