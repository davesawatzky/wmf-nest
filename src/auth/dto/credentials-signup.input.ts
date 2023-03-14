import { InputType } from '@nestjs/graphql'
import { IsEmail, IsStrongPassword, IsString } from 'class-validator'

@InputType()
export class CredentialsSignup {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string
}
