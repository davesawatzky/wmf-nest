import { ObjectType, registerEnumType } from '@nestjs/graphql'

/**
 * Solo Group School label
 *
 * (enum) SOLO, GROUP, SCHOOL, COMMUNITY
 */
export enum SGSLabel {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(SGSLabel, { name: 'SGSLabel' })

@ObjectType()
export class UserError {
  message: string
  field: string[]
}
