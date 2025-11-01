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
import { tbl_instrument } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { DisciplineService } from '@/festival/discipline/discipline.service'
import { Discipline } from '@/festival/discipline/entities/discipline.entity'
import { InstrumentInput } from './dto/instrument.input'
import { Instrument, InstrumentPayload } from './entities/instrument.entity'
import { InstrumentService } from './instrument.service'

@Resolver(() => Instrument)
export class InstrumentResolver {
  private readonly logger = new Logger(InstrumentResolver.name)

  constructor(
    private readonly instrumentService: InstrumentService,
    private readonly disciplineService: DisciplineService,
  ) {}

  /** Queries */

  @Query(() => [Instrument])
  @CheckAbilities({ action: Action.Read, subject: Instrument })
  async instruments(
    @Args('disciplineID', { type: () => Int, nullable: true })
    disciplineID: Discipline['id'] | null,
  ) {
    this.logger.log(
      `Fetching instruments${disciplineID ? ` for discipline ID: ${disciplineID}` : ' (all)'}`,
    )
    return await this.instrumentService.findAll(disciplineID)
  }

  @Query(() => Instrument)
  @CheckAbilities({ action: Action.Read, subject: Instrument })
  async instrument(
    @Args('id', { type: () => Int, nullable: true })
    id: Instrument['id'] | null,
    @Args('name', { type: () => String, nullable: true })
    name: Instrument['name'] | null,
  ) {
    this.logger.log(
      `Fetching instrument${id ? ` by ID: ${id}` : ` by name: ${name}`}`,
    )
    return await this.instrumentService.findOne(id, name)
  }

  /** Mutations */

  @Mutation(() => InstrumentPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Instrument })
  @UseGuards(JwtAuthGuard)
  async instrumentCreate(
    @Args('instrumentInput') instrumentInput: InstrumentInput,
  ) {
    this.logger.log(`Creating instrument: ${instrumentInput.name}`)
    return await this.instrumentService.create(instrumentInput)
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
    this.logger.log(`Updating instrument ID: ${instrumentID}`)
    return await this.instrumentService.update(instrumentID, instrumentInput)
  }

  @Mutation(() => InstrumentPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Instrument })
  @UseGuards(JwtAuthGuard)
  async instrumentDelete(
    @Args('instrumentID', { type: () => Int }) instrumentID: Instrument['id'],
  ) {
    this.logger.log(`Deleting instrument ID: ${instrumentID}`)
    return await this.instrumentService.remove(instrumentID)
  }

  /** Field Resolver */

  @ResolveField(() => Discipline)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Discipline })
  @UseGuards(JwtAuthGuard)
  async discipline(@Parent() instrument: tbl_instrument) {
    if (!instrument?.disciplineID) {
      this.logger.error('discipline field resolver failed - Invalid instrument or missing disciplineID')
      return null
    }
    this.logger.debug(`Fetching discipline for instrument ID: ${instrument.id}`)
    const { disciplineID }: { disciplineID: tbl_instrument['disciplineID'] }
      = instrument
    return await this.disciplineService.findOne(disciplineID)
  }
}
