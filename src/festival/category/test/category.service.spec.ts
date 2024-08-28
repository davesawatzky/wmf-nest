import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { CategoryService } from '../category.service'
import { PrismaService } from '../../../prisma/prisma.service'
import { CategoryInput } from '../dto/category.input'

describe('categoryService', () => {
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
    it('returns a list of categories', async () => {

    })
  })

  describe('findOne', () => {
    it('returns one category', async () => {

    })
  })

  describe('create', () => {
    it('creates a category', async () => {
      const categoryInput: CategoryInput = {
        name: 'Baroque',
        description: '1600-1750',
        requiredComposer: 'J.S. Bach',
      }
    })
  })
})
