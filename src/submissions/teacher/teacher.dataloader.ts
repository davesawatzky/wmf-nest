import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_registration } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class TeacherDataLoader {
  private readonly logger = new Logger(TeacherDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * DataLoader for registrations (one-to-many)
   * Batches queries to fetch registrations for multiple teachers
   */
  public readonly registrationsLoader = new DataLoader<number, tbl_registration[]>(
    async (teacherIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${teacherIds.length} registration queries for teachers`)

      const registrations = await this.prisma.tbl_registration.findMany({
        where: { teacherID: { in: [...teacherIds] } },
      })

      // Group by teacher ID
      const registrationsByTeacher = new Map<number, tbl_registration[]>()
      for (const registration of registrations) {
        const existing = registrationsByTeacher.get(registration.teacherID) || []
        existing.push(registration)
        registrationsByTeacher.set(registration.teacherID, existing)
      }

      const orderedResults = teacherIds.map(id => registrationsByTeacher.get(id) ?? [])

      this.logger.log(
        `Fetched registrations for ${teacherIds.length} teachers in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
