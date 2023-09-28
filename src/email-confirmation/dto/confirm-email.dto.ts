import { IsString, IsNotEmpty, IsJWT } from 'class-validator'

export class ConfirmationEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string
}

export default ConfirmationEmailDto
