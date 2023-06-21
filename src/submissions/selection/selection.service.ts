import { Injectable } from '@nestjs/common'
import { tbl_reg_classes, tbl_reg_selection } from '@prisma/client'
import { SelectionInput } from './dto/selection.input'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class SelectionService {
  constructor(private prisma: PrismaService) {}

  async create(registeredClassID: tbl_reg_classes['id']) {
    return {
      userErrors: [],
      selection: await this.prisma.tbl_reg_selection.create({
        data: {
          classpickID: registeredClassID,
        },
      }),
    }
  }

  async findAll(registeredClassID?: tbl_reg_classes['id']) {
    return await this.prisma.tbl_reg_selection.findMany({
      where: { classpickID: registeredClassID },
    })
  }

  async findOne(selectionID: tbl_reg_selection['id']) {
    return await this.prisma.tbl_reg_selection.findUnique({
      where: { id: selectionID },
    })
  }

  async update(
    selectionID: tbl_reg_selection['id'],
    selectionInput: Partial<SelectionInput>
  ) {
    return {
      userErrors: [],
      selection: await this.prisma.tbl_reg_selection.update({
        where: { id: selectionID },
        data: { ...selectionInput },
      }),
    }
  }

  async remove(selectionID: tbl_reg_selection['id']) {
    return {
      userErrors: [],
      selection: await this.prisma.tbl_reg_selection.delete({
        where: { id: selectionID },
      }),
    }
  }
}
