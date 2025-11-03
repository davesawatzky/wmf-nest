import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_registration } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class PerformerDataLoader {
  private readonly logger = new Logger(PerformerDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Batches registration queries by registration ID
   * Many-to-one relationship: Performer → Registration
   */
  public readonly registrationLoader = new DataLoader<number, tbl_registration | null>(
    async (regIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${regIds.length} registration queries`)

      const registrations = await this.prisma.tbl_registration.findMany({
        where: { id: { in: [...regIds] } },
      })

      // Map-based ordering: CRITICAL for correct result alignment
      const registrationMap = new Map(registrations.map(reg => [reg.id, reg]))
      const orderedResults = regIds.map(id => registrationMap.get(id) ?? null)

      this.logger.log(
        `Fetched ${orderedResults.length} registrations in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
