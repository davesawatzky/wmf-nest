import { Injectable } from '@nestjs/common'
import { tbl_field_config } from '@prisma/client'
import { FieldConfigInput } from './dto/field-config.input'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class FieldConfigService {
  constructor(private prisma: PrismaService) {}

  create(FieldConfigInput: FieldConfigInput) {
    return 'This action adds a new fieldConfig'
  }

  async findAll() {
    return await this.prisma.tbl_field_config.findMany()
  }

  async findOne(tableName: string, fieldName: string) {
    return await this.prisma.tbl_field_config.findUnique({
      where: { single_field: { tableName, fieldName } },
    })
  }

  update(id: number, FieldConfigInput: FieldConfigInput) {
    return `This action updates a #${id} fieldConfig`
  }

  remove(id: number) {
    return `This action removes a #${id} fieldConfig`
  }
}
