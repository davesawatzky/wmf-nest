import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { FestivalClassService } from './festival-class.service'
import {
  FestivalClass,
  FestivalClassInput,
  FestivalClassSearchArgs,
} from 'src/graphql'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SGSlabel } from 'src/graphql'
// import { CreateFestivalClassInput } from './dto/create-festival-class.input'
// import { UpdateFestivalClassInput } from './dto/update-festival-class.input'

@Resolver('FestivalClass')
export class FestivalClassResolver {
  constructor(private readonly festivalClassService: FestivalClassService) {}

  @Mutation('createFestivalClass')
  create(
    @Args('SGSlabel') SGSlabel: SGSlabel,
    @Args('festivalClassInput')
    festivalClassInput: Partial<FestivalClassInput>,
  ) {
    return this.festivalClassService.create(SGSlabel, festivalClassInput)
  }

  @Query('festivalClasses')
  findAllFestivalCLasses(@Args('SGSlabel') SGSlabel: SGSlabel) {
    return this.festivalClassService.findAll(SGSlabel)
  }

  @Query('festivalClassSearch')
  searchFestivalClass(
    @Args('festivalClassSearch')
    festivalClassSearch: FestivalClassSearchArgs,
  ) {
    return this.festivalClassService.searchFestivalClass(festivalClassSearch)
  }

  @Query('festivalClassById')
  findOneFestivalClass(@Args('id') id: number) {
    return this.festivalClassService.findOne(id)
  }

  @Mutation('updateFestivalClass')
  update(
    @Args('festivalClassID') festivalClassID: FestivalClass['id'],
    @Args('festivalClass') festivalClass: FestivalClassInput,
  ) {
    return this.festivalClassService.update(festivalClassID, festivalClass)
  }

  @Mutation('removeFestivalClass')
  remove(@Args('id') id: number) {
    return this.festivalClassService.remove(id)
  }
}
