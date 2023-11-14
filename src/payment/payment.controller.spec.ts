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
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { StripeService } from 'src/stripe/stripe.service'
import { StripeModule } from 'src/stripe/stripe.module'

describe('PaymentController', () => {
  let controller: PaymentController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService, StripeService],
      imports: [StripeModule],
    }).compile()

    controller = module.get<PaymentController>(PaymentController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
