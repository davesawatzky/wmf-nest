import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { OrderItemService } from '../order-item.service.js'

describe('orderItemService', () => {
  let service: OrderItemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemService],
    }).compile()

    service = module.get<OrderItemService>(OrderItemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
