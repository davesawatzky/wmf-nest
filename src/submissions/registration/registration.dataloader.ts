import { Injectable, Logger, Scope } from '@nestjs/common'
import {
  tbl_reg_class,
  tbl_reg_community,
  tbl_reg_group,
  tbl_reg_performer,
  tbl_reg_school,
  tbl_user,
} from '@prisma/client'
import DataLoader from 'dataloader'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable({ scope: Scope.REQUEST })
export class RegistrationDataLoader {
  private readonly logger = new Logger(RegistrationDataLoader.name)

  constructor(private readonly prisma: PrismaService) {}

  // Batch load users by userID
  readonly userLoader = new DataLoader<number, tbl_user | null>(
    async (userIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${userIDs.length} user queries`)
      const start = Date.now()

      const users = await this.prisma.tbl_user.findMany({
        where: { id: { in: [...userIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${users.length} users in ${elapsed}ms`)

      const userMap = new Map(users.map(user => [user.id, user]))
      return userIDs.map(id => userMap.get(id) || null)
    },
  )

  // Batch load performers by registrationID (regID in database)
  readonly performersLoader = new DataLoader<number, tbl_reg_performer[]>(
    async (registrationIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${registrationIDs.length} performers queries`)
      const start = Date.now()

      const performers = await this.prisma.tbl_reg_performer.findMany({
        where: { regID: { in: [...registrationIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${performers.length} performers in ${elapsed}ms`)

      // Group performers by regID
      const performerMap = new Map<number, tbl_reg_performer[]>()
      performers.forEach((performer) => {
        const existing = performerMap.get(performer.regID) || []
        performerMap.set(performer.regID, [...existing, performer])
      })

      return registrationIDs.map(id => performerMap.get(id) || [])
    },
  )

  // Batch load registered classes by registrationID (regID in database)
  readonly registeredClassesLoader = new DataLoader<number, tbl_reg_class[]>(
    async (registrationIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${registrationIDs.length} registered classes queries`)
      const start = Date.now()

      const registeredClasses = await this.prisma.tbl_reg_class.findMany({
        where: { regID: { in: [...registrationIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${registeredClasses.length} registered classes in ${elapsed}ms`)

      // Group registered classes by regID
      const classMap = new Map<number, tbl_reg_class[]>()
      registeredClasses.forEach((regClass) => {
        const existing = classMap.get(regClass.regID) || []
        classMap.set(regClass.regID, [...existing, regClass])
      })

      return registrationIDs.map(id => classMap.get(id) || [])
    },
  )

  // Batch load groups by registrationID (regID in database) - one-to-one relationship
  readonly groupLoader = new DataLoader<number, tbl_reg_group | null>(
    async (registrationIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${registrationIDs.length} group queries`)
      const start = Date.now()

      const groups = await this.prisma.tbl_reg_group.findMany({
        where: { regID: { in: [...registrationIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${groups.length} groups in ${elapsed}ms`)

      const groupMap = new Map(groups.map(group => [group.regID, group]))
      return registrationIDs.map(id => groupMap.get(id) || null)
    },
  )

  // Batch load communities by registrationID (regID in database) - one-to-one relationship
  readonly communityLoader = new DataLoader<number, tbl_reg_community | null>(
    async (registrationIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${registrationIDs.length} community queries`)
      const start = Date.now()

      const communities = await this.prisma.tbl_reg_community.findMany({
        where: { regID: { in: [...registrationIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${communities.length} communities in ${elapsed}ms`)

      const communityMap = new Map(communities.map(community => [community.regID, community]))
      return registrationIDs.map(id => communityMap.get(id) || null)
    },
  )

  // Batch load teachers by teacherID (actually tbl_user records)
  readonly teacherLoader = new DataLoader<number, tbl_user | null>(
    async (teacherIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${teacherIDs.length} teacher queries`)
      const start = Date.now()

      const teachers = await this.prisma.tbl_user.findMany({
        where: { id: { in: [...teacherIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${teachers.length} teachers in ${elapsed}ms`)

      const teacherMap = new Map(teachers.map(teacher => [teacher.id, teacher]))
      return teacherIDs.map(id => teacherMap.get(id) || null)
    },
  )

  // Batch load schools by registrationID (regID in database) - one-to-one relationship
  readonly schoolLoader = new DataLoader<number, tbl_reg_school | null>(
    async (registrationIDs: readonly number[]) => {
      this.logger.log(`[DataLoader] Batching ${registrationIDs.length} school queries`)
      const start = Date.now()

      const schools = await this.prisma.tbl_reg_school.findMany({
        where: { regID: { in: [...registrationIDs] } },
      })

      const elapsed = Date.now() - start
      this.logger.log(`[DataLoader] Fetched ${schools.length} schools in ${elapsed}ms`)

      const schoolMap = new Map(schools.map(school => [school.regID, school]))
      return registrationIDs.map(id => schoolMap.get(id) || null)
    },
  )
}
