import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_class_trophyScalarFieldEnum {
  classID = 'classID',
  trophyID = 'trophyID',
}

registerEnumType(Tbl_class_trophyScalarFieldEnum, {
  name: 'Tbl_class_trophyScalarFieldEnum',
  description: undefined,
})
