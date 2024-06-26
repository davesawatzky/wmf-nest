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
import { SchoolGroupResolver } from './school-group.resolver'
import { SchoolGroupService } from './school-group.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('SchoolGroupResolver', () => {
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
