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
import { tbl_discipline } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PerformerType } from '@/common.entity'
import { Instrument } from '@/festival/instrument/entities/instrument.entity'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { DisciplineDataLoader } from './discipline.dataloader'
import { DisciplineService } from './discipline.service'
import { DisciplineInput } from './dto/discipline.input'
import { Discipline, DisciplinePayload } from './entities/discipline.entity'

@Resolver(() => Discipline)
@UseGuards(JwtAuthGuard)
export class DisciplineResolver {
  private readonly logger = new Logger(DisciplineResolver.name)

  constructor(
    private readonly disciplineService: DisciplineService,
    private readonly disciplineDataLoader: DisciplineDataLoader,
  ) {}

  /** Queries */

  @Query(() => [Discipline])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Discipline })
  async disciplines(
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
    @Args('instrument', { type: () => String, nullable: true })
    instrument: Instrument['name'] | null,
  ) {
    this.logger.log(
      `Fetching disciplines with filters - performerType: ${performerType}, instrument: ${instrument}`,
    )
    return await this.disciplineService.findAll(performerType, instrument)
  }

  @Query(() => Discipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Discipline })
  async discipline(@Args('id', { type: () => Int }) id: Discipline['id']) {
    this.logger.log(`Fetching discipline with ID: ${id}`)
    return await this.disciplineService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Discipline })
  async disciplineCreate(
    @Args('disciplineInput') disciplineInput: DisciplineInput,
  ) {
    this.logger.log(`Creating discipline: ${disciplineInput.name}`)
    return await this.disciplineService.create(disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Discipline })
  async disciplineUpdate(
    @Args('disciplineID', { type: () => Int }) disciplineID: Discipline['id'],
    @Args('disciplineInput') disciplineInput: DisciplineInput,
  ) {
    this.logger.log(`Updating discipline ID: ${disciplineID}`)
    return await this.disciplineService.update(disciplineID, disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Discipline })
  async disciplineDelete(
    @Args('disciplineID', { type: () => Int }) disciplineID: Discipline['id'],
  ) {
    this.logger.log(`Deleting discipline ID: ${disciplineID}`)
    return await this.disciplineService.remove(disciplineID)
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => [Subdiscipline])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subdiscipline })
  async subdisciplines(
    @Parent() discipline: Discipline,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
  ) {
    if (!discipline?.id) {
      this.logger.error('subdisciplines field resolver failed - Invalid discipline parent')
      return null
    }
    this.logger.debug(
      `Fetching subdisciplines for discipline ID: ${discipline.id} with performerType: ${performerType}`,
    )

    // Use DataLoader based on whether performerType filter is provided
    if (performerType) {
      const cacheKey = `${discipline.id}-${performerType}`
      return await this.disciplineDataLoader.subdisciplinesByPerformerTypeLoader.load(cacheKey)
    }
    else {
      return await this.disciplineDataLoader.subdisciplinesLoader.load(discipline.id)
    }
  }

  @ResolveField(() => [Instrument])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Instrument })
  async instruments(@Parent() discipline: tbl_discipline) {
    if (!discipline?.id) {
      this.logger.error('instruments field resolver failed - Invalid discipline parent')
      return null
    }
    // Use DataLoader to batch instrument queries
    return await this.disciplineDataLoader.instrumentsLoader.load(discipline.id)
  }
}
