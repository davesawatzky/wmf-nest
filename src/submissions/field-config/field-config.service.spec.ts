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
import { FieldConfigService } from './field-config.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('FieldConfigService', () => {
  let service: FieldConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldConfigService, PrismaService],
    }).compile()

    service = module.get<FieldConfigService>(FieldConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
