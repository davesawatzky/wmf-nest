import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrderResolver } from '../order.resolver.js'
import { OrderService } from '../order.service.js'

describe('orderResolver', () => {
  let resolver: OrderResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderResolver, OrderService],
    }).compile()

    resolver = module.get<OrderResolver>(OrderResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
