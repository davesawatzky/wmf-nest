import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_performerCreateManyInput } from '../tbl-reg-performer/tbl-reg-performer-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblRegPerformerArgs {
  @Field(() => [tbl_reg_performerCreateManyInput], { nullable: false })
  @Type(() => tbl_reg_performerCreateManyInput)
  data!: Array<tbl_reg_performerCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
