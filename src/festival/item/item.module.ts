import { AbilityModule } from '@/ability/ability.module'
import { OrderItemModule } from '@/submissions/order-item/order-item.module'
import { forwardRef, Module } from '@nestjs/common'
import { ItemResolver } from './item.resolver'
import { ItemService } from './item.service'

@Module({
  providers: [ItemResolver, ItemService],
  imports: [AbilityModule, forwardRef(() => OrderItemModule)],
  exports: [ItemService],

})
export class ItemModule {}
