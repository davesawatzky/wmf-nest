import { PerformerType } from '@/common.entity'
import { SearchFilters, SearchFilterService } from '@/common/search-filters'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { tbl_registration, tbl_user } from '@prisma/client'
import { RegistrationSearchFilters } from './dto/registration-search-filters.input'
import { RegistrationInput } from './dto/registration.input'

@Injectable()
export class RegistrationService {
  constructor(
    private prisma: PrismaService,
    private searchFilterService: SearchFilterService,
  ) {}

  async create(
    userID: tbl_registration['userID'],
    performerType: PerformerType,
    label: tbl_registration['label'],
  ) {
    let newLabel: string
    label === '' ? newLabel = 'Registration Form' : newLabel = label
    return {
      userErrors: [],
      registration: this.prisma.tbl_registration.create({
        data: {
          userID,
          performerType,
          label: newLabel,
        },
      }),
    }
  }

  async findAll(
    userID?: tbl_user['id'],
    performerType?: PerformerType,
    teacherID?: tbl_user['id'],
    skip?: number,
    take?: number,
    sortField?: string,
    sortOrder?: 'asc' | 'desc',
    searchFilters?: RegistrationSearchFilters,
  ) {
    // Create base where clause with standard filters
    const where: any = {}
    if (userID) where.userID = userID
    if (performerType) where.performerType = performerType
    if (teacherID) where.teacherID = teacherID

    // Apply search filters through our service
    const searchFilterWhere = this.searchFilterService.buildWhereClause(searchFilters)

    // Merge the base where clause with the search filter where clause
    const mergedWhere = { ...where }

    // Add AND conditions if they exist
    if (searchFilterWhere.AND && searchFilterWhere.AND.length > 0) {
      mergedWhere.AND = mergedWhere.AND || []
      mergedWhere.AND.push(...searchFilterWhere.AND)
    }

    // Add OR conditions if they exist
    if (searchFilterWhere.OR && searchFilterWhere.OR.length > 0) {
      mergedWhere.OR = mergedWhere.OR || []
      mergedWhere.OR.push(...searchFilterWhere.OR)
    }

    console.log('MergedWhere:', mergedWhere)

    return await this.prisma.tbl_registration.findMany({
      skip,
      take,
      where: mergedWhere,
      orderBy: {
        [sortField || 'createdAt']: sortOrder || undefined,
      },
    })
  }

  async findOne(id: tbl_registration['id']) {
    return await this.prisma.tbl_registration.findUnique({
      where: { id },
    })
  }

  async update(
    registrationID: tbl_registration['id'],
    registrationInput: Partial<RegistrationInput>,
  ) {
    return {
      userErrors: [],
      registration: await this.prisma.tbl_registration.update({
        where: { id: registrationID },
        data: { ...registrationInput },
      }),
    }
  }

  async remove(id: tbl_registration['id']) {
    return {
      userErrors: [],
      registration: await this.prisma.tbl_registration.delete({
        where: { id },
      }),
    }
  }
}
