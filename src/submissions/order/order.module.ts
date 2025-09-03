import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { UserModule } from '@/user/user.module'
import { OrderItemModule } from '../order-item/order-item.module'
import { OrderResolver } from './order.resolver'
import { OrderService } from './order.service'

@Module({
  providers: [OrderResolver, OrderService],
  imports: [
    AbilityModule,
    forwardRef(() => UserModule),
    forwardRef(() => OrderItemModule),
  ],
  exports: [OrderService],
})
export class OrderModule {}
