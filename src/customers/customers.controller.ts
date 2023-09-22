import { Controller, Get, Inject } from '@nestjs/common'
import Stripe from 'stripe'
import { STRIPE_CLIENT } from '../stripe/constants'

@Controller('customers')
export class CustomersController {
  constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {}

  @Get('/')
  listCustomers() {
    return this.stripe.customers.list()
  }
}
