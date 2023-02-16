import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_reg_performerScalarFieldEnum {
  id = 'id',
  regID = 'regID',
  lastName = 'lastName',
  firstName = 'firstName',
  apartment = 'apartment',
  streetNumber = 'streetNumber',
  streetName = 'streetName',
  city = 'city',
  province = 'province',
  postalCode = 'postalCode',
  phone = 'phone',
  email = 'email',
  age = 'age',
  instrument = 'instrument',
  level = 'level',
  otherClasses = 'otherClasses',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(Tbl_reg_performerScalarFieldEnum, {
  name: 'Tbl_reg_performerScalarFieldEnum',
  description: undefined,
})
