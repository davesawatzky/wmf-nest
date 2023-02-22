import { InputType } from '@nestjs/graphql'

@InputType()
export class SchoolInput {
  name?: string
  division?: string
  streetNumber?: string
  streetName?: string
  city?: string
  province?: string
  postalCode?: string
  phone?: string
}
