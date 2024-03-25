import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'
export class PaymentCreateDto {
  // ... Other parameters

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsString()
  currency: string
  
}
