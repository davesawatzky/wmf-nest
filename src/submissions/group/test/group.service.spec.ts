import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { GroupService } from '../group.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('groupService', () => {
  let service: GroupService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupService, PrismaService],
    }).compile()

    service = module.get<GroupService>(GroupService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
