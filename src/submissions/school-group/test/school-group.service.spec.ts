import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { SchoolGroupService } from '@/submissions/school-group/school-group.service.js'

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
