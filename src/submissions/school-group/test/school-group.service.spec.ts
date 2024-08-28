import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { SchoolGroupService } from '@/submissions/school-group/school-group.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('schoolGroupService', () => {
  let service: SchoolGroupService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolGroupService, PrismaService],
    }).compile()

    service = module.get<SchoolGroupService>(SchoolGroupService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
