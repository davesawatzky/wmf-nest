import { Injectable } from '@nestjs/common'
import { tbl_reg_classes, tbl_reg_selection } from '@prisma/client'
import { SelectionInput } from './dto/selection.input'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SelectionService {
  constructor(private prisma: PrismaService) {}

  create(
    registeredClassID: tbl_reg_classes['id'],
    // selectionInput: Partial<SelectionInput>
  ) {
    return this.prisma.tbl_reg_selection.create({
      data: {
        classpickID: registeredClassID,
        // ...selectionInput,
      },
    })
  }

  findAll(registeredClassID?: tbl_reg_classes['id']) {
    return this.prisma.tbl_reg_selection.findMany({
      where: { classpickID: registeredClassID },
    })
  }

  findOne(selectionID: tbl_reg_selection['id']) {
    return this.prisma.tbl_reg_selection.findUnique({
      where: { id: selectionID },
    })
  }

  update(
    selectionID: tbl_reg_selection['id'],
    selectionInput: Partial<SelectionInput>
  ) {
    return this.prisma.tbl_reg_selection.update({
      where: { id: selectionID },
      data: { ...selectionInput },
    })
  }

  remove(selectionID: tbl_reg_selection['id']) {
    return this.prisma.tbl_reg_selection.delete({
      where: { id: selectionID },
    })
  }
}
