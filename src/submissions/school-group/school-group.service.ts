import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SchoolGroupInput } from './dto/school-group.input'
import { tbl_reg_school, tbl_reg_schoolgroup } from '@prisma/client'
import {UserError} from '@/common.entity'

@Injectable()
export class SchoolGroupService {
  constructor(private prisma: PrismaService) {}

  async create(
    schoolID: tbl_reg_school['id'],
    schoolGroupInput?: Partial<SchoolGroupInput>
  ) {
    let schoolGroup: tbl_reg_schoolgroup
    let userErrors: UserError[]
    try {
      userErrors = [],
      schoolGroup = await this.prisma.tbl_reg_schoolgroup.create({
        data: { schoolID: schoolID, ...schoolGroupInput },
      })
    } catch (error: any) {
      if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Cannot create school group. Missing school ID',
            field: ['schoolId']
          }
        ]
        schoolGroup = null
      } else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot create school group',
            field: []
          }
        ]
        schoolGroup = null
      }
    }
    return {
      userErrors,
      schoolGroup,
    }
  }

  async findAll(schoolID?: tbl_reg_schoolgroup['schoolID']) {
    return await this.prisma.tbl_reg_schoolgroup.findMany({
      where: { schoolID},
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
    let userErrors: UserError[]
    let schoolGroup: tbl_reg_schoolgroup

    try {
      userErrors = [],
      schoolGroup = await this.prisma.tbl_reg_schoolgroup.update({
        where: { id: schoolGroupID },
        data: { ...schoolGroupInput },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'School group to update not found',
            field: ['id']
          }
        ]
        schoolGroup = null
      } else {
        userErrors = [
          {
            message: 'Cannot update school group',
            field: []
          }
        ]
        schoolGroup = null
      }
    }
    return {
      userErrors,
      schoolGroup,
    }
  }

  async remove(schoolGroupID: tbl_reg_schoolgroup['id']) {
    let userErrors: UserError[]
    let schoolGroup: tbl_reg_schoolgroup

    try {
      userErrors = [],
      schoolGroup = await this.prisma.tbl_reg_schoolgroup.delete({
        where: { id: schoolGroupID },
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'School group to delete not found',
            field: ['id']
          }
        ]
        schoolGroup = null
      } else {
        userErrors = [
          {
            message: 'Cannot delete school group',
            field: []
          }
        ]
        schoolGroup = null
      }
    }
    return {
      userErrors,
      schoolGroup,
    }
  }
}
