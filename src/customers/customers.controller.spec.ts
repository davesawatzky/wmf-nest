import { Test, TestingModule } from '@nestjs/testing'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'
import { CustomersController } from './customers.controller'

describe('CustomersController', () => {
  let controller: CustomersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
    }).compile()

    controller = module.get<CustomersController>(CustomersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
