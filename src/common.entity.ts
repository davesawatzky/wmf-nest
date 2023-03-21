import { ObjectType, registerEnumType } from '@nestjs/graphql'

/**
 * Solo Group School label
 *
 * (enum) SOLO, GROUP, SCHOOL, COMMUNITY
 */
export enum SGS_label {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(SGS_label, { name: 'SGS_label' })

@ObjectType()
export class UserError {
  message: string
  field: string[]
}
