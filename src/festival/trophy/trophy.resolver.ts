import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { TrophyService } from './trophy.service'
import { Trophy, TrophyPayload } from './entities/trophy.entity'
import { TrophyInput } from './dto/trophy.input'

@Resolver(() => Trophy)
@UseGuards(JwtAuthGuard)
export class TrophyResolver {
  constructor(
    private readonly trophyService: TrophyService,
   ) {}

  /** Queries */

  @Query(() => [Trophy])
  async trophies() {
    return this.trophyService.findAll()
  }

  @Query(() => Trophy)
  async trophy(@Args('id', { type: () => Int }) id: Trophy['id']) {
    return this.trophyService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => TrophyPayload)
  async trophyCreate(@Args('trophyInput') trophyInput: TrophyInput) {
    return this.trophyService.create(trophyInput)
  }

  @Mutation(() => TrophyPayload)
  async trophyUpdate(
    @Args('trophyID', { type: () => Int }) trophyID: Trophy['id'],
    @Args('trophyInput') trophyInput: TrophyInput
  ) {
    return this.trophyService.update(trophyID, trophyInput)
  }

  @Mutation(() => TrophyPayload)
  async trophyDelete(@Args('id', { type: () => Int }) id: Trophy['id']) {
    return this.trophyService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField()
  async festivalClasses(@Parent() trophy: Trophy) {
    const { id }: { id: Trophy['id'] } = trophy
    return this.trophyService.findTrophyClasses(id)
  }
}
