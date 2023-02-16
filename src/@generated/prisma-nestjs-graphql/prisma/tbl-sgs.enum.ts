import { registerEnumType } from '@nestjs/graphql'

export enum tbl_SGS {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(tbl_SGS, { name: 'tbl_SGS', description: undefined })
