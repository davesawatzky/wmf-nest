import { CredentialsSignin } from '../dto/credentials-signin.input'

export const userSignin = (): CredentialsSignin => {
  return {
    email: 'info@davesawatzky.com',
    password: 'David123!',
  }
}
