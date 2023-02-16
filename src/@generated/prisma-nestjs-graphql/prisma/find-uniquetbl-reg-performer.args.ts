import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_performerWhereUniqueInput } from '../tbl-reg-performer/tbl-reg-performer-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniquetblRegPerformerArgs {
  @Field(() => tbl_reg_performerWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  where!: tbl_reg_performerWhereUniqueInput
}
