import { CredentialsSignin } from '../dto/credentials-signin.input'

export const userSignin = (): CredentialsSignin => {
  return {
    email: 'testuser@test.com',
    password: 'Dt159753',
  }
}
