import { ObjectType, registerEnumType } from '@nestjs/graphql'

/**
 * Solo Group School label
 *
 * (enum) SOLO, GROUP, SCHOOL, COMMUNITY
 */
export enum PerformerType {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(PerformerType, { name: 'PerformerType' })

@ObjectType()
export class UserError {
  message: string
  field: string[]
}
