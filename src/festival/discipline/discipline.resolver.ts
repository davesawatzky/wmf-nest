import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
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
import { InstrumentService } from '@/festival/instrument/instrument.service'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service'
import { DisciplineService } from './discipline.service'
import { DisciplineInput } from './dto/discipline.input'
import { Discipline, DisciplinePayload } from './entities/discipline.entity'

@Resolver(() => Discipline)
@UseGuards(JwtAuthGuard)
export class DisciplineResolver {
  constructor(
    private readonly disciplineService: DisciplineService,
    private readonly subdisciplineService: SubdisciplineService,
    private readonly instrumentService: InstrumentService,
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
    return await this.disciplineService.findAll(performerType, instrument)
  }

  @Query(() => Discipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Discipline })
  async discipline(@Args('id', { type: () => Int }) id: Discipline['id']) {
    return await this.disciplineService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Discipline })
  async disciplineCreate(
    @Args('disciplineInput') disciplineInput: DisciplineInput,
  ) {
    return await this.disciplineService.create(disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Discipline })
  async disciplineUpdate(
    @Args('disciplineID', { type: () => Int }) disciplineID: Discipline['id'],
    @Args('disciplineInput') disciplineInput: DisciplineInput,
  ) {
    return await this.disciplineService.update(disciplineID, disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Discipline })
  async disciplineDelete(
    @Args('disciplineID', { type: () => Int }) disciplineID: Discipline['id'],
  ) {
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
    const { id } = discipline
    return await this.subdisciplineService.findAll(id, performerType)
  }

  @ResolveField(() => [Instrument])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Instrument })
  async instruments(@Parent() { id }: tbl_discipline) {
    const disciplineID = id
    return await this.instrumentService.findAll(disciplineID)
  }
}
