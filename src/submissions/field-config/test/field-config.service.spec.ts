import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '../../prisma/prisma.service'
import { FieldConfigService } from './field-config.service'

describe('fieldConfigService', () => {
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
