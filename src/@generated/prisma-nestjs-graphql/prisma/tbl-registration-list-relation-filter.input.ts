import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { tbl_registrationWhereInput } from '../tbl-registration/tbl-registration-where.input'
import { Type } from 'class-transformer'

@InputType()
export class Tbl_registrationListRelationFilter {
  @Field(() => tbl_registrationWhereInput, { nullable: true })
  @Type(() => tbl_registrationWhereInput)
  every?: tbl_registrationWhereInput

  @Field(() => tbl_registrationWhereInput, { nullable: true })
  @Type(() => tbl_registrationWhereInput)
  some?: tbl_registrationWhereInput

  @Field(() => tbl_registrationWhereInput, { nullable: true })
  @Type(() => tbl_registrationWhereInput)
  none?: tbl_registrationWhereInput
}
