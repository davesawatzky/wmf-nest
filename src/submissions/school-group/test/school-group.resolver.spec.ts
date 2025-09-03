import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { SchoolGroupResolver } from '@/submissions/school-group/school-group.resolver'
import { SchoolGroupService } from '@/submissions/school-group/school-group.service'

describe('schoolGroupResolver', () => {
  let resolver: SchoolGroupResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolGroupResolver, SchoolGroupService, PrismaService],
    }).compile()

    resolver = module.get<SchoolGroupResolver>(SchoolGroupResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
