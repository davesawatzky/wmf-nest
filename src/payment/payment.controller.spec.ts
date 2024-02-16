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
import { StripeService } from '../stripe/stripe.service'
import { StripeModule } from '../stripe/stripe.module'
import { ConfigService } from '@nestjs/config'

describe('PaymentController', () => {
  let controller: PaymentController
  let payment: PaymentService
  let stripe: StripeService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: payment,
        },
        {
          provide: StripeService,
          useValue: stripe,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
      // imports: [StripeModule],
    }).compile()

    controller = module.get<PaymentController>(PaymentController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
