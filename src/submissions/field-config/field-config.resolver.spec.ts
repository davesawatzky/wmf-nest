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
import { FieldConfigResolver } from './field-config.resolver'
import { FieldConfigService } from './field-config.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('FieldConfigResolver', () => {
  let resolver: FieldConfigResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldConfigResolver, FieldConfigService, PrismaService],
    }).compile()

    resolver = module.get<FieldConfigResolver>(FieldConfigResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
