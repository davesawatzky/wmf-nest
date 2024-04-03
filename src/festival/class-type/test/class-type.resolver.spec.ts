import { Test, TestingModule } from '@nestjs/testing'
import { ClassTypeResolver } from '../class-type.resolver'
import { PrismaService } from '../../../prisma/prisma.service'
import { ClassTypeService } from '../class-type.service'

describe('ClassTypeResolver', () => {
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
