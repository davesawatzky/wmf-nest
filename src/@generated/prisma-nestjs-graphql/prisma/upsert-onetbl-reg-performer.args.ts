import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_performerWhereUniqueInput } from '../tbl-reg-performer/tbl-reg-performer-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_reg_performerCreateInput } from '../tbl-reg-performer/tbl-reg-performer-create.input'
import { tbl_reg_performerUpdateInput } from '../tbl-reg-performer/tbl-reg-performer-update.input'

@ArgsType()
export class UpsertOnetblRegPerformerArgs {
  @Field(() => tbl_reg_performerWhereUniqueInput, { nullable: false })
  @Type(() => tbl_reg_performerWhereUniqueInput)
  where!: tbl_reg_performerWhereUniqueInput

  @Field(() => tbl_reg_performerCreateInput, { nullable: false })
  @Type(() => tbl_reg_performerCreateInput)
  create!: tbl_reg_performerCreateInput

  @Field(() => tbl_reg_performerUpdateInput, { nullable: false })
  @Type(() => tbl_reg_performerUpdateInput)
  update!: tbl_reg_performerUpdateInput
}
