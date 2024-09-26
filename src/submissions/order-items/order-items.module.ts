import { Module } from '@nestjs/common';
import { OrderItemsResolver } from './order-items.resolver';
import { OrderItemsService } from './order-items.service';

@Module({
  providers: [OrderItemsResolver, OrderItemsService],
})
export class OrderItemsModule {}
