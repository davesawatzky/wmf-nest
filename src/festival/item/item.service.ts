import { Injectable } from '@nestjs/common'
import { tbl_item } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { ItemInput } from './dto/item.input'

@Injectable()
export class ItemService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return await this.prisma.tbl_item.findMany()
  }

  async findOne(id: tbl_item['id']) {
    return await this.prisma.tbl_item.findUnique({
      where: { id },
    })
  }

  async create(itemInput: ItemInput) {
    return {
      userErrors: [],
      item: await this.prisma.tbl_item.create({
        data: { ...itemInput },
      }),
    }
  }

  async update(id: number, itemInput: ItemInput) {
    return {
      userErrors: [],
      item: await this.prisma.tbl_item.update({
        where: { id },
        data: { ...itemInput },
      }),
    }
  }

  async remove(id: number) {
    return {
      userErrors: [],
      item: await this.prisma.tbl_item.delete({
        where: { id },
      }),
    }
  }
}
