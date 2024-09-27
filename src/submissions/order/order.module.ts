import { AbilityModule } from '@/ability/ability.module'
import { UserModule } from '@/user/user.module'
import { Module } from '@nestjs/common'
import { OrderItemModule } from '../order-item/order-item.module'
import { OrderResolver } from './order.resolver'
import { OrderService } from './order.service'

@Module({
  providers: [OrderResolver, OrderService],
  imports: [
    AbilityModule,
    UserModule,
    OrderItemModule,
  ],
  exports: [OrderService],
})
export class OrderModule {}
