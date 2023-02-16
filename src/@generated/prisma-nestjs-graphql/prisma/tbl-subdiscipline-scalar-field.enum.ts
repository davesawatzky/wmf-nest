import { registerEnumType } from '@nestjs/graphql'

export enum Tbl_subdisciplineScalarFieldEnum {
  id = 'id',
  disciplineID = 'disciplineID',
  name = 'name',
  description = 'description',
  maxPerformers = 'maxPerformers',
  minPerformers = 'minPerformers',
  SGSlabel = 'SGSlabel',
  price = 'price',
}

registerEnumType(Tbl_subdisciplineScalarFieldEnum, {
  name: 'Tbl_subdisciplineScalarFieldEnum',
  description: undefined,
})
