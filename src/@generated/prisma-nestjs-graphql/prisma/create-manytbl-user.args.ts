import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_userCreateManyInput } from '../tbl-user/tbl-user-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblUserArgs {
  @Field(() => [tbl_userCreateManyInput], { nullable: false })
  @Type(() => tbl_userCreateManyInput)
  data!: Array<tbl_userCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
