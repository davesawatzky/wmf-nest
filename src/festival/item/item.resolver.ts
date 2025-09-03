import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { OrderItem } from '@/submissions/order-item/entities/order-item.entity'
import { OrderItemService } from '@/submissions/order-item/order-item.service'
import { ItemInput } from './dto/item.input'
import { Item, ItemPayload } from './entities/item.entity'
import { ItemService } from './item.service'

@Resolver(() => Item)
@UseGuards(JwtAuthGuard)
export class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    private readonly orderItemService: OrderItemService,
  ) {}

  @Query(() => [Item])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async items() {
    return await this.itemService.findAll()
  }

  @Query(() => Item)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Item })
  async item(
    @Args('id', { type: () => Int }) id: Item['id'],
  ) {
    return await this.itemService.findOne(id)
  }

  @Mutation(() => ItemPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Item })
  async itemCreate(
    @Args('ItemInput', { type: () => ItemInput }) itemInput: Partial<ItemInput>,
  ) {
    return this.itemService.create(itemInput)
  }

  @Mutation(() => ItemPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Item })
  async itemUpdate(
    @Args('id', { type: () => Int }) id: Item['id'],
    @Args('itemInput', { type: () => ItemInput }) itemInput: ItemInput,
  ) {
    return await this.itemService.update(id, itemInput)
  }

  @Mutation(() => ItemPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Item })
  async itemDelete(@Args('id', { type: () => Int }) id: Item['id']) {
    return await this.itemService.remove(id)
  }

  // Field Resolvers

  @ResolveField(() => [OrderItem])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: 'admin' })
  async orderItems(@Parent() item: Item) {
    const { id } = item
    return await this.orderItemService.findAll(id)
  }
}
