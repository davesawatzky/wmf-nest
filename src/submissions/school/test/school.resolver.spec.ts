import { PrismaService } from '@/prisma/prisma.service'
import { SchoolGroupService } from '@/submissions/school-group/school-group.service'
import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { SchoolResolver } from '../school.resolver'
import { SchoolService } from '../school.service'

describe('schoolResolver', () => {
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
