import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { StripeService } from '@/stripe/stripe.service'
import { PaymentCreateDto } from './dto/payment.dto'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

describe('paymentController', () => {
  let controller: PaymentController
  let payment: PaymentService
  let stripe: StripeService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService, {
        provide: StripeService,
        useValue: stripe,
      }, {
        provide: ConfigService,
        useValue: configService,
      }],
      // imports: [StripeModule],
    }).compile()

    controller = module.get<PaymentController>(PaymentController)
    payment = module.get<PaymentService>(PaymentService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createPaymentIntent', () => {
    let body: PaymentCreateDto
    beforeEach(() => {
      body = {
        amount: 25.00,
        currency: 'cad',
      }
      payment.createPaymentIntent = vi.fn().mockResolvedValue({
        client_secret: 'newClientSecret',
      })
    })

    it('should return the clientSecret', async () => {
      const result = await controller.createPaymentIntent(body)
      expect(result).toEqual({ clientSecret: 'newClientSecret' })
    })
  })
})
