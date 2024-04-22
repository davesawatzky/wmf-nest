import { Field, InputType, Int } from '@nestjs/graphql'
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from 'class-validator'

@InputType()
export class PerformerInput {
  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsString()
  @IsOptional()
  apartment?: string

  @IsString()
  @IsOptional()
  streetNumber?: string

  @IsString()
  @IsOptional()
  streetName?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  province?: string

  @IsPostalCode('CA')
  @IsOptional()
  postalCode?: string

  @IsPhoneNumber('CA')
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsInt()
  @Field(() => Int)
  @IsOptional()
  age?: number

  @IsString()
  @IsOptional()
  otherClasses?: string

  @IsString()
  @IsOptional()
  instrument?: string

  @IsString()
  @IsOptional()
  level?: string
}
