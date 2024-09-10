import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { DisciplineService } from '@/festival/discipline/discipline.service'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
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
import { tbl_instruments } from '@prisma/client'
import { InstrumentInput } from './dto/instrument.input'
import { Instrument, InstrumentPayload } from './entities/instrument.entity'
import { InstrumentService } from './instrument.service'

@Resolver(() => Instrument)
export class InstrumentResolver {
  constructor(
    private readonly instrumentService: InstrumentService,
    private readonly disciplineService: DisciplineService,
  ) {}

  /** Queries */

  @Query(() => [Instrument])
  // @CheckAbilities({ action: Action.Read, subject: Instrument })
  async instruments(
    @Args('disciplineID', { type: () => Int, nullable: true }) disciplineID: Discipline['id'] | null,
  ) {
    return await this.instrumentService.findAll(disciplineID)
  }

  @Query(() => Instrument)
  // @CheckAbilities({ action: Action.Read, subject: Instrument })
  async instrument(
    @Args('id', { type: () => Int, nullable: true }) id: Instrument['id'] | null,
    @Args('name', { type: () => String, nullable: true })
    name: Instrument['name'] | null,
  ) {
    return await this.instrumentService.findOne(id, name)
  }

  /** Mutations */

  @Mutation(() => InstrumentPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Instrument })
  @UseGuards(JwtAuthGuard)
  async instrumentCreate(@Args('instrumentInput') instrumentInput: InstrumentInput) {
    let response: any
    try {
      response = await this.instrumentService.create(instrumentInput)
    }
    catch (error) {
      throw new HttpException('Could not create instrument', HttpStatus.INTERNAL_SERVER_ERROR, { cause: error })
    }
    return response
  }

  @Mutation(() => InstrumentPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Instrument })
  @UseGuards(JwtAuthGuard)
  async instrumentUpdate(
    @Args('instrumentID', { type: () => Int })
    instrumentID: Instrument['id'],
    @Args('instrumentInput') instrumentInput: InstrumentInput,
  ) {
    let response: any
    try {
      response = await this.instrumentService.update(instrumentID, instrumentInput)
    }
    catch (error) {
      throw new HttpException('Instrument to update not found', HttpStatus.BAD_REQUEST, { cause: error })
    }
    return response
  }

  @Mutation(() => InstrumentPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Instrument })
  @UseGuards(JwtAuthGuard)
  async instrumentDelete(
    @Args('instrumentID', { type: () => Int }) instrumentID: Instrument['id'],
  ) {
    let response: any
    try {
      response = await this.instrumentService.remove(instrumentID)
    }
    catch (error) {
      throw new HttpException('Instrument to delete not found', HttpStatus.BAD_REQUEST, { cause: error })
    }
    return response
  }

  /** Field Resolver */

  @ResolveField(() => Discipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Discipline })
  @UseGuards(JwtAuthGuard)
  async discipline(@Parent() instrument: tbl_instruments) {
    const { disciplineID }: { disciplineID: tbl_instruments['disciplineID'] }
      = instrument
    return await this.disciplineService.findOne(disciplineID)
  }
}
