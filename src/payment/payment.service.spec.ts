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
import { StripeService } from 'src/stripe/stripe.service'
import { StripeModule } from 'src/stripe/stripe.module'
import { StripeModuleOptions } from 'src/stripe/stripeOptions.interface'
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from 'src/stripe/stripe.module-definition'

describe('PaymentService', () => {
  let service: PaymentService
  let config: StripeModuleOptions

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, StripeService],
      imports: [
        StripeModule.forRootAsync({
          useClass: ConfigurableModuleClass,
          inject: [MODULE_OPTIONS_TOKEN],
        }),
      ],
    }).compile()

    service = await module.resolve<PaymentService>(PaymentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
