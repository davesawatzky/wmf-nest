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
import { SchoolService } from './school.service'

describe('SchoolService', () => {
  let service: SchoolService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolService],
    }).compile()

    service = module.get<SchoolService>(SchoolService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
