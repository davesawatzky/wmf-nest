import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { CategoryService } from '@/festival/category/category.service'
import { ClassTypeService } from '@/festival/class-type/class-type.service'
import { LevelService } from '@/festival/level/level.service'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service'
import { PrismaService } from '@/prisma/prisma.service'
import { FestivalClassResolver } from '../festival-class.resolver'
import { FestivalClassService } from '../festival-class.service'

describe('festivalClassResolver', () => {
  let resolver: FestivalClassResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FestivalClassResolver,
        FestivalClassService,
        SubdisciplineService,
        LevelService,
        CategoryService,
        ClassTypeService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<FestivalClassResolver>(FestivalClassResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
