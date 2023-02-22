import { InputType } from '@nestjs/graphql'

@InputType()
export class CredentialsSignup {
  firstName: string
  lastName: string
  email: string
  password: string
}
