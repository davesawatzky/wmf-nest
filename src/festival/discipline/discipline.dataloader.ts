import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_instrument, tbl_subdiscipline } from '@prisma/client'
import DataLoader from 'dataloader'
import { PerformerType } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class DisciplineDataLoader {
  private readonly logger = new Logger(DisciplineDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Batches subdiscipline queries by discipline ID
   * One-to-many relationship: Discipline → Subdisciplines
   */
  public readonly subdisciplinesLoader = new DataLoader<number, tbl_subdiscipline[]>(
    async (disciplineIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${disciplineIds.length} subdiscipline queries`)

      const subdisciplines = await this.prisma.tbl_subdiscipline.findMany({
        where: { disciplineID: { in: [...disciplineIds] } },
        orderBy: { name: 'asc' },
      })

      // Group subdisciplines by discipline ID
      const subdisciplinesByDiscipline = new Map<number, tbl_subdiscipline[]>()
      for (const subdiscipline of subdisciplines) {
        const existing = subdisciplinesByDiscipline.get(subdiscipline.disciplineID) || []
        existing.push(subdiscipline)
        subdisciplinesByDiscipline.set(subdiscipline.disciplineID, existing)
      }

      const orderedResults = disciplineIds.map(id => subdisciplinesByDiscipline.get(id) ?? [])

      this.logger.log(
        `Fetched subdisciplines for ${disciplineIds.length} disciplines in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )

  /**
   * Batches instrument queries by discipline ID
   * One-to-many relationship: Discipline → Instruments
   */
  public readonly instrumentsLoader = new DataLoader<number, tbl_instrument[]>(
    async (disciplineIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${disciplineIds.length} instrument queries`)

      const instruments = await this.prisma.tbl_instrument.findMany({
        where: { disciplineID: { in: [...disciplineIds] } },
        orderBy: { name: 'asc' },
      })

      // Group instruments by discipline ID
      const instrumentsByDiscipline = new Map<number, tbl_instrument[]>()
      for (const instrument of instruments) {
        const existing = instrumentsByDiscipline.get(instrument.disciplineID) || []
        existing.push(instrument)
        instrumentsByDiscipline.set(instrument.disciplineID, existing)
      }

      const orderedResults = disciplineIds.map(id => instrumentsByDiscipline.get(id) ?? [])

      this.logger.log(
        `Fetched instruments for ${disciplineIds.length} disciplines in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )

  /**
   * Batches subdiscipline queries by discipline ID with performerType filter
   * One-to-many relationship with filter: Discipline → Subdisciplines (filtered by performerType)
   * Note: Since DataLoader doesn't easily support composite keys, we'll handle this differently
   * by creating a cache key string internally
   */
  public readonly subdisciplinesByPerformerTypeLoader = new DataLoader<
    string,
    tbl_subdiscipline[]
  >(
    async (cacheKeys: readonly string[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${cacheKeys.length} filtered subdiscipline queries`)

      // Parse cache keys back to discipline IDs and performerTypes
      const parsedKeys = cacheKeys.map((key) => {
        const [disciplineId, performerType] = key.split('-')
        return { disciplineId: Number.parseInt(disciplineId), performerType: performerType as PerformerType }
      })

      // Group keys by performerType for efficient querying
      const keysByPerformerType = new Map<PerformerType, number[]>()
      for (const key of parsedKeys) {
        const existing = keysByPerformerType.get(key.performerType) || []
        existing.push(key.disciplineId)
        keysByPerformerType.set(key.performerType, existing)
      }

      // Fetch subdisciplines for each performerType group
      const allSubdisciplines: tbl_subdiscipline[] = []
      for (const [performerType, disciplineIds] of keysByPerformerType.entries()) {
        const subdisciplines = await this.prisma.tbl_subdiscipline.findMany({
          where: {
            disciplineID: { in: disciplineIds },
            tbl_classlist: {
              some: {
                performerType,
              },
            },
          },
          orderBy: { name: 'asc' },
        })
        allSubdisciplines.push(...subdisciplines)
      }

      // Group by cache key
      const subdisciplinesByKey = new Map<string, tbl_subdiscipline[]>()
      for (const subdiscipline of allSubdisciplines) {
        // For each subdiscipline, check which keys it matches
        for (const key of parsedKeys) {
          if (subdiscipline.disciplineID === key.disciplineId) {
            const cacheKey = `${key.disciplineId}-${key.performerType}`
            const existing = subdisciplinesByKey.get(cacheKey) || []
            if (!existing.find(s => s.id === subdiscipline.id)) {
              existing.push(subdiscipline)
            }
            subdisciplinesByKey.set(cacheKey, existing)
          }
        }
      }

      const orderedResults = cacheKeys.map(cacheKey => subdisciplinesByKey.get(cacheKey) ?? [])

      this.logger.log(
        `Fetched filtered subdisciplines for ${cacheKeys.length} discipline-performerType combinations in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
