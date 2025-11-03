import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_reg_schoolgroup, tbl_registration } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class SchoolDataLoader {
  private readonly logger = new Logger(SchoolDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * DataLoader for school groups (one-to-many)
   * Batches queries to fetch school groups for multiple schools
   */
  public readonly schoolGroupsLoader = new DataLoader<number, tbl_reg_schoolgroup[]>(
    async (schoolIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${schoolIds.length} school group queries`)

      const schoolGroups = await this.prisma.tbl_reg_schoolgroup.findMany({
        where: { schoolID: { in: [...schoolIds] } },
      })

      // Group by school ID
      const groupsBySchool = new Map<number, tbl_reg_schoolgroup[]>()
      for (const group of schoolGroups) {
        const existing = groupsBySchool.get(group.schoolID) || []
        existing.push(group)
        groupsBySchool.set(group.schoolID, existing)
      }

      const orderedResults = schoolIds.map(id => groupsBySchool.get(id) ?? [])

      this.logger.log(
        `Fetched school groups for ${schoolIds.length} schools in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )

  /**
   * DataLoader for registration (many-to-one)
   * Batches queries to fetch registrations for multiple schools
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
