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
import { SchoolGroupService } from './school-group.service'

describe('SchoolGroupService', () => {
  let service: SchoolGroupService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolGroupService],
    }).compile()

    service = module.get<SchoolGroupService>(SchoolGroupService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
