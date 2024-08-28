import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { FestivalClassService } from 'src/festival/festival-class/festival-class.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryResolver } from '../category.resolver'
import { CategoryService } from '../category.service'
import { Category, CategoryPayload } from '../entities/category.entity'
import { CategoryInput } from '../dto/category.input'
import { categoryStub, newCategory } from './category.stub'

vi.mock('../category.service.ts')

describe('categoryResolver', () => {
  let resolver: CategoryResolver
  let service: CategoryService
  let festivalClassService: FestivalClassService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        CategoryService,
        {
          provide: FestivalClassService,
          useValue: festivalClassService,
        },
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile()

    resolver = module.get<CategoryResolver>(CategoryResolver)
    service = module.get<CategoryService>(CategoryService)
    festivalClassService = module.get<FestivalClassService>(FestivalClassService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('categories', () => {
    it('returns all categories in the same level or discipline', async () => {
      const levelID = 10
      const subdisciplineID = 10
      const result: Category[] = await resolver.categories(levelID, subdisciplineID)
      expect(result).toEqual(categoryStub())
      expect(service.findAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('category', () => {
    it('returns a single category with the proper id', async () => {
      const id = 2
      const result: Category = await resolver.category(id)
      expect(result).toEqual(categoryStub()[1])
      expect(service.findOne).toHaveBeenCalledTimes(1)
    })
  })

  describe('categoryCreate', () => {
    it('creates a new category and returns the result', async () => {
      const categoryInput: CategoryInput = newCategory
      const result: CategoryPayload = await resolver.categoryCreate(categoryInput)
      expect(result.category.name).toBe('Blues')
      expect(service.create).toHaveBeenCalledTimes(1)
    })
  })

  describe('categoryUpdate', () => {
    it('updates an existing category', async () => {
      const categoryID = 2
      const categoryInput: CategoryInput = newCategory
      const result: CategoryPayload = await resolver.categoryUpdate(categoryID, categoryInput)
      expect(result.category.requiredComposer).toBe('Eric Clapton')
      expect(service.update).toHaveBeenCalledTimes(1)
    })
  })

  describe('categoryDelete', () => {
    it('removes an existing category', async () => {
      const id = 2
      const result: CategoryPayload = await resolver.categoryDelete(id)
      expect(result.category.requiredComposer).toBe('Eric Clapton')
      expect(service.remove).toHaveBeenCalledTimes(1)
    })
  })

  describe('festivalClasses', () => {
    it('returns all festival classes from the given category', async () => {

    })
  })
})
