import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DisciplineInput } from 'src/graphql'
import { tbl_discipline } from '@prisma/client'
// import { CreateDisciplineInput } from './dto/create-discipline.input'
// import { UpdateDisciplineInput } from './dto/update-discipline.input'

@Injectable()
export class DisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(disciplineInput: DisciplineInput) {
    return await this.prisma.tbl_discipline.create({
      data: { ...disciplineInput },
    })
  }

  async findAll() {
    return this.prisma.tbl_discipline.findMany()
  }

  async findOne(id: tbl_discipline['id']) {
    return await this.prisma.tbl_discipline.findUnique({
      where: { id },
    })
  }

  async update(id: tbl_discipline['id'], DisciplineInput: DisciplineInput) {
    return await this.prisma.tbl_discipline.update({
      where: { id },
      data: { ...DisciplineInput },
    })
  }

  async remove(id: tbl_discipline['id']) {
    return await this.prisma.tbl_discipline.delete({
      where: { id },
    })
  }
}
