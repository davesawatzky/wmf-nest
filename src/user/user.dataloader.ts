import { Injectable, Logger, Scope } from '@nestjs/common'
import { tbl_order, tbl_registration } from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class UserDataLoader {
  private readonly logger = new Logger(UserDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  /**
   * DataLoader for registrations (one-to-many)
   * Batches queries to fetch registrations for multiple users
   */
  public readonly registrationsLoader = new DataLoader<number, tbl_registration[]>(
    async (userIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${userIds.length} registration queries for users`)

      const registrations = await this.prisma.tbl_registration.findMany({
        where: { userID: { in: [...userIds] } },
      })

      // Group by user ID
      const registrationsByUser = new Map<number, tbl_registration[]>()
      for (const registration of registrations) {
        const existing = registrationsByUser.get(registration.userID) || []
        existing.push(registration)
        registrationsByUser.set(registration.userID, existing)
      }

      const orderedResults = userIds.map(id => registrationsByUser.get(id) ?? [])

      this.logger.log(
        `Fetched registrations for ${userIds.length} users in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )

  /**
   * DataLoader for orders (one-to-many)
   * Batches queries to fetch orders for multiple users
   */
  public readonly ordersLoader = new DataLoader<number, tbl_order[]>(
    async (userIds: readonly number[]) => {
      const startTime = performance.now()
      this.logger.debug(`Batching ${userIds.length} order queries for users`)

      const orders = await this.prisma.tbl_order.findMany({
        where: { userID: { in: [...userIds] } },
      })

      // Group by user ID
      const ordersByUser = new Map<number, tbl_order[]>()
      for (const order of orders) {
        const existing = ordersByUser.get(order.userID) || []
        existing.push(order)
        ordersByUser.set(order.userID, existing)
      }

      const orderedResults = userIds.map(id => ordersByUser.get(id) ?? [])

      this.logger.log(
        `Fetched orders for ${userIds.length} users in ${(performance.now() - startTime).toFixed(2)}ms`,
      )
      return orderedResults
    },
  )
}
