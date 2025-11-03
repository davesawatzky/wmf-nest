import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_reg_performer, tbl_reg_selection } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class RegisteredClassDataLoader {
  private readonly logger = new Logger(RegisteredClassDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * DataLoader for selections (one-to-many)
   * Batches queries to fetch selections for multiple registered classes
   */
  public readonly selectionsLoader = new DataLoader<number, tbl_reg_selection[]>(
    async (registeredClassIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${registeredClassIds.length} selection queries`)

      const selections = await this.prisma.tbl_reg_selection.findMany({
        where: { classpickID: { in: [...registeredClassIds] } },
      })

      // Group by registered class ID (classpickID)
      const selectionsByClass = new Map<number, tbl_reg_selection[]>()
      for (const selection of selections) {
        const existing = selectionsByClass.get(selection.classpickID) || []
        existing.push(selection)
        selectionsByClass.set(selection.classpickID, existing)
      }

      const orderedResults = registeredClassIds.map(id => selectionsByClass.get(id) ?? [])

      this.logger.log(
        `Fetched selections for ${registeredClassIds.length} registered classes in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )

  /**
   * DataLoader for performers (complex two-step query by classNumber)
   * Batches queries to fetch performers for multiple registered classes via classNumber
   * Step 1: Find all registrations that have the given classNumbers
   * Step 2: Fetch all performers for those registrations
   */
  public readonly performersLoader = new DataLoader<string, tbl_reg_performer[]>(
    async (classNumbers: readonly string[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${classNumbers.length} performer queries`)

      // Step 1: Get all registered classes with these class numbers
      const registeredClasses = await this.prisma.tbl_reg_class.findMany({
        where: { classNumber: { in: [...classNumbers] } },
        select: { regID: true, classNumber: true },
      })

      // Step 2: Get unique registration IDs
      const regIds = [...new Set(registeredClasses.map(rc => rc.regID))]

      // Step 3: Fetch all performers for those registrations
      const performers = await this.prisma.tbl_reg_performer.findMany({
        where: { regID: { in: regIds } },
      })

      // Step 4: Map performers by regID for fast lookup
      const performersByRegId = new Map<number, tbl_reg_performer[]>()
      for (const performer of performers) {
        const existing = performersByRegId.get(performer.regID) || []
        existing.push(performer)
        performersByRegId.set(performer.regID, existing)
      }

      // Step 5: Group by class number
      const performersByClassNumber = new Map<string, tbl_reg_performer[]>()
      for (const rc of registeredClasses) {
        const performersForReg = performersByRegId.get(rc.regID) || []
        const existing = performersByClassNumber.get(rc.classNumber) || []
        // Deduplicate performers (same performer may be in multiple registered classes)
        for (const performer of performersForReg) {
          if (!existing.find(p => p.id === performer.id)) {
            existing.push(performer)
          }
        }
        performersByClassNumber.set(rc.classNumber, existing)
      }

      const orderedResults = classNumbers.map(classNumber => performersByClassNumber.get(classNumber) ?? [])

      this.logger.log(
        `Fetched performers for ${classNumbers.length} class numbers in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
