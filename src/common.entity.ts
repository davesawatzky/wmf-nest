import { ObjectType, registerEnumType } from '@nestjs/graphql'

/**
 * Solo Group School label
 *
 * (enum) SOLO, GROUP, SCHOOL, COMMUNITY
 */
export enum SGSlabel {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(SGSlabel, { name: 'SGSlabel' })

@ObjectType()
export class UserError {
  message: string
  field: string[]
}
