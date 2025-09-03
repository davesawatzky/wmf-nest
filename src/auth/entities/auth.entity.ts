import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsEmail, IsJWT, IsOptional } from 'class-validator'
import { UserError } from '../../common.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class AuthPayload {
  userErrors: UserError[]

  @IsOptional()
  @IsJWT()
  diatonicToken?: string

  @IsOptional()
  @Field(() => User)
  user?: Partial<User>
}

@ObjectType()
export class PasswordExists {
  @Field(() => Int)
  id: number

  pass: boolean
}

@ObjectType()
export class EmailExists {
  @IsOptional()
  @IsEmail()
  email?: string
}

@ObjectType()
export class PasswordChangePayload {
  userErrors: UserError[]

  @IsBoolean()
  passwordChanged: boolean
}
