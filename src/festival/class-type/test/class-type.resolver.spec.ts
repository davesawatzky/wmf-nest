import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { ClassTypeResolver } from '../class-type.resolver.js'
import { ClassTypeService } from '../class-type.service.js'

describe('classTypeResolver', () => {
  let resolver: ClassTypeResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassTypeResolver, PrismaService, ClassTypeService],
    }).compile()

    resolver = module.get<ClassTypeResolver>(ClassTypeResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
