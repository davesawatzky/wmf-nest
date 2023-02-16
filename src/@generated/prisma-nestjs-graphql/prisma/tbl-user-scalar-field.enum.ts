import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_userScalarFieldEnum {
  id = 'id',
  email = 'email',
  password = 'password',
  staff = 'staff',
  admin = 'admin',
  firstName = 'firstName',
  lastName = 'lastName',
  apartment = 'apartment',
  streetNumber = 'streetNumber',
  streetName = 'streetName',
  city = 'city',
  province = 'province',
  postalCode = 'postalCode',
  phone = 'phone',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

registerEnumType(Tbl_userScalarFieldEnum, {
  name: 'Tbl_userScalarFieldEnum',
  description: undefined,
})
