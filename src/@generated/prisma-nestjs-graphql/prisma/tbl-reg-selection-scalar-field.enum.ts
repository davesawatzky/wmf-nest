import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_reg_selectionScalarFieldEnum {
  id = 'id',
  classpickID = 'classpickID',
  title = 'title',
  largerWork = 'largerWork',
  movement = 'movement',
  composer = 'composer',
  duration = 'duration',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(Tbl_reg_selectionScalarFieldEnum, {
  name: 'Tbl_reg_selectionScalarFieldEnum',
  description: undefined,
})
