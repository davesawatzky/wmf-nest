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
import { SchoolResolver } from './school.resolver'
import { SchoolService } from './school.service'
import { SchoolGroupService } from '../school-group/school-group.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('SchoolResolver', () => {
  let resolver: SchoolResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolResolver,
        SchoolService,
        SchoolGroupService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<SchoolResolver>(SchoolResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
