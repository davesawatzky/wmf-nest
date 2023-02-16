import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_performerUpdateInput } from '../tbl-reg-performer/tbl-reg-performer-update.input'
import { Type } from 'class-transformer'
import { tbl_reg_performerWhereUniqueInput } from '../tbl-reg-performer/tbl-reg-performer-where-unique.input'

@ArgsType()
export class UpdateOnetblRegPerformerArgs {
  @Field(() => tbl_reg_performerUpdateInput, { nullable: false })
  @Type(() => tbl_reg_performerUpdateInput)
  data!: tbl_reg_performerUpdateInput

  @Field(() => tbl_reg_performerWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  where!: tbl_reg_performerWhereUniqueInput
}
