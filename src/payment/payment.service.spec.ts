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
import { PaymentService } from './payment.service'
import { StripeService } from '../stripe/stripe.service'
import { StripeModule } from '../stripe/stripe.module'
import { StripeModuleOptions } from '../stripe/stripeOptions.interface'
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from '../stripe/stripe.module-definition'

describe('PaymentService', () => {
  let paymentService: PaymentService
  let stripeService: StripeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: StripeService,
          useValue: stripeService,
        },
      ],
      // imports: [
      //   StripeModule.forRootAsync({
      //     useClass: ConfigurableModuleClass,
      //     inject: [MODULE_OPTIONS_TOKEN],
      //   }),
      // ],
    }).compile()

    paymentService = await module.resolve<PaymentService>(PaymentService)
  })

  it('should be defined', () => {
    expect(paymentService).toBeDefined()
  })
})
