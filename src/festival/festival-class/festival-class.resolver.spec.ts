import { Test, TestingModule } from '@nestjs/testing'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'
import { FestivalClassResolver } from './festival-class.resolver'
import { FestivalClassService } from './festival-class.service'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { LevelService } from '../level/level.service'
import { CategoryService } from '../category/category.service'
import { ClassTypeService } from '../class-type/class-type.service'
import { PrismaService } from 'src/prisma/prisma.service'

describe('FestivalClassResolver', () => {
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
