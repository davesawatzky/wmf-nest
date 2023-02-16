import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_registrationWhereUniqueInput } from '../tbl-registration/tbl-registration-where-unique.input'
import { Type } from 'class-transformer'
import { tbl_registrationCreateInput } from '../tbl-registration/tbl-registration-create.input'
import { tbl_registrationUpdateInput } from '../tbl-registration/tbl-registration-update.input'

@ArgsType()
export class UpsertOnetblRegistrationArgs {
  @Field(() => tbl_registrationWhereUniqueInput, { nullable: false })
  @Type(() => tbl_registrationWhereUniqueInput)
  where!: tbl_registrationWhereUniqueInput

  @Field(() => tbl_registrationCreateInput, { nullable: false })
  @Type(() => tbl_registrationCreateInput)
  create!: tbl_registrationCreateInput

  @Field(() => tbl_registrationUpdateInput, { nullable: false })
  @Type(() => tbl_registrationUpdateInput)
  update!: tbl_registrationUpdateInput
}
