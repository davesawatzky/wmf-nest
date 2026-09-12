import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { SchoolGroupService } from '@/submissions/school-group/school-group.service.js'
import { SchoolResolver } from '../school.resolver.js'
import { SchoolService } from '../school.service.js'

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
