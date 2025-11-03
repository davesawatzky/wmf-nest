import type { tbl_category, tbl_class_type, tbl_level, tbl_subdiscipline, tbl_trophy } from '@prisma/client'
import { Injectable, Logger, Scope } from '@nestjs/common'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST }) // Request-scoped for per-request batching
export class FestivalClassDataLoader {
  private readonly logger = new Logger(FestivalClassDataLoader.name)

  constructor(private prisma: PrismaService) {}

  // Batch load trophies for multiple festival classes
  readonly trophiesLoader = new DataLoader<string, tbl_trophy[] | null>(
    async (classNumbers: readonly string[]) => {
      this.logger.log(`[DataLoader] Batching ${classNumbers.length} trophy queries`)
      const start = Date.now()

      // Fetch all trophies for all class numbers in one query
      const trophies = await this.prisma.tbl_trophy.findMany({
        where: {
          tbl_class_trophy: {
            some: {
              classNumber: { in: [...classNumbers] },
            },
          },
        },
        include: {
          tbl_class_trophy: {
            where: {
              classNumber: { in: [...classNumbers] },
            },
          },
        },
      })

      // Map trophies back to their class numbers
      const trophyMap = new Map<string, tbl_trophy[]>()

      // Initialize empty arrays for all class numbers
      classNumbers.forEach(classNumber => trophyMap.set(classNumber, []))

      // Populate with actual trophies
      trophies.forEach((trophy) => {
        trophy.tbl_class_trophy.forEach((junction) => {
          if (trophyMap.has(junction.classNumber)) {
            // Extract trophy data without the junction table
            const { tbl_class_trophy, ...trophyData } = trophy
            trophyMap.get(junction.classNumber)!.push(trophyData)
          }
        })
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${trophies.length} trophies in ${elapsed}ms`)

      // Return in same order as input, null if no trophies found
      return classNumbers.map((classNumber) => {
        const trophiesForClass = trophyMap.get(classNumber) || []
        return trophiesForClass.length > 0 ? trophiesForClass : null
      })
    },
  )

  // Batch load levels
  readonly levelLoader = new DataLoader<number, tbl_level | null>(
    async (levelIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${levelIDs.length} level queries`)
      const start = Date.now()

      const levels = await this.prisma.tbl_level.findMany({
        where: { id: { in: [...levelIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${levels.length} levels in ${elapsed}ms`)

      const levelMap = new Map(levels.map(level => [level.id, level]))
      return levelIDs.map(id => levelMap.get(id) || null)
    },
  )

  // Batch load subdisciplines
  readonly subdisciplineLoader = new DataLoader<number, tbl_subdiscipline | null>(
    async (subdisciplineIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${subdisciplineIDs.length} subdiscipline queries`)
      const start = Date.now()

      const subdisciplines = await this.prisma.tbl_subdiscipline.findMany({
        where: { id: { in: [...subdisciplineIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${subdisciplines.length} subdisciplines in ${elapsed}ms`)

      const subdisciplineMap = new Map(
        subdisciplines.map(subdiscipline => [subdiscipline.id, subdiscipline]),
      )
      return subdisciplineIDs.map(id => subdisciplineMap.get(id) || null)
    },
  )

  // Batch load categories
  readonly categoryLoader = new DataLoader<number, tbl_category | null>(
    async (categoryIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${categoryIDs.length} category queries`)
      const start = Date.now()

      const categories = await this.prisma.tbl_category.findMany({
        where: { id: { in: [...categoryIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${categories.length} categories in ${elapsed}ms`)

      const categoryMap = new Map(categories.map(category => [category.id, category]))
      return categoryIDs.map(id => categoryMap.get(id) || null)
    },
  )

  // Batch load class types
  readonly classTypeLoader = new DataLoader<number, tbl_class_type | null>(
    async (classTypeIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${classTypeIDs.length} class type queries`)
      const start = Date.now()

      const classTypes = await this.prisma.tbl_class_type.findMany({
        where: { id: { in: [...classTypeIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${classTypes.length} class types in ${elapsed}ms`)

      const classTypeMap = new Map(classTypes.map(classType => [classType.id, classType]))
      return classTypeIDs.map(id => classTypeMap.get(id) || null)
    },
  )
}
