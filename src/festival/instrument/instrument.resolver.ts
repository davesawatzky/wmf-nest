import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Instrument } from './entities/instrument.entity'
import { InstrumentPayload } from './entities/instrument.entity'
import { InstrumentInput } from './dto/instrument.input'
import { InstrumentService } from './instrument.service'
// import { CreateInstrumentInput } from './dto/create-instrument.input'
// import { UpdateInstrumentInput } from './dto/update-instrument.input'

@Resolver(() => Instrument)
export class InstrumentResolver {
  constructor(private readonly instrumentService: InstrumentService) {}

  /** Queries */

  @Query(() => [Instrument])
  async instruments() {
    return this.instrumentService.findAll()
  }

  @Query(() => Instrument)
  async instrument(@Args('id', { type: () => Int }) id: Instrument['id']) {
    return this.instrumentService.findOne(id)
  }

  /** Mutations */

  @Mutation(() => InstrumentPayload)
  async instrumentCreate(@Args('instrument') instrument: InstrumentInput) {
    return this.instrumentService.create(instrument)
  }

  @Mutation(() => InstrumentPayload)
  async instrumentUpdate(
    @Args('instrumentID', { type: () => Int })
    instrumentID: Instrument['id'],
    @Args('instrument') instrument: InstrumentInput,
  ) {
    return this.instrumentService.update(instrumentID, instrument)
  }

  @Mutation(() => InstrumentPayload)
  async instrumentDelete(
    @Args('id', { type: () => Int }) id: Instrument['id'],
  ) {
    return this.instrumentService.remove(id)
  }
}
