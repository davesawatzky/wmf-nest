import { InputType } from '@nestjs/graphql'

@InputType()
export class CredentialsSignin {
  email: string
  password: string
}
