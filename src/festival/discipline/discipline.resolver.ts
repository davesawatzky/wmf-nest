import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { DisciplineService } from './discipline.service'
import { Discipline, DisciplinePayload } from './entities/discipline.entity'
import { SubdisciplineService } from '../subdiscipline/subdiscipline.service'
import { DisciplineInput } from './dto/discipline.input'
import { PerformerType } from '../../common.entity'
import { InstrumentService } from '../instrument/instrument.service'
import { Instrument } from '../instrument/entities/instrument.entity'
import { Subdiscipline } from '../subdiscipline/entities/subdiscipline.entity'
import { tbl_discipline } from '@prisma/client'

@Resolver(() => Discipline)
@UseGuards(JwtAuthGuard)
export class DisciplineResolver {
  constructor(
    private readonly disciplineService: DisciplineService,
    private readonly subdisciplineService: SubdisciplineService,
    private readonly instrumentService: InstrumentService
  ) {}

  /** Queries */

  @Query(() => [Discipline])
  async disciplines(
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType,
    @Args('instrument', { type: () => String, nullable: true })
    instrument: Instrument['name']
  ) {
    return await this.disciplineService.findAll(performerType, instrument)
  }

  @Query(() => Discipline)
  async discipline(@Args('id', { type: () => Int }) id: Discipline['id']) {
    return await this.disciplineService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => DisciplinePayload)
  async disciplineCreate(
    @Args('disciplineInput') disciplineInput: DisciplineInput
  ) {
    return this.disciplineService.create(disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  async disciplineUpdate(
    @Args('id', { type: () => Int }) id: Discipline['id'],
    @Args('disciplineInput') disciplineInput: DisciplineInput
  ) {
    return await this.disciplineService.update(id, disciplineInput)
  }

  @Mutation(() => DisciplinePayload)
  async disciplineDelete(
    @Args('id', { type: () => Int }) id: Discipline['id']
  ) {
    return await this.disciplineService.remove(id)
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => [Subdiscipline])
  async subdisciplines(
    @Parent() discipline: Discipline,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType
  ) {
    const { id } = discipline
    return await this.subdisciplineService.findAll(id, performerType)
  }

  @ResolveField(() => [Instrument])
  async instruments(@Parent() { id }: tbl_discipline) {
    const disciplineID = id
    return await this.instrumentService.findAll(disciplineID)
  }
}
