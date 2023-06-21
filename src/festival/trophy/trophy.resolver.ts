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
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { TrophyService } from './trophy.service'
import { Trophy, TrophyPayload } from './entities/trophy.entity'
import { TrophyInput } from './dto/trophy.input'

@Resolver(() => Trophy)
@UseGuards(JwtAuthGuard)
export class TrophyResolver {
  constructor(private readonly trophyService: TrophyService) {}

  /** Queries */

  @Query(() => [Trophy])
  async trophies() {
    return await this.trophyService.findAll()
  }

  @Query(() => Trophy)
  async trophy(@Args('id', { type: () => Int }) id: Trophy['id']) {
    return await this.trophyService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => TrophyPayload)
  async trophyCreate(@Args('trophyInput') trophyInput: TrophyInput) {
    return await this.trophyService.create(trophyInput)
  }

  @Mutation(() => TrophyPayload)
  async trophyUpdate(
    @Args('trophyID', { type: () => Int }) trophyID: Trophy['id'],
    @Args('trophyInput') trophyInput: TrophyInput
  ) {
    return await this.trophyService.update(trophyID, trophyInput)
  }

  @Mutation(() => TrophyPayload)
  async trophyDelete(@Args('id', { type: () => Int }) id: Trophy['id']) {
    return await this.trophyService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField()
  async festivalClasses(@Parent() trophy: Trophy) {
    const { id }: { id: Trophy['id'] } = trophy
    return await this.trophyService.findTrophyClasses(id)
  }
}
