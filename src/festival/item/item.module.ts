import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { OrderItemModule } from '@/submissions/order-item/order-item.module'
import { ItemResolver } from './item.resolver'
import { ItemService } from './item.service'

@Module({
  providers: [ItemResolver, ItemService],
  imports: [AbilityModule, forwardRef(() => OrderItemModule)],
  exports: [ItemService],
})
export class ItemModule {}
