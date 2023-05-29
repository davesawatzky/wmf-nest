import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Instrument, InstrumentPayload } from './entities/instrument.entity'
import { InstrumentInput } from './dto/instrument.input'
import { InstrumentService } from './instrument.service'

@Resolver(() => Instrument)
@UseGuards(JwtAuthGuard)
export class InstrumentResolver {
  constructor(private readonly instrumentService: InstrumentService) {}

  /** Queries */

  @Query(() => [Instrument])
  async instruments() {
    return await this.instrumentService.findAll()
  }

  @Query(() => Instrument)
  async instrument(@Args('id', { type: () => Int }) id: Instrument['id']) {
    return await this.instrumentService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => InstrumentPayload)
  async instrumentCreate(@Args('instrument') instrument: InstrumentInput) {
    return await this.instrumentService.create(instrument)
  }

  @Mutation(() => InstrumentPayload)
  async instrumentUpdate(
    @Args('instrumentID', { type: () => Int })
    instrumentID: Instrument['id'],
    @Args('instrument') instrument: InstrumentInput
  ) {
    return await this.instrumentService.update(instrumentID, instrument)
  }

  @Mutation(() => InstrumentPayload)
  async instrumentDelete(
    @Args('id', { type: () => Int }) id: Instrument['id']
  ) {
    return await this.instrumentService.remove(id)
  }
}
