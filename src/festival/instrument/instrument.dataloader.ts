import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_discipline } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class InstrumentDataLoader {
  private readonly logger = new Logger(InstrumentDataLoader.name)

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
}
