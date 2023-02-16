import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_reg_unavailableCreateManyTbl_reg_groupInput } from './tbl-reg-unavailable-create-many-tbl-reg-group.input'
import { Type } from 'class-transformer'

@InputType()
export class tbl_reg_unavailableCreateManyTbl_reg_groupInputEnvelope {
  @Field(() => [tbl_reg_unavailableCreateManyTbl_reg_groupInput], {
    nullable: false,
  })
  @Type(() => tbl_reg_unavailableCreateManyTbl_reg_groupInput)
  data!: Array<tbl_reg_unavailableCreateManyTbl_reg_groupInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
