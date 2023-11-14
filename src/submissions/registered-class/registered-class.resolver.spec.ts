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
import { RegisteredClassResolver } from './registered-class.resolver'
import { RegisteredClassService } from './registered-class.service'
import { SelectionService } from '../selection/selection.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('RegisteredClassResolver', () => {
  let resolver: RegisteredClassResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisteredClassResolver,
        RegisteredClassService,
        SelectionService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<RegisteredClassResolver>(RegisteredClassResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
