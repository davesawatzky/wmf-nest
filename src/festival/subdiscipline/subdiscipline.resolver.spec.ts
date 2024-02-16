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
import { SubdisciplineResolver } from './subdiscipline.resolver'
import { SubdisciplineService } from './subdiscipline.service'
import { PrismaService } from '../../prisma/prisma.service'
import { FestivalClassService } from '../festival-class/festival-class.service'

describe('SubdisciplineResolver', () => {
  let resolver: SubdisciplineResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubdisciplineResolver,
        SubdisciplineService,
        PrismaService,
        FestivalClassService,
      ],
    }).compile()

    resolver = module.get<SubdisciplineResolver>(SubdisciplineResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
