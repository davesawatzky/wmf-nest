import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { OrderItemModule } from '@/submissions/order-item/order-item.module.js'

import { ItemResolver } from './item.resolver.js'
import { ItemService } from './item.service.js'

@Module({
  providers: [ItemResolver, ItemService],
  imports: [AbilityModule, forwardRef(() => OrderItemModule)],
  exports: [ItemService],
})
export class ItemModule {}
