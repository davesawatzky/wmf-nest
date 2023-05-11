import { ObjectType, Field } from '@nestjs/graphql'
import { UserError } from 'src/common.entity'
import { IsJWT } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

@ObjectType()
export class AuthPayload {
  userErrors: UserError[]

  @IsJWT()
  diatonicToken?: string

  @Field(() => User)
  user: Partial<User>
}
