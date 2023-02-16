import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_registrationUpdateManyMutationInput } from '../tbl-registration/tbl-registration-update-many-mutation.input'
import { Type } from 'class-transformer'
import { tbl_registrationWhereInput } from '../tbl-registration/tbl-registration-where.input'

@ArgsType()
export class UpdateManytblRegistrationArgs {
  @Field(() => tbl_registrationUpdateManyMutationInput, { nullable: false })
  @Type(() => tbl_registrationUpdateManyMutationInput)
  data!: tbl_registrationUpdateManyMutationInput

  @Field(() => tbl_registrationWhereInput, { nullable: true })
  @Type(() => tbl_registrationWhereInput)
  where?: tbl_registrationWhereInput
}
