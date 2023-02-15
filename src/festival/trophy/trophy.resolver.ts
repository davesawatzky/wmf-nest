import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { TrophyService } from './trophy.service'
import { FestivalClassService } from '../festival-class/festival-class.service'
import { FestivalClass, Trophy, TrophyInput } from 'src/graphql'
// import { CreateTrophyInput } from './dto/create-trophy.input'
// import { UpdateTrophyInput } from './dto/update-trophy.input'

@Resolver('Trophy')
export class TrophyResolver {
  constructor(
    private readonly trophyService: TrophyService,
    private readonly festivalClassService: FestivalClassService,
  ) {}

  /** Queries */

  @Query('trophies')
  findAll() {
    return this.trophyService.findAll()
  }

  @Query('trophy')
  findOne(@Args('id') id: Trophy['id']) {
    return this.trophyService.findOne(id)
  }

  /** Mutations */

  @Mutation('trophyCreate')
  create(@Args('trophyInput') trophyInput: TrophyInput) {
    return this.trophyService.create(trophyInput)
  }

  @Mutation('trophyUpdate')
  update(
    @Args('trophyID') trophyID: Trophy['id'],
    @Args('trophyInput') trophyInput: TrophyInput,
  ) {
    return this.trophyService.update(trophyID, trophyInput)
  }

  @Mutation('trophyDelete')
  remove(@Args('id') id: Trophy['id']) {
    return this.trophyService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField('classes')
  async getClasses(@Parent() trophy) {
    const { id }: { id: Trophy['id'] } = trophy
    return this.trophyService.findTrophyClasses(id)
  }
}
