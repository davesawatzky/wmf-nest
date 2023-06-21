import { ObjectType, Field } from '@nestjs/graphql'
import { UserError } from '../../common.entity'
import { IsJWT } from 'class-validator'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class AuthPayload {
  userErrors: UserError[]

  @IsJWT()
  diatonicToken?: string

  @Field(() => User)
  user: Partial<User>
}
