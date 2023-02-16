import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_reg_unavailableCreateManyInput } from '../tbl-reg-unavailable/tbl-reg-unavailable-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblRegUnavailableArgs {
  @Field(() => [tbl_reg_unavailableCreateManyInput], { nullable: false })
  @Type(() => tbl_reg_unavailableCreateManyInput)
  data!: Array<tbl_reg_unavailableCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
