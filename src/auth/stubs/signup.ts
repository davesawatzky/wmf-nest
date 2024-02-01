import { CredentialsSignup } from '../dto/credentials-signup.input'

export const userSignup = (): CredentialsSignup => {
  return {
    email: 'testuser@test.com',
    firstName: 'John',
    lastName: 'Henry',
    password: 'Dt159753',
    privateTeacher: false,
    schoolTeacher: false,
    instrument: null,
  }
}
export const privateTeacherSignup = (): CredentialsSignup => {
  return {
    email: 'testuser@test.com',
    firstName: 'John',
    lastName: 'Henry',
    password: 'Dt159753',
    privateTeacher: true,
    schoolTeacher: false,
    instrument: null,
  }
}
export const schoolTeacherSignup = (): CredentialsSignup => {
  return {
    email: 'testuser@test.com',
    firstName: 'John',
    lastName: 'Henry',
    password: 'Dt159753',
    privateTeacher: false,
    schoolTeacher: true,
    instrument: null,
  }
}
