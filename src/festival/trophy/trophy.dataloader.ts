import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_classlist } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class TrophyDataLoader {
  private readonly logger = new Logger(TrophyDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * DataLoader for trophy festival classes (many-to-many via tbl_class_trophy)
   * Batches queries to fetch festival classes associated with multiple trophies
   */
  public readonly festivalClassesLoader = new DataLoader<number, tbl_classlist[]>(
    async (trophyIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${trophyIds.length} festival class queries for trophies`)

      // Step 1: Get junction table records (uses classNumber as FK, not classID)
      const junctionRecords = await this.prisma.tbl_class_trophy.findMany({
        where: { trophyID: { in: [...trophyIds] } },
        select: { trophyID: true, classNumber: true },
      })

      // Step 2: Get unique class numbers
      const classNumbers = [...new Set(junctionRecords.map(j => j.classNumber))]

      // Step 3: Fetch festival classes by classNumber
      const festivalClasses = await this.prisma.tbl_classlist.findMany({
        where: { classNumber: { in: classNumbers } },
      })

      // Step 4: Map festival classes by classNumber for fast lookup
      const classMap = new Map(festivalClasses.map(fc => [fc.classNumber, fc]))

      // Step 5: Group by trophy ID
      const classesByTrophy = new Map<number, tbl_classlist[]>()
      for (const junction of junctionRecords) {
        const festivalClass = classMap.get(junction.classNumber)
        if (festivalClass) {
          const existing = classesByTrophy.get(junction.trophyID) || []
          existing.push(festivalClass)
          classesByTrophy.set(junction.trophyID, existing)
        }
      }

      // Step 6: Return ordered results matching input trophy IDs
      const orderedResults = trophyIds.map(id => classesByTrophy.get(id) ?? [])

      this.logger.log(
        `Fetched festival classes for ${trophyIds.length} trophies in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
