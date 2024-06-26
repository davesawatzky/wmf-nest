import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SchoolGroupInput } from './dto/school-group.input'
import { tbl_reg_school, tbl_reg_schoolgroup } from '@prisma/client'

@Injectable()
export class SchoolGroupService {
  constructor(private prisma: PrismaService) {}

  async create(schoolID: tbl_reg_school['id']) {
    return {
      userErrors: [],
      schoolGroup: await this.prisma.tbl_reg_schoolgroup.create({
        data: { schoolID: schoolID },
      }),
    }
  }

  async findAll(schoolID?: tbl_reg_schoolgroup['schoolID']) {
    return await this.prisma.tbl_reg_schoolgroup.findMany({
      where: { schoolID },
    })
  }

  async findOne(schoolGroupID: tbl_reg_schoolgroup['id']) {
    return await this.prisma.tbl_reg_schoolgroup.findUnique({
      where: { id: schoolGroupID },
    })
  }

  async update(
    schoolGroupID: tbl_reg_schoolgroup['id'],
    schoolGroupInput: Partial<SchoolGroupInput>
  ) {
    return {
      userErrors: [],
      schoolGroup: await this.prisma.tbl_reg_schoolgroup.update({
        where: { id: schoolGroupID },
        data: { ...schoolGroupInput },
      }),
    }
  }

  async remove(schoolGroupID: tbl_reg_schoolgroup['id']) {
    return {
      userErrors: [],
      schoolGroup: await this.prisma.tbl_reg_schoolgroup.delete({
        where: { id: schoolGroupID },
      }),
    }
  }
}
