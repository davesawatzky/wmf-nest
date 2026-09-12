import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { UserModule } from '@/user/user.module.js'

import { OrderItemModule } from '../order-item/order-item.module.js'
import { OrderResolver } from './order.resolver.js'
import { OrderService } from './order.service.js'

@Module({
  providers: [OrderResolver, OrderService],
  imports: [AbilityModule, forwardRef(() => UserModule), forwardRef(() => OrderItemModule)],
  exports: [OrderService],
})
export class OrderModule {}
