import { InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {
  staff?: boolean
  admin?: boolean
  firstName?: string
  lastName?: string
  apartment?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
}
