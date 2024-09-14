import { CredentialsSignin } from '../dto/credentials-signin.input'

export function userSignin(): CredentialsSignin {
  return {
    email: 'info@davesawatzky.com',
    password: 'David123!',
  }
}
