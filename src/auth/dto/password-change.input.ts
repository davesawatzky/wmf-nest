import { InputType } from '@nestjs/graphql'
import { IsJWT, IsNotEmpty, IsStrongPassword } from 'class-validator'

@InputType()
export class PasswordChangeInput {
  @IsStrongPassword()
  @IsNotEmpty()
  password1: string

  @IsStrongPassword()
  @IsNotEmpty()
  password2: string

  @IsJWT()
  @IsNotEmpty()
  resetToken: string
}
