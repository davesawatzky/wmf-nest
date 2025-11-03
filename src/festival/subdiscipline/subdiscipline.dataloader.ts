import { Injectable, Logger, Scope } from '@nestjs/common'
import {
  tbl_category,
  tbl_discipline,
  tbl_level,
} from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class SubdisciplineDataLoader {
  private readonly logger = new Logger(SubdisciplineDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  // Batch load disciplines by disciplineID
  readonly disciplineLoader = new DataLoader<number, tbl_discipline | null>(
    async (disciplineIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${disciplineIDs.length} discipline queries`)
      const start = Date.now()

      const disciplines = await this.prisma.tbl_discipline.findMany({
        where: { id: { in: [...disciplineIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${disciplines.length} disciplines in ${elapsed}ms`)

      const disciplineMap = new Map(disciplines.map(discipline => [discipline.id, discipline]))
      return disciplineIDs.map(id => disciplineMap.get(id) || null)
    },
  )

  // Batch load categories by subdisciplineID (many-to-many through tbl_classlist)
  readonly categoriesLoader = new DataLoader<number, tbl_category[]>(
    async (subdisciplineIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${subdisciplineIDs.length} categories queries`)
      const start = Date.now()

      // Categories are linked to subdisciplines through tbl_classlist
      // Get distinct categories for each subdiscipline via festival classes
      const festivalClasses = await this.prisma.tbl_classlist.findMany({
        where: { subdisciplineID: { in: [...subdisciplineIDs] } },
        select: {
          subdisciplineID: true,
          categoryID: true,
        },
        distinct: ['subdisciplineID', 'categoryID'],
      })

      // Get all unique category IDs
      const uniqueCategoryIDs = [...new Set(festivalClasses.map(fc => fc.categoryID))]

      // Fetch all categories
      const categories = await this.prisma.tbl_category.findMany({
        where: { id: { in: uniqueCategoryIDs } },
        orderBy: { name: 'asc' },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${categories.length} categories in ${elapsed}ms`)

      // Create a map of categoryID to category
      const categoryMap = new Map(categories.map(cat => [cat.id, cat]))

      // Group categories by subdisciplineID
      const subdisciplineCategoryMap = new Map<number, tbl_category[]>()
      festivalClasses.forEach((fc) => {
        const category = categoryMap.get(fc.categoryID)
        if (category) {
          const existing = subdisciplineCategoryMap.get(fc.subdisciplineID) || []
          // Avoid duplicates
          if (!existing.find(c => c.id === category.id)) {
            subdisciplineCategoryMap.set(fc.subdisciplineID, [...existing, category])
          }
        }
      })

      return subdisciplineIDs.map(id => subdisciplineCategoryMap.get(id) || [])
    },
  )

  // Batch load levels by subdisciplineID (many-to-many through tbl_classlist)
  readonly levelsLoader = new DataLoader<number, tbl_level[]>(
    async (subdisciplineIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${subdisciplineIDs.length} levels queries`)
      const start = Date.now()

      // Levels are linked to subdisciplines through tbl_classlist
      // Get distinct levels for each subdiscipline via festival classes
      const festivalClasses = await this.prisma.tbl_classlist.findMany({
        where: { subdisciplineID: { in: [...subdisciplineIDs] } },
        select: {
          subdisciplineID: true,
          levelID: true,
        },
        distinct: ['subdisciplineID', 'levelID'],
      })

      // Get all unique level IDs
      const uniqueLevelIDs = [...new Set(festivalClasses.map(fc => fc.levelID))]

      // Fetch all levels
      const levels = await this.prisma.tbl_level.findMany({
        where: { id: { in: uniqueLevelIDs } },
        orderBy: { sortOrder: 'asc' },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${levels.length} levels in ${elapsed}ms`)

      // Create a map of levelID to level
      const levelMap = new Map(levels.map(lvl => [lvl.id, lvl]))

      // Group levels by subdisciplineID
      const subdisciplineLevelMap = new Map<number, tbl_level[]>()
      festivalClasses.forEach((fc) => {
        const level = levelMap.get(fc.levelID)
        if (level) {
          const existing = subdisciplineLevelMap.get(fc.subdisciplineID) || []
          // Avoid duplicates
          if (!existing.find(l => l.id === level.id)) {
            subdisciplineLevelMap.set(fc.subdisciplineID, [...existing, level])
          }
        }
      })

      return subdisciplineIDs.map(id => subdisciplineLevelMap.get(id) || [])
    },
  )
}
