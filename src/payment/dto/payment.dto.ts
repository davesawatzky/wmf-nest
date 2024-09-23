import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PaymentCreateDto {
  // ... Other parameters

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsString()
  currency: string

  @IsBoolean()
  confirm: boolean
}

export class SummarizePaymentDto {
  @IsNotEmpty()
  @IsString()
  confirmation_token_id: string
}
