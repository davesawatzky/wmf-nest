import {AbilityModule} from '@/ability/ability.module'
import {OrderItemModule} from '@/submissions/order-item/order-item.module'
import { Module } from '@nestjs/common'
import { ItemResolver } from './item.resolver'
import { ItemService } from './item.service'

@Module({
  providers: [ItemResolver, ItemService],
  imports: [AbilityModule, OrderItemModule],
  exports: [ItemService],

})
export class ItemModule {}
