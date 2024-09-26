import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ItemInput } from './dto/item.input'
import { Item } from './entities/item.entity'
import { ItemsService } from './items.service'

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: ItemInput) {
    return this.itemsService.create(createItemInput)
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemsService.findAll()
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id)
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: ItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput)
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id)
  }
}
