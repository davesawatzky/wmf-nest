import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TrophyService } from './trophy.service'
import { CreateTrophyInput } from './dto/create-trophy.input'
import { UpdateTrophyInput } from './dto/update-trophy.input'

@Resolver('Trophy')
export class TrophyResolver {
  constructor(private readonly trophyService: TrophyService) {}

  @Mutation('createTrophy')
  create(@Args('createTrophyInput') createTrophyInput: CreateTrophyInput) {
    return this.trophyService.create(createTrophyInput)
  }

  @Query('trophy')
  findAll() {
    return this.trophyService.findAll()
  }

  @Query('trophy')
  findOne(@Args('id') id: number) {
    return this.trophyService.findOne(id)
  }

  @Mutation('updateTrophy')
  update(@Args('updateTrophyInput') updateTrophyInput: UpdateTrophyInput) {
    return this.trophyService.update(updateTrophyInput.id, updateTrophyInput)
  }

  @Mutation('removeTrophy')
  remove(@Args('id') id: number) {
    return this.trophyService.remove(id)
  }
}
