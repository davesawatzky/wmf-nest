import { CredentialsSignup } from '../dto/credentials-signup.input'

export const userSignup = (): CredentialsSignup[] => {
  return [
    {
      email: 'test_user.instrument@test.com',
      firstName: 'David',
      lastName: 'Sawatzky',
      password: 'David123!',
      privateTeacher: false,
      schoolTeacher: false,
      instrument: 'clarinet',
    },
    {
      email: 'test_user@test.com',
      firstName: 'David',
      lastName: 'Sawatzky',
      password: 'David123!',
      privateTeacher: false,
      schoolTeacher: false,
      instrument: null,
    },
    {
      email: 'test_private.teacher_inst@test.com',
      firstName: 'Private',
      lastName: 'Teacher',
      password: 'David123!',
      privateTeacher: true,
      schoolTeacher: false,
      instrument: 'piano',
    },
    {
      email: 'test_school.teacher@test.com',
      firstName: 'School',
      lastName: 'Teacher',
      password: 'David123!',
      privateTeacher: false,
      schoolTeacher: true,
      instrument: null,
    },
    {
      email: 'test_school.private@test.com',
      firstName: 'SchoolAndPrivate',
      lastName: 'Teacher',
      password: 'David123!',
      privateTeacher: true,
      schoolTeacher: true,
      instrument: null,
    },
  ]
}
