import { SetMetadata } from '@nestjs/common'
import { Action, Subjects } from './ability.factory'

export interface RequiredRule {
  action: Action
  subject: Subjects
}

export const CHECK_ABILITY = 'check_ability'

export function CheckAbilities(...requirements: RequiredRule[]) {
  return SetMetadata(CHECK_ABILITY, requirements)
}
