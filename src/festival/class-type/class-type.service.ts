import { Injectable } from '@nestjs/common'
import { tbl_class_type } from '@prisma/client'
import {PrismaService} from '@/prisma/prisma.service'
import {UserError} from '@/common.entity'
import {ClassType, ClassTypePayload} from './entities/class-type.entity'
import { ClassTypeInput } from './dto/class-type.input'

@Injectable()
export class ClassTypeService {
  constructor(private prisma: PrismaService) {}

    async create(classTypeInput: ClassTypeInput) {
    let classType: tbl_class_type
    let userErrors: UserError[]
    try {
      userErrors = [],
        classType = await this.prisma.tbl_class_type.create({
          data: {...classTypeInput},
        })
    } catch (error: any) {
      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Class type already exists',
            field: ['name']
          }
        ]
        classType = null
      } else {
        console.log(error)
        userErrors = [
          {
            message: 'Cannot create class type',
            field: []
          }
        ]
        classType = null
      }
    }
    return {
      userErrors,
      classType
    }
  }
  
  async findAll() {
    return await this.prisma.tbl_class_type.findMany()
  }

  async findOne(id: tbl_class_type['id']) {
    return await this.prisma.tbl_class_type.findUnique({
      where: { id },
    })
  }

  async update(id: tbl_class_type['id'], classTypeInput: ClassTypeInput){
    let classType: tbl_class_type
    let userErrors: UserError[]
    try {
      userErrors = []
      classType = await this.prisma.tbl_class_type.update({
        where: {id},
        data: {...classTypeInput}
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Class type to update not found',
            field: ['id']
          }
        ]
        classType = null
      } else {
        userErrors = [
          {
            message: 'Cannot update class type',
            field: []
          }
        ]
        classType =null
      }
    }
    return {
      userErrors,
      classType
    }
  }

  async remove(id: tbl_class_type['id']) {
    let classType: tbl_class_type
    let userErrors: UserError[]
    try {
      userErrors = []
      classType = await this.prisma.tbl_class_type.delete({
        where: {id},
      })
    } catch (error: any) {
      if (error.code === 'P2025') {
        userErrors = [
          {
            message: 'Class type to delete not found',
            field: ['id']
          }
        ]
        classType = null
      } else {
        userErrors = [
          {
            message: 'Cannot delete class type',
            field: []
          }
        ]
        classType =null
      }
    }
    return {
      userErrors,
      classType
    }
  }
}
