import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { PaymentService } from './payment.service'
import { StripeService } from '@/stripe/stripe.service'

describe('paymentService', () => {
  let paymentService: PaymentService
  let stripeService: StripeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, {
        provide: StripeService,
        useValue: stripeService,
      }],

      // imports: [
      //   StripeModule.forRootAsync({
      //     useClass: ConfigurableModuleClass,
      //     inject: [MODULE_OPTIONS_TOKEN],
      //   }),
      // ],
    }).compile()

    paymentService = await module.resolve<PaymentService>(PaymentService)
    stripeService = await module.resolve<StripeService>(StripeService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(paymentService).toBeDefined()
  })

  // describe('Webhook', () => {
  //   let req:RawBodyRequest<Request> = null
  //   let signature = 'testing'
  //   let endpointSecret = 'the code'

  //   beforeEach(() => {
  //     stripeService.stripe.webhooks.constructEvent = vi.fn().mockResolvedValue({
  //       type: 'payment_intent.payment_failed',
  //       data: {
  //         object: 'payment object'
  //       }
  //     })
  //   })

  //   it('Should log different case depending on event object', async () => {
  //     const result = paymentService.webhook(req, signature, endpointSecret)
  //     expect(console.log).toBeCalledWith('Payment failed')

  //   })
  // })
})
