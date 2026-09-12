import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { SelectionService } from '@/submissions/selection/selection.service.js'
import { RegisteredClassResolver } from '../registered-class.resolver.js'
import { RegisteredClassService } from '../registered-class.service.js'

describe('registeredClassResolver', () => {
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
