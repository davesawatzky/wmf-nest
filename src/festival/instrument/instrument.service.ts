import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_instrument } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { InstrumentInput } from './dto/instrument.input'

@Injectable()
export class InstrumentService {
  private readonly logger = new Logger(InstrumentService.name)

  constructor(private prisma: PrismaService) {}

  async create(instrumentInput: InstrumentInput) {
    this.logger.debug(
      `Creating instrument with data: ${JSON.stringify(instrumentInput)}`,
    )
    let instrument: tbl_instrument
    let userErrors: UserError[] = []
    try {
      instrument = await this.prisma.tbl_instrument.create({
        data: { ...instrumentInput },
      })
      this.logger.log(
        `Successfully created instrument with ID: ${instrument.id}`,
      )
      return {
        userErrors,
        instrument,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create instrument: ${error.message}`,
        error.stack,
      )
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Instrument with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate instrument name attempted: ${instrumentInput.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while creating the instrument',
            field: [],
          },
        ]
      }
      return {
        userErrors,
        instrument: null,
      }
    }
  }

  async findAll(disciplineID?: number) {
    this.logger.debug(
      `Retrieving instruments with disciplineID filter: ${disciplineID}`,
    )
    try {
      let instruments: tbl_instrument[]
      if (disciplineID) {
        instruments = await this.prisma.tbl_instrument.findMany({
          where: {
            disciplineID,
          },
          orderBy: {
            name: 'asc',
          },
        })
      }
      else {
        instruments = await this.prisma.tbl_instrument.findMany({
          orderBy: {
            name: 'asc',
          },
        })
      }
      this.logger.log(
        `Successfully retrieved ${instruments.length} instruments`,
      )
      return instruments
    }
    catch (error: any) {
      this.logger.error(
        `Failed to retrieve instruments: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve instruments')
    }
  }

  async findOne(id?: tbl_instrument['id'], name?: tbl_instrument['name']) {
    this.logger.debug(`Retrieving instrument with ID: ${id}, name: ${name}`)
    if (!id && !name) {
      this.logger.warn(
        'Attempted to find instrument without providing ID or name',
      )
      throw new BadRequestException('Either instrument ID or name is required')
    }
    try {
      let instrument: tbl_instrument | null = null
      if (id) {
        instrument = await this.prisma.tbl_instrument.findUnique({
          where: { id },
        })
        if (!instrument) {
          this.logger.warn(`Instrument not found with ID: ${id}`)
          throw new NotFoundException(`Instrument with ID ${id} not found`)
        }
        this.logger.log(`Successfully retrieved instrument with ID: ${id}`)
      }
      else if (name) {
        instrument = await this.prisma.tbl_instrument.findFirst({
          where: { name },
        })
        if (!instrument) {
          this.logger.warn(`Instrument not found with name: ${name}`)
          throw new NotFoundException(
            `Instrument with name '${name}' not found`,
          )
        }
        this.logger.log(`Successfully retrieved instrument with name: ${name}`)
      }
      return instrument
    }
    catch (error: any) {
      if (
        error instanceof NotFoundException
        || error instanceof BadRequestException
      ) {
        throw error
      }
      this.logger.error(
        `Failed to retrieve instrument: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve instrument')
    }
  }

  async update(
    instrumentID: tbl_instrument['id'],
    inst: Partial<tbl_instrument>,
  ) {
    this.logger.debug(
      `Updating instrument with ID: ${instrumentID}, data: ${JSON.stringify(inst)}`,
    )
    let instrument: tbl_instrument
    let userErrors: UserError[] = []
    try {
      instrument = await this.prisma.tbl_instrument.update({
        where: {
          id: instrumentID,
        },
        data: {
          ...inst,
        },
      })
      this.logger.log(
        `Successfully updated instrument with ID: ${instrumentID}`,
      )
      return {
        userErrors,
        instrument,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update instrument with ID ${instrumentID}: ${error.message}`,
        error.stack,
      )
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Instrument not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to update non-existent instrument with ID: ${instrumentID}`,
        )
      }
      else if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Instrument with this name already exists',
            field: ['name'],
          },
        ]
        this.logger.warn(
          `Duplicate instrument name attempted during update: ${inst.name}`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while updating the instrument',
            field: [],
          },
        ]
      }
      return {
        userErrors,
        instrument: null,
      }
    }
  }

  async remove(id: tbl_instrument['id']) {
    this.logger.debug(`Deleting instrument with ID: ${id}`)
    let instrument: tbl_instrument
    let userErrors: UserError[] = []
    try {
      instrument = await this.prisma.tbl_instrument.delete({
        where: { id },
      })
      this.logger.log(`Successfully deleted instrument with ID: ${id}`)
      return {
        userErrors,
        instrument,
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete instrument with ID ${id}: ${error.message}`,
        error.stack,
      )
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Instrument not found',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete non-existent instrument with ID: ${id}`,
        )
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message:
              'Cannot delete instrument as it is referenced by other records',
            field: ['id'],
          },
        ]
        this.logger.warn(
          `Attempted to delete instrument with ID ${id} that has foreign key references`,
        )
      }
      else {
        userErrors = [
          {
            message:
              'An unexpected error occurred while deleting the instrument',
            field: [],
          },
        ]
      }
      return {
        userErrors,
        instrument: null,
      }
    }
  }
}
