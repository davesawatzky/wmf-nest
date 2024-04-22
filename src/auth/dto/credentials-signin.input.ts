import { InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

@InputType()
export class CredentialsSignin {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}
