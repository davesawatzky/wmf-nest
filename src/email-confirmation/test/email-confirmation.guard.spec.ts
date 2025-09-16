import {
  describe,
  expect,
  it,
} from 'vitest'
import { EmailConfirmationGuard } from '../email-confirmation.guard'

describe('emailConfirmationGuard', () => {
  it('should be defined', () => {
    expect(new EmailConfirmationGuard()).toBeDefined()
  })
})
