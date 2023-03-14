import { InputType } from '@nestjs/graphql'
import { IsEmail, IsStrongPassword } from 'class-validator'

@InputType()
export class CredentialsSignin {
  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string
}
