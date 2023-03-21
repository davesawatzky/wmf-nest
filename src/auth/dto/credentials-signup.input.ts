import { InputType } from '@nestjs/graphql'
import { IsEmail, IsStrongPassword, IsString } from 'class-validator'

@InputType()
export class CredentialsSignup {
  @IsString()
  first_name: string

  @IsString()
  last_name: string

  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string
}
