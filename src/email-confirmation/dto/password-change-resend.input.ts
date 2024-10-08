import { InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

@InputType()
export class PasswordChangeResend {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
