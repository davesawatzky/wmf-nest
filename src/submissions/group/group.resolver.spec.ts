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
import { GroupResolver } from './group.resolver'
import { GroupService } from './group.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('GroupResolver', () => {
  let resolver: GroupResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupResolver, GroupService, PrismaService],
    }).compile()

    resolver = module.get<GroupResolver>(GroupResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
