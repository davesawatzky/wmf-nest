import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { ItemModule } from '@/festival/item/item.module'
import { OrderModule } from '../order/order.module'
import { OrderItemResolver } from './order-item.resolver'
import { OrderItemService } from './order-item.service'

@Module({
  providers: [OrderItemResolver, OrderItemService],
  imports: [AbilityModule, forwardRef(() => OrderModule), forwardRef(() => ItemModule)],
  exports: [OrderItemService],
})
export class OrderItemModule {}
