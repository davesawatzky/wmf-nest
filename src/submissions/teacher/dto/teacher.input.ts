import { InputType } from '@nestjs/graphql'

@InputType()
export class TeacherInput {
  prefix?: string
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city: string
  province: string
  postalCode?: string
  phone?: string
  email?: string
}
