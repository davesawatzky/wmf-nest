import type { tbl_category, tbl_class_type, tbl_level, tbl_subdiscipline, tbl_trophy } from '@prisma/client'
import { Injectable, Scope } from '@nestjs/common'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST }) // Request-scoped for per-request batching
export class FestivalClassDataLoader {
  constructor(private prisma: PrismaService) {}

  // Batch load trophies for multiple festival classes
  readonly trophiesLoader = new DataLoader<string, tbl_trophy[] | null>(
    async (classNumbers: readonly string[]) => {
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
      const levels = await this.prisma.tbl_level.findMany({
        where: { id: { in: [...levelIDs] } },
      })

      const levelMap = new Map(levels.map(level => [level.id, level]))
      return levelIDs.map(id => levelMap.get(id) || null)
    },
  )

  // Batch load subdisciplines
  readonly subdisciplineLoader = new DataLoader<number, tbl_subdiscipline | null>(
    async (subdisciplineIDs: readonly number[]) => {
      const subdisciplines = await this.prisma.tbl_subdiscipline.findMany({
        where: { id: { in: [...subdisciplineIDs] } },
      })

      const subdisciplineMap = new Map(
        subdisciplines.map(subdiscipline => [subdiscipline.id, subdiscipline]),
      )
      return subdisciplineIDs.map(id => subdisciplineMap.get(id) || null)
    },
  )

  // Batch load categories
  readonly categoryLoader = new DataLoader<number, tbl_category | null>(
    async (categoryIDs: readonly number[]) => {
      const categories = await this.prisma.tbl_category.findMany({
        where: { id: { in: [...categoryIDs] } },
      })

      const categoryMap = new Map(categories.map(category => [category.id, category]))
      return categoryIDs.map(id => categoryMap.get(id) || null)
    },
  )

  // Batch load class types
  readonly classTypeLoader = new DataLoader<number, tbl_class_type | null>(
    async (classTypeIDs: readonly number[]) => {
      const classTypes = await this.prisma.tbl_class_type.findMany({
        where: { id: { in: [...classTypeIDs] } },
      })

      const classTypeMap = new Map(classTypes.map(classType => [classType.id, classType]))
      return classTypeIDs.map(id => classTypeMap.get(id) || null)
    },
  )
}
