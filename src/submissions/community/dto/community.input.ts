import { InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsPhoneNumber, IsPostalCode, IsString } from 'class-validator'

@InputType()
export class CommunityInput {
  @IsString()
  @IsOptional()
  name?: string

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
}
