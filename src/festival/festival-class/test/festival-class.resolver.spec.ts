import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { CategoryService } from '@/festival/category/category.service.js'
import { ClassTypeService } from '@/festival/class-type/class-type.service.js'
import { LevelService } from '@/festival/level/level.service.js'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service.js'
import { PrismaService } from '@/prisma/prisma.service.js'
import { FestivalClassResolver } from '../festival-class.resolver.js'
import { FestivalClassService } from '../festival-class.service.js'

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
