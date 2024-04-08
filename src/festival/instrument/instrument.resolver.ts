import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Instrument, InstrumentPayload } from './entities/instrument.entity'
import { InstrumentInput } from './dto/instrument.input'
import { InstrumentService } from './instrument.service'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
import { DisciplineService } from '@/festival/discipline/discipline.service'
import { tbl_instruments } from '@prisma/client'

@Resolver(() => Instrument)
@UseGuards(JwtAuthGuard)
export class InstrumentResolver {
  constructor(
    private readonly instrumentService: InstrumentService,
    private readonly disciplineService: DisciplineService
  ) {}

  /** Queries */

  @Query(() => [Instrument])
  async instruments(
    @Args('disciplineID', {type: () => Int, nullable: true}) disciplineID: Discipline['id'] | null
  ) {
    return await this.instrumentService.findAll(disciplineID)
  }

  @Query(() => Instrument)
  async instrument(
    @Args('id', { type: () => Int, nullable: true }) id: Instrument['id'] | null,
    @Args('name', { type: () => String, nullable: true })
    name: Instrument['name'] | null
  ) {
    return await this.instrumentService.findOne(id, name)
  }

  /** Mutations */

  @Mutation(() => InstrumentPayload)
  async instrumentCreate(@Args('instrumentInput') instrumentInput: InstrumentInput) {
    let response: any
    try {
      response = await this.instrumentService.create(instrumentInput)
    } catch (error) {
      throw new HttpException('Could not create instrument', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return response
  }

  @Mutation(() => InstrumentPayload)
  async instrumentUpdate(
    @Args('instrumentID', {type: () => Int})
    instrumentID: Instrument['id'],
    @Args('instrumentInput') instrumentInput: InstrumentInput
  ) {
    let response: any
    try {
      response = await this.instrumentService.update(instrumentID, instrumentInput)
    } catch (error) {
      throw new HttpException('Instrument to update not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  @Mutation(() => InstrumentPayload)
  async instrumentDelete(
    @Args('instrumentID', { type: () => Int }) instrumentID: Instrument['id']
  ) {
    let response:any
    try {
      response = await this.instrumentService.remove(instrumentID)
    } catch (error) {
      throw new HttpException('Instrument to delete not found', HttpStatus.BAD_REQUEST)
    }
    return response
  }

  /** Field Resolver */

  @ResolveField(() => Discipline)
  async discipline(@Parent() instrument: tbl_instruments) {
    const { disciplineID }: { disciplineID: tbl_instruments['disciplineID'] } =
      instrument
    return await this.disciplineService.findOne(disciplineID)
  }
}
