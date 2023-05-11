import { InputType } from '@nestjs/graphql'
import { IsEmail, IsStrongPassword, IsNotEmpty } from 'class-validator'

@InputType()
export class CredentialsSignin {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}
