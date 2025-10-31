import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_discipline } from '@prisma/client'
import { PerformerType, UserError } from '@/common.entity'
import { Instrument } from '@/festival/instrument/entities/instrument.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { DisciplineInput } from './dto/discipline.input'

@Injectable()
export class DisciplineService {
  private readonly logger = new Logger(DisciplineService.name)

  constructor(private prisma: PrismaService) {}

  async create(disciplineInput: DisciplineInput) {
    this.logger.debug(
      `Creating discipline with data: ${JSON.stringify(disciplineInput)}`,
    )
    let discipline: tbl_discipline
    let userErrors: UserError[] = []
    try {
      discipline = await this.prisma.tbl_discipline.create({
        data: { ...disciplineInput },
      })
      this.logger.log(
        `Successfully created discipline with ID: ${discipline.id}`,
      )
      return {
        userErrors,
        discipline,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create discipline: ${error.message}`,
        error.stack,
      )
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Discipline with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate discipline name attempted: ${disciplineInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while creating the discipline',
            field: [],
          },
        ]
      }
      return {
        userErrors,
        discipline: null,
      }
    }
  }

  async findAll(
    performerType?: PerformerType | null,
    instrument?: Instrument['name'] | null,
  ) {
    this.logger.debug(
      `Retrieving disciplines with filters - performerType: ${performerType}, instrument: ${instrument}`,
    )
    try {
      let disciplines: tbl_discipline[]
      if (!!performerType && !instrument) {
        disciplines = await this.prisma.tbl_discipline.findMany({
          where: {
            tbl_subdiscipline: {
              some: {
                tbl_classlist: {
                  some: {
                    performerType,
                  },
                },
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        })
      }
      else if (!!instrument && !performerType) {
        disciplines = await this.prisma.tbl_discipline.findMany({
          where: {
            tbl_instrument: {
              some: {
                name: instrument,
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        })
      }
      else if (!!instrument && !!performerType) {
        disciplines = await this.prisma.tbl_discipline.findMany({
          where: {
            tbl_instrument: {
              some: {
                name: instrument,
              },
            },
            tbl_subdiscipline: {
              some: {
                tbl_classlist: {
                  some: {
                    performerType,
                  },
                },
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        })
      }
      else if (!performerType && !instrument) {
        disciplines = await this.prisma.tbl_discipline.findMany({})
      }
      this.logger.log(
        `Successfully retrieved ${disciplines?.length || 0} disciplines`,
      )
      return disciplines
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve disciplines: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve disciplines')
    }
  }

  async findOne(id: tbl_discipline['id']) {
    if (!id) {
      this.logger.error('Attempted to find discipline without providing ID')
      throw new BadRequestException('Discipline ID is required')
    }
    try {
      const discipline = await this.prisma.tbl_discipline.findUnique({
        where: { id },
      })
      if (!discipline) {
        this.logger.warn(`Discipline not found with ID: ${id}`)
        throw new NotFoundException(`Discipline with ID ${id} not found`)
      }
      this.logger.log(`Successfully retrieved discipline with ID: ${id}`)
      return discipline
    }
    catch (error: any) {
      if (
        error instanceof NotFoundException
        || error instanceof BadRequestException
      ) {
        throw error
      }
      this.logger.error(
        `Failed to retrieve discipline with ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve discipline')
    }
  }

  async update(
    id: tbl_discipline['id'],
    DisciplineInput: Partial<tbl_discipline>,
  ) {
    this.logger.debug(
      `Updating discipline with ID: ${id}, data: ${JSON.stringify(DisciplineInput)}`,
    )
    let discipline: tbl_discipline
    let userErrors: UserError[] = []
    try {
      discipline = await this.prisma.tbl_discipline.update({
        where: { id },
        data: { ...DisciplineInput },
      })
      this.logger.log(`Successfully updated discipline with ID: ${id}`)
      return {
        userErrors,
        discipline,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update discipline with ID ${id}: ${error.message}`,
        error.stack,
      )
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Discipline not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to update non-existent discipline with ID: ${id}`,
        )
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Discipline with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate discipline name attempted during update: ${DisciplineInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while updating the discipline',
            field: [],
          },
        ]
      }
      return {
        userErrors,
        discipline: null,
      }
    }
  }

  async remove(disciplineID: tbl_discipline['id']) {
    this.logger.debug(`Deleting discipline with ID: ${disciplineID}`)
    let discipline: tbl_discipline
    let userErrors: UserError[] = []
    try {
      discipline = await this.prisma.tbl_discipline.delete({
        where: { id: disciplineID },
      })
      this.logger.log(
        `Successfully deleted discipline with ID: ${disciplineID}`,
      )
      return {
        userErrors,
        discipline,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete discipline with ID ${disciplineID}: ${error.message}`,
        error.stack,
      )
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Discipline not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete non-existent discipline with ID: ${disciplineID}`,
        )
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message:
              'Cannot delete discipline as it is referenced by other records',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete discipline with ID ${disciplineID} that has foreign key references`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while deleting the discipline',
            field: [],
          },
        ]
      }
      return {
        userErrors,
        discipline: null,
      }
    }
  }
}
