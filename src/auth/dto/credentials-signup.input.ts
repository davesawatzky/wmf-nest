import { InputType } from '@nestjs/graphql'
import {
  IsEmail,
  IsStrongPassword,
  IsString,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator'

@InputType()
export class CredentialsSignup {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string

  @IsBoolean()
  privateTeacher: boolean

  @IsBoolean()
  schoolTeacher: boolean
}
