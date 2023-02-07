import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { InstrumentService } from './instrument.service'
import { CreateInstrumentInput } from './dto/create-instrument.input'
import { UpdateInstrumentInput } from './dto/update-instrument.input'

@Resolver('Instrument')
export class InstrumentResolver {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Mutation('createInstrument')
  create(
    @Args('createInstrumentInput') createInstrumentInput: CreateInstrumentInput,
  ) {
    return this.instrumentService.create(createInstrumentInput)
  }

  @Query('instrument')
  findAll() {
    return this.instrumentService.findAll()
  }

  @Query('instrument')
  findOne(@Args('id') id: number) {
    return this.instrumentService.findOne(id)
  }

  @Mutation('updateInstrument')
  update(
    @Args('updateInstrumentInput') updateInstrumentInput: UpdateInstrumentInput,
  ) {
    return this.instrumentService.update(
      updateInstrumentInput.id,
      updateInstrumentInput,
    )
  }

  @Mutation('removeInstrument')
  remove(@Args('id') id: number) {
    return this.instrumentService.remove(id)
  }
}
