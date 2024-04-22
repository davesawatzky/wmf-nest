import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { ClassTypeService } from '../class-type.service'
import { PrismaService } from '@/prisma/prisma.service'

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
