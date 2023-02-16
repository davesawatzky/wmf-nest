import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_reg_classesScalarFieldEnum {
  id = 'id',
  regID = 'regID',
  classNumber = 'classNumber',
  discipline = 'discipline',
  subdiscipline = 'subdiscipline',
  level = 'level',
  category = 'category',
  numberOfSelections = 'numberOfSelections',
  schoolCommunityId = 'schoolCommunityId',
  price = 'price',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(Tbl_reg_classesScalarFieldEnum, {
  name: 'Tbl_reg_classesScalarFieldEnum',
  description: undefined,
})
