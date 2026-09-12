import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrderItemResolver } from '../order-item.resolver.js'
import { OrderItemService } from '../order-item.service.js'

describe('orderItemResolver', () => {
  let resolver: OrderItemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemResolver, OrderItemService],
    }).compile()

    resolver = module.get<OrderItemResolver>(OrderItemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
