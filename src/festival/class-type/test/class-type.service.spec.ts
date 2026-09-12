import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { ClassTypeService } from '../class-type.service.js'

describe('classTypeService', () => {
  let service: ClassTypeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassTypeService, PrismaService],
    }).compile()

    service = module.get<ClassTypeService>(ClassTypeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
