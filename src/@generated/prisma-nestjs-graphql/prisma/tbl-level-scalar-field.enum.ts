import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_levelScalarFieldEnum {
  id = 'id',
  name = 'name',
  description = 'description',
  order = 'order',
}

registerEnumType(Tbl_levelScalarFieldEnum, {
  name: 'Tbl_levelScalarFieldEnum',
  description: undefined,
})
