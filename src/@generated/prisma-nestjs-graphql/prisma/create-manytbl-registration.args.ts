import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_registrationCreateManyInput } from '../tbl-registration/tbl-registration-create-many.input'
import { Type } from 'class-transformer'

@ArgsType()
export class CreateManytblRegistrationArgs {
  @Field(() => [tbl_registrationCreateManyInput], { nullable: false })
  @Type(() => tbl_registrationCreateManyInput)
  data!: Array<tbl_registrationCreateManyInput>

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean
}
