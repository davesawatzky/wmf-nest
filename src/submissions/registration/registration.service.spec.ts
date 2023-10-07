import { Test, TestingModule } from '@nestjs/testing'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'
import { RegistrationService } from './registration.service'

describe('RegistrationService', () => {
  let service: RegistrationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationService],
    }).compile()

    service = module.get<RegistrationService>(RegistrationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
