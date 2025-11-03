import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_classlist } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class ClassTypeDataLoader {
  private readonly logger = new Logger(ClassTypeDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Batches festival class queries by class type ID
   * One-to-many relationship: ClassType → FestivalClasses
   */
  public readonly festivalClassesLoader = new DataLoader<number, tbl_classlist[]>(
    async (classTypeIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${classTypeIds.length} festival class queries`)

      const festivalClasses = await this.prisma.tbl_classlist.findMany({
        where: { classTypeID: { in: [...classTypeIds] } },
      })

      // Group festival classes by class type ID
      const classesByType = new Map<number, tbl_classlist[]>()
      for (const festivalClass of festivalClasses) {
        const existing = classesByType.get(festivalClass.classTypeID) || []
        existing.push(festivalClass)
        classesByType.set(festivalClass.classTypeID, existing)
      }

      const orderedResults = classTypeIds.map(id => classesByType.get(id) ?? [])

      this.logger.log(
        `Fetched festival classes for ${classTypeIds.length} class types in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
