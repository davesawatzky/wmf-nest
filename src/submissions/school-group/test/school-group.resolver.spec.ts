import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { SchoolGroupResolver } from '../school-group.resolver'
import { SchoolGroupService } from '../school-group.service'
import { PrismaService } from '@/prisma/prisma.service'

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
