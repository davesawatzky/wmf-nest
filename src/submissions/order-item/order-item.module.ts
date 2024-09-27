import {AbilityModule} from '@/ability/ability.module'
import {ItemModule} from '@/festival/item/item.module'
import { Module } from '@nestjs/common'
import {OrderModule} from '../order/order.module'
import { OrderItemResolver } from './order-item.resolver'
import { OrderItemService } from './order-item.service'

@Module({
  providers: [OrderItemResolver, OrderItemService],
  imports: [AbilityModule, OrderModule, ItemModule],
  exports: [OrderItemService],
})
export class OrderItemModule {}
