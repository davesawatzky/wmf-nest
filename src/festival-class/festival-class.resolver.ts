import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { FestivalClassService } from './festival-class.service'
import { CreateFestivalClassInput } from './dto/create-festival-class.input'
import { UpdateFestivalClassInput } from './dto/update-festival-class.input'

@Resolver('FestivalClass')
export class FestivalClassResolver {
  constructor(private readonly festivalClassService: FestivalClassService) {}

  @Mutation('createFestivalClass')
  create(
    @Args('createFestivalClassInput')
    createFestivalClassInput: CreateFestivalClassInput,
  ) {
    return this.festivalClassService.create(createFestivalClassInput)
  }

  @Query('festivalClass')
  findAll() {
    return this.festivalClassService.findAll()
  }

  @Query('festivalClass')
  findOne(@Args('id') id: number) {
    return this.festivalClassService.findOne(id)
  }

  @Mutation('updateFestivalClass')
  update(
    @Args('updateFestivalClassInput')
    updateFestivalClassInput: UpdateFestivalClassInput,
  ) {
    return this.festivalClassService.update(
      updateFestivalClassInput.id,
      updateFestivalClassInput,
    )
  }

  @Mutation('removeFestivalClass')
  remove(@Args('id') id: number) {
    return this.festivalClassService.remove(id)
  }
}
