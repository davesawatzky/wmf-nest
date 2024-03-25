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
import { CategoryService } from '../category.service'
import { PrismaService } from '../../../prisma/prisma.service'
import {Prisma} from '@prisma/client'
import {CategoryInput} from '../dto/category.input'
import {categoryStub} from './category.stub'

describe('CategoryService', () => {
  let categoryService: CategoryService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile()

    categoryService = module.get<CategoryService>(CategoryService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(categoryService).toBeDefined()
  })

  describe('findAll', () => {
    it('Returns a list of categories', async () => {

    })
  })

  describe('findOne', () => {
    it('Returns one category', async () => {

    })
  })

  describe('create', () => {
    it('Creates a category', async () => {
      const categoryInput:CategoryInput = {
        name: 'Baroque',
        description: '1600-1750',
        requiredComposer: 'J.S. Bach'
      }

    })
  })

})
