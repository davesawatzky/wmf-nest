import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { ItemModule } from '@/festival/item/item.module.js'

import { OrderModule } from '../order/order.module.js'
import { OrderItemResolver } from './order-item.resolver.js'
import { OrderItemService } from './order-item.service.js'

@Module({
  providers: [OrderItemResolver, OrderItemService],
  imports: [AbilityModule, forwardRef(() => OrderModule), forwardRef(() => ItemModule)],
  exports: [OrderItemService],
})
export class OrderItemModule {}
