import { CredentialsSignup } from '../../../auth/dto/credentials-signup.input'
import { User } from '../../entities/user.entity'

export const userStub: User & CredentialsSignup = {
  id: 1,
  firstName: 'David',
  lastName: 'Sawatzky',
  email: 'info@davesawatzky.com',
  password: 'David123!',
  admin: false,
  staff: false,
  privateTeacher: false,
  schoolTeacher: false,
  apartment: '23B',
  streetName: 'Waterford Bay',
  streetNumber: '37',
  city: 'Winnipeg',
  province: 'MB',
  postalCode: 'R3T 1H6',
  phone: '(204) 599-3521',
  emailConfirmed: false,
  registrations: null,
}

export const testUser: CredentialsSignup = {
  firstName: 'David',
  lastName: 'Sawatzky',
  email: 'david@diatonic.io',
  password: 'David123!',
  privateTeacher: false,
  schoolTeacher: false,
}
