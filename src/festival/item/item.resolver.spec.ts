import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ItemResolver } from './item.resolver.js'
import { ItemService } from './item.service.js'

describe('itemResolver', () => {
  let resolver: ItemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemResolver, ItemService],
    }).compile()

    resolver = module.get<ItemResolver>(ItemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
