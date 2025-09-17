import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '../../prisma/prisma.service'
import { FieldConfigResolver } from './field-config.resolver'
import { FieldConfigService } from './field-config.service'

describe('fieldConfigResolver', () => {
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
