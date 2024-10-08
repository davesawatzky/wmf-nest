import { CredentialsSignup } from '../../../auth/dto/credentials-signup.input'
import { User } from '../../entities/user.entity'

export function userStub(): User & CredentialsSignup {
  return {
    id: 5,
    firstName: 'David',
    lastName: 'Sawatzky',
    email: 'info@davesawatzky.com',
    password: 'David123!',
    admin: false,
    staff: false,
    privateTeacher: false,
    schoolTeacher: false,
    instrument: null,
    address: '23B - 37 Waterford Bay',
    city: 'Winnipeg',
    province: 'MB',
    postalCode: 'R3T 1H6',
    phone: '(204) 599-3521',
    emailConfirmed: false,
    registrations: null,
  }
}
