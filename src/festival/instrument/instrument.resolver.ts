import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Instrument, InstrumentPayload } from './entities/instrument.entity'
import { InstrumentInput } from './dto/instrument.input'
import { InstrumentService } from './instrument.service'
import { Discipline } from '../discipline/entities/discipline.entity'
import { DisciplineService } from '../discipline/discipline.service'
import { tbl_instruments } from '@prisma/client'

@Resolver(() => Instrument)
export class InstrumentResolver {
  constructor(
    private readonly instrumentService: InstrumentService,
    private readonly disciplineService: DisciplineService
  ) {}

  /** Queries */

  @Query(() => [Instrument])
  async instruments() {
    return await this.instrumentService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Instrument)
  async instrument(
    @Args('id', { type: () => Int, nullable: true }) id: Instrument['id'],
    @Args('name', { type: () => String, nullable: true })
    name: Instrument['name']
  ) {
    return await this.instrumentService.findOne(id, name)
  }

  /** Mutations */

  @UseGuards(JwtAuthGuard)
  @Mutation(() => InstrumentPayload)
  async instrumentCreate(@Args('instrument') instrument: InstrumentInput) {
    return await this.instrumentService.create(instrument)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => InstrumentPayload)
  async instrumentUpdate(
    @Args('instrumentID', { type: () => Int })
    instrumentID: Instrument['id'],
    @Args('instrument') instrument: InstrumentInput
  ) {
    return await this.instrumentService.update(instrumentID, instrument)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => InstrumentPayload)
  async instrumentDelete(
    @Args('id', { type: () => Int }) id: Instrument['id']
  ) {
    return await this.instrumentService.remove(id)
  }

  /** Field Resolver */

  @UseGuards(JwtAuthGuard)
  @ResolveField(() => Discipline)
  async discipline(@Parent() instrument: tbl_instruments) {
    const { disciplineID }: { disciplineID: tbl_instruments['disciplineID'] } =
      instrument
    return await this.disciplineService.findOne(disciplineID)
  }
}
