import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { tbl_reg_selection } from '@prisma/client'
import { UserError } from '@/common.entity'
import { PrismaService } from '@/prisma/prisma.service'
import { SelectionInput } from './dto/selection.input'

@Injectable()
export class SelectionService {
  private readonly logger = new Logger(SelectionService.name)

  constructor(private prisma: PrismaService) {}

  async create(registeredClassID: number) {
    if (!registeredClassID) {
      throw new BadRequestException('Registered class ID is required')
    }

    let selection: tbl_reg_selection | null
    let userErrors: UserError[]

    try {
      userErrors = []
      selection = await this.prisma.tbl_reg_selection.create({
        data: {
          classpickID: registeredClassID,
        },
      })
      this.logger.log(
        `Successfully created selection ID: ${selection.id} for registered class ID: ${registeredClassID}`,
      )
    }
    catch (error: any) {
      this.logger.error(
        `Failed to create selection for registered class ID ${registeredClassID}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Registered class does not exist',
            field: ['registeredClassID'],
          },
        ]
        selection = null
      }
      else {
        userErrors = [{ message: 'Cannot create selection', field: [] }]
        selection = null
      }
    }

    return { userErrors, selection }
  }

  async findAll(registeredClassID?: number) {
    try {
      const selections = await this.prisma.tbl_reg_selection.findMany({
        where: registeredClassID
          ? {
              classpickID: registeredClassID,
            }
          : undefined,
        orderBy: { id: 'asc' },
      })

      this.logger.log(
        registeredClassID
          ? `Successfully retrieved ${selections.length} selections for registered class ID: ${registeredClassID}`
          : `Successfully retrieved all ${selections.length} selections`,
      )

      return selections
    }
    catch (error: any) {
      this.logger.error(
        registeredClassID
          ? `Failed to retrieve selections for registered class ID ${registeredClassID}: ${error.message}`
          : `Failed to retrieve all selections: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve selections')
    }
  }

  async findOne(selectionID: number) {
    if (!selectionID) {
      this.logger.error('Attempted to find selection without providing ID')
      throw new BadRequestException('Selection ID is required')
    }

    try {
      const selection = await this.prisma.tbl_reg_selection.findUnique({
        where: { id: selectionID },
      })

      if (!selection) {
        this.logger.error(`Selection not found with ID: ${selectionID}`)
        throw new NotFoundException(
          `Selection with ID ${selectionID} not found`,
        )
      }

      this.logger.log(`Successfully retrieved selection ID: ${selectionID}`)
      return selection
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to retrieve selection ID ${selectionID}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve selection')
    }
  }

  async update(
    selectionID: tbl_reg_selection['id'],
    selectionInput: Partial<SelectionInput>,
  ) {
    if (!selectionID) {
      throw new BadRequestException('Selection ID is required')
    }

    let selection: tbl_reg_selection | null
    let userErrors: UserError[]

    try {
      userErrors = []
      selection = await this.prisma.tbl_reg_selection.update({
        where: { id: selectionID },
        data: { ...selectionInput },
      })
      this.logger.log(`Successfully updated selection ID: ${selectionID}`)
    }
    catch (error: any) {
      this.logger.error(
        `Failed to update selection ID ${selectionID}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: `Selection with ID ${selectionID} does not exist`,
            field: ['selectionID'],
          },
        ]
        selection = null
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Invalid reference to related record',
            field: ['classpickID'],
          },
        ]
        selection = null
      }
      else {
        userErrors = [{ message: 'Cannot update selection', field: [] }]
        selection = null
      }
    }

    return { userErrors, selection }
  }

  async remove(selectionID: tbl_reg_selection['id']) {
    if (!selectionID) {
      throw new BadRequestException('Selection ID is required')
    }

    let selection: tbl_reg_selection | null
    let userErrors: UserError[]

    try {
      userErrors = []
      selection = await this.prisma.tbl_reg_selection.delete({
        where: { id: selectionID },
      })
      this.logger.log(`Successfully deleted selection ID: ${selectionID}`)
    }
    catch (error: any) {
      this.logger.error(
        `Failed to delete selection ID ${selectionID}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        userErrors = [
          {
            message: `Selection with ID ${selectionID} does not exist`,
            field: ['selectionID'],
          },
        ]
        selection = null
      }
      else {
        userErrors = [{ message: 'Cannot delete selection', field: [] }]
        selection = null
      }
    }

    return { userErrors, selection }
  }
}
