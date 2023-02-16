import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { tbl_registrationWhereInput } from '../tbl-registration/tbl-registration-where.input'
import { Type } from 'class-transformer'
import { tbl_registrationOrderByWithRelationInput } from '../tbl-registration/tbl-registration-order-by-with-relation.input'
import { tbl_registrationWhereUniqueInput } from '../tbl-registration/tbl-registration-where-unique.input'
import { Int } from '@nestjs/graphql'

@ArgsType()
export class AggregatetblRegistrationArgs {
  @Field(() => tbl_registrationWhereInput, { nullable: true })
  @Type(() => tbl_registrationWhereInput)
  where?: tbl_registrationWhereInput

  @Field(() => [tbl_registrationOrderByWithRelationInput], { nullable: true })
  @Type(() => tbl_registrationOrderByWithRelationInput)
  orderBy?: Array<tbl_registrationOrderByWithRelationInput>

  @Field(() => tbl_registrationWhereUniqueInput, { nullable: true })
  @Type(() => tbl_registrationWhereUniqueInput)
  cursor?: tbl_registrationWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
