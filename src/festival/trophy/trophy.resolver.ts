import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { TrophyService } from './trophy.service'
import { Trophy, TrophyPayload } from './entities/trophy.entity'
import { TrophyInput } from './dto/trophy.input'
import { FestivalClass } from '@/festival/festival-class/entities/festival-class.entity'
import {CheckAbilities} from '@/ability/abilities.decorator'
import {Action} from '@/ability/ability.factory'
import {AbilitiesGuard} from '@/ability/abilities.guard'

@Resolver(() => Trophy)
@UseGuards(JwtAuthGuard)
export class TrophyResolver {
  constructor(private readonly trophyService: TrophyService) {}

  /** Queries */

  @Query(() => [Trophy])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: Trophy})
  async trophies() {
    return await this.trophyService.findAll()
  }

  @Query(() => Trophy)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: Trophy})
  async trophy(@Args('id', {type: () => Int}) id: Trophy['id']) {
    return await this.trophyService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => TrophyPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Create, subject: Trophy})
  async trophyCreate(@Args('trophyInput') trophyInput: TrophyInput) {
    let response:any
    try {
      response = await this.trophyService.create(trophyInput)
    } catch (error) {
      throw new HttpException('Could not create trophy', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => TrophyPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Update, subject: Trophy})
  async trophyUpdate(
    @Args('trophyID', {type: () => Int}) trophyID: Trophy['id'],
    @Args('trophyInput') trophyInput: TrophyInput
  ) {
    let response: any
    try {
      response = await this.trophyService.update(trophyID, trophyInput)
    } catch (error) {
      throw new HttpException('Trophy to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => TrophyPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Delete, subject: Trophy})
  async trophyDelete(@Args('trophyID', {type: () => Int}) trophyID: Trophy['id']) {
    let response: any
    try {
      response = await this.trophyService.remove(trophyID)
    } catch (error) {
      throw new HttpException('Trophy to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  /** Field Resolvers */

  @ResolveField(() => [FestivalClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: FestivalClass})
  async festivalClasses(@Parent() trophy: Trophy) {
    const { id }: { id: Trophy['id'] } = trophy
    return await this.trophyService.findTrophyClasses(id)
  }
}
