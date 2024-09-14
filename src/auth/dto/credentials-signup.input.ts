import { InputType } from '@nestjs/graphql'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
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

  @IsString()
  @IsOptional()
  instrument?: string
}
