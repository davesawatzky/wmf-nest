import { describe, expect, it } from 'vitest'
import { AbilityFactory } from './ability.factory'

describe('abilityFactory', () => {
  it('should be defined', () => {
    expect(new AbilityFactory()).toBeDefined()
  })
})
