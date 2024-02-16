import { CredentialsSignup } from '../dto/credentials-signup.input'

export const userSignup = (): CredentialsSignup[] => {
  return [
    {
      email: 'info@davesawatzky.com',
      firstName: 'David',
      lastName: 'Sawatzky',
      password: 'David123!',
      privateTeacher: false,
      schoolTeacher: false,
      instrument: 'clarinet',
    },
    {
      email: 'info@davesawatzky.com',
      firstName: 'David',
      lastName: 'Sawatzky',
      password: 'David123!',
      privateTeacher: false,
      schoolTeacher: false,
      instrument: null,
    },
    {
      email: 'info@davesawatzky.com',
      firstName: 'Private',
      lastName: 'Teacher',
      password: 'David123!',
      privateTeacher: true,
      schoolTeacher: false,
      instrument: null,
    },
    {
      email: 'info@davesawatzky.com',
      firstName: 'School',
      lastName: 'Teacher',
      password: 'David123!',
      privateTeacher: false,
      schoolTeacher: true,
      instrument: null,
    },
  ]
}
