import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsJWT } from 'class-validator'
import { UserError } from '../../common.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class AuthPayload {
  userErrors: UserError[]

  @IsJWT()
  diatonicToken?: string

  @Field(() => User)
  user?: Partial<User>
}

@ObjectType()
export class PasswordExists {
  @Field(() => Int)
  id: number

  pass: boolean
}
