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
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { FestivalClassService } from '../festival-class/festival-class.service'

describe('CategoryResolver', () => {
  let resolver: CategoryResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        CategoryService,
        FestivalClassService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<CategoryResolver>(CategoryResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
