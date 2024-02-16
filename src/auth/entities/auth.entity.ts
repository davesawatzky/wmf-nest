import { ObjectType, Field, Int } from '@nestjs/graphql'
import { UserError } from '../../common.entity'
import { IsJWT, IsOptional } from 'class-validator'
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
