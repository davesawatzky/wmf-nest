import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { InstrumentService } from './instrument.service'
import { CreateInstrumentInput } from './dto/create-instrument.input'
import { UpdateInstrumentInput } from './dto/update-instrument.input'

@Resolver('Instrument')
export class InstrumentResolver {
  constructor(private readonly instrumentService: InstrumentService) {}

  /** Queries */

  @Query('instrument')
  findAll() {
    return this.instrumentService.findAll()
  }

  @Query('instrument')
  findOne(@Args('id') id: number) {
    return this.instrumentService.findOne(id)
  }

  /** Mutations */

  @Mutation('instrumentCreate')
  create(
    @Args('createInstrumentInput') createInstrumentInput: CreateInstrumentInput,
  ) {
    return this.instrumentService.create(createInstrumentInput)
  }

  @Mutation('instrumentUpdate')
  update(
    @Args('updateInstrumentInput') updateInstrumentInput: UpdateInstrumentInput,
  ) {
    return this.instrumentService.update(
      updateInstrumentInput.id,
      updateInstrumentInput,
    )
  }

  @Mutation('instrumentDelete')
  remove(@Args('id') id: number) {
    return this.instrumentService.remove(id)
  }
}
