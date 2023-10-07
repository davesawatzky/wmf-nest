import { EmailConfirmationGuard } from './email-confirmation.guard'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'

describe('EmailConfirmationGuard', () => {
  it('should be defined', () => {
    expect(new EmailConfirmationGuard()).toBeDefined()
  })
})
