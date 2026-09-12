import { CredentialsSignin } from '../dto/credentials-signin.input.js'

export function userSignin(): CredentialsSignin {
  return {
    email: 'info@davesawatzky.com',
    password: 'David123!',
  }
}
