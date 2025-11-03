import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_reg_communitygroup, tbl_registration } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class CommunityDataLoader {
  private readonly logger = new Logger(CommunityDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * DataLoader for community groups (one-to-many)
   * Batches queries to fetch community groups for multiple communities
   */
  public readonly communityGroupsLoader = new DataLoader<number, tbl_reg_communitygroup[]>(
    async (communityIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${communityIds.length} community group queries`)

      const communityGroups = await this.prisma.tbl_reg_communitygroup.findMany({
        where: { communityID: { in: [...communityIds] } },
      })

      // Group by community ID
      const groupsByCommunity = new Map<number, tbl_reg_communitygroup[]>()
      for (const group of communityGroups) {
        const existing = groupsByCommunity.get(group.communityID) || []
        existing.push(group)
        groupsByCommunity.set(group.communityID, existing)
      }

      const orderedResults = communityIds.map(id => groupsByCommunity.get(id) ?? [])

      this.logger.log(
        `Fetched community groups for ${communityIds.length} communities in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )

  /**
   * DataLoader for registration (many-to-one)
   * Batches queries to fetch registrations for multiple communities
   */
  public readonly registrationLoader = new DataLoader<number, tbl_registration | null>(
    async (regIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${regIds.length} registration queries`)

      const registrations = await this.prisma.tbl_registration.findMany({
        where: { id: { in: [...regIds] } },
      })

      // Map by registration ID
      const registrationMap = new Map(registrations.map(reg => [reg.id, reg]))
      const orderedResults = regIds.map(id => registrationMap.get(id) ?? null)

      this.logger.log(
        `Fetched ${orderedResults.length} registrations in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
