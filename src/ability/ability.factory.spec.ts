import { AbilityFactory } from './ability.factory'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'

describe('AbilityFactory', () => {
  it('should be defined', () => {
    expect(new AbilityFactory()).toBeDefined()
  })
})
