import { Injectable } from '@nestjs/common'
import { tbl_class_type } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ClassTypeService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: tbl_class_type['id']) {
    return await this.prisma.tbl_class_type.findUnique({
      where: { id },
    })
  }
}
