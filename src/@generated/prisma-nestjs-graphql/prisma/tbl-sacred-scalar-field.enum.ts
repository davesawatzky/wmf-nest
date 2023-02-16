import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_sacredScalarFieldEnum {
  id = 'id',
  composer = 'composer',
  largeWork = 'largeWork',
  title = 'title',
}

registerEnumType(Tbl_sacredScalarFieldEnum, {
  name: 'Tbl_sacredScalarFieldEnum',
  description: undefined,
})
