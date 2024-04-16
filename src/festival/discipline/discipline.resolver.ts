import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { DisciplineService } from './discipline.service'
import { Discipline, DisciplinePayload } from './entities/discipline.entity'
import { SubdisciplineService } from '@/festival/subdiscipline/subdiscipline.service'
import { DisciplineInput } from './dto/discipline.input'
import { PerformerType } from '@/common.entity'
import { InstrumentService } from '@/festival/instrument/instrument.service'
import { Instrument } from '@/festival/instrument/entities/instrument.entity'
import { Subdiscipline } from '@/festival/subdiscipline/entities/subdiscipline.entity'
import { tbl_discipline } from '@prisma/client'
import {AbilitiesGuard} from '@/ability/abilities.guard'
import {CheckAbilities} from '@/ability/abilities.decorator'
import {Action} from '@/ability/ability.factory'
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
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: Discipline})
  async disciplines(
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null,
    @Args('instrument', { type: () => String, nullable: true })
    instrument: Instrument['name'] | null
  ) {
    return await this.disciplineService.findAll(performerType, instrument)
  }

  @Query(() => Discipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: Discipline})
  async discipline(@Args('id', { type: () => Int }) id: Discipline['id']) {
    return await this.disciplineService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Create, subject: Discipline})
  async disciplineCreate(
    @Args('disciplineInput') disciplineInput: DisciplineInput
  ) {
    let response: DisciplinePayload
    try{
      response = await this.disciplineService.create(disciplineInput)
    } catch(error) {
      throw new HttpException('Could not create discipline', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Update, subject: Discipline})
  async disciplineUpdate(
    @Args('disciplineID', { type: () => Int }) disciplineID: Discipline['id'],
    @Args('disciplineInput') disciplineInput: DisciplineInput
  ) {
    let response:DisciplinePayload
    try{
      response = await this.disciplineService.update(disciplineID, disciplineInput)
    } catch(error) {
      throw new HttpException('Discipline to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => DisciplinePayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Delete, subject: Discipline})
  async disciplineDelete(
    @Args('disciplineID', { type: () => Int }) disciplineID: Discipline['id']
  ) {
    let response: DisciplinePayload
    try{
      response = await this.disciplineService.remove(disciplineID)
    } catch (error) {
      throw new HttpException('Discipline to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  /**
   * Field Resolvers
   */
  @ResolveField(() => [Subdiscipline])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: Subdiscipline})
  async subdisciplines(
    @Parent() discipline: Discipline,
    @Args('performerType', { type: () => PerformerType, nullable: true })
    performerType: PerformerType | null ) {
    const { id } = discipline
    return await this.subdisciplineService.findAll(id, performerType)
  }

  @ResolveField(() => [Instrument])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({action: Action.Read, subject: Instrument})
  async instruments(@Parent() { id }: tbl_discipline) {
    const disciplineID = id
    return await this.instrumentService.findAll(disciplineID)
  }
}
