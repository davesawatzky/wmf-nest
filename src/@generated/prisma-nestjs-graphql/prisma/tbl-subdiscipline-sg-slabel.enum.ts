import { registerEnumType } from '@nestjs/graphql'

export enum tbl_subdiscipline_SGSlabel {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(tbl_subdiscipline_SGSlabel, {
  name: 'tbl_subdiscipline_SGSlabel',
  description: undefined,
})
