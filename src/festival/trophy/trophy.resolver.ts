import { BadRequestException, Logger, UseGuards } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import { TrophyInput } from './dto/trophy.input'
import { Trophy, TrophyPayload } from './entities/trophy.entity'
import { TrophyService } from './trophy.service'

@Resolver(() => Trophy)
@UseGuards(JwtAuthGuard)
export class TrophyResolver {
  private readonly logger = new Logger(TrophyResolver.name)

  constructor(private readonly trophyService: TrophyService) {}

  /** Queries */

  @Query(() => [Trophy])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Trophy })
  async trophies() {
    this.logger.log('Fetching all trophies')
    return await this.trophyService.findAll()
  }

  @Query(() => Trophy)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Trophy })
  async trophy(@Args('id', { type: () => Int }) id: Trophy['id']) {
    this.logger.log(`Fetching trophy with ID: ${id}`)
    return await this.trophyService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => TrophyPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Trophy })
  async trophyCreate(@Args('trophyInput') trophyInput: TrophyInput) {
    this.logger.log(`Creating trophy: ${trophyInput.name}`)
    return await this.trophyService.create(trophyInput)
  }

  @Mutation(() => TrophyPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Trophy })
  async trophyUpdate(
    @Args('trophyID', { type: () => Int }) trophyID: Trophy['id'],
    @Args('trophyInput') trophyInput: TrophyInput,
  ) {
    this.logger.log(`Updating trophy ID: ${trophyID}`)
    return await this.trophyService.update(trophyID, trophyInput)
  }

  @Mutation(() => TrophyPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Trophy })
  async trophyDelete(
    @Args('trophyID', { type: () => Int }) trophyID: Trophy['id'],
  ) {
    this.logger.log(`Deleting trophy ID: ${trophyID}`)
    return await this.trophyService.remove(trophyID)
  }

  /** Field Resolvers */

  @ResolveField(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FestivalClass })
  async festivalClasses(@Parent() trophy: Trophy) {
    if (!trophy?.id) {
      this.logger.error('festivalClasses field resolver failed - Invalid trophy parent')
      return null
    }
    this.logger.debug(`Fetching festival classes for trophy ID: ${trophy.id}`)
    const { id }: { id: Trophy['id'] } = trophy
    return await this.trophyService.findTrophyClasses(id)
  }
}
