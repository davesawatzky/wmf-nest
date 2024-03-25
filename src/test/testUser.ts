import {CredentialsSignup} from 'src/auth/dto/credentials-signup.input'

export const TestUser = (): CredentialsSignup => {
  return {
    email: 'test_e2e_user@test.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'David123!',
    privateTeacher: false,
    schoolTeacher: false,
    instrument: 'piano'
  }
}