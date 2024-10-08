import { CredentialsSignup } from 'src/auth/dto/credentials-signup.input'

export function TestAdmin(): CredentialsSignup {
  return {
    email: 'test_e2e_admin@test.com',
    firstName: 'Test',
    lastName: 'Admin',
    password: 'David123!',
    privateTeacher: false,
    schoolTeacher: false,
    instrument: 'piano',
  }
}

export function TestUser(): CredentialsSignup {
  return {
    email: 'test_e2e_user@test.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'David123!',
    privateTeacher: false,
    schoolTeacher: false,
    instrument: 'piano',
  }
}
