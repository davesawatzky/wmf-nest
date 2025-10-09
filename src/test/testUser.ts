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
    roles: ['admin'],
    isActive: false,
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
    roles: ['user'],
    isActive: false,
  }
}

export function TestPrivateTeacher(): CredentialsSignup {
  return {
    email: 'test_e2e_teacher@test.com',
    firstName: 'Test',
    lastName: 'Teacher',
    password: 'David123!',
    instrument: 'Guitar',
    privateTeacher: true,
    schoolTeacher: null,
    roles: ['user'],
    isActive: false,
  }
}

export function TestSchoolTeacher(): CredentialsSignup {
  return {
    email: 'test_e2e_teacher@test.com',
    firstName: 'Test',
    lastName: 'Teacher',
    password: 'David123!',
    privateTeacher: false,
    schoolTeacher: true,
    roles: ['user'],
    isActive: false,
  }
}

export type TestUserType = 'admin' | 'user' | 'privateTeacher' | 'schoolTeacher'

export function getTestUser(type: TestUserType): CredentialsSignup {
  switch (type) {
    case 'admin': return TestAdmin()
    case 'user': return TestUser()
    case 'privateTeacher': return TestPrivateTeacher()
    case 'schoolTeacher': return TestSchoolTeacher()
    default: throw new Error(`Unknown test user type: ${type}`)
  }
}
