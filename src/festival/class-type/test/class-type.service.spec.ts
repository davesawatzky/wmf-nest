import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@/prisma/prisma.service'
import { ClassTypeService } from '../class-type.service'

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
