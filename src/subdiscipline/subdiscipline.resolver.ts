import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SubdisciplineService } from './subdiscipline.service'
import { CreateSubdisciplineInput } from './dto/create-subdiscipline.input'
import { UpdateSubdisciplineInput } from './dto/update-subdiscipline.input'

@Resolver('Subdiscipline')
export class SubdisciplineResolver {
  constructor(private readonly subdisciplineService: SubdisciplineService) {}

  @Mutation('createSubdiscipline')
  create(
    @Args('createSubdisciplineInput')
    createSubdisciplineInput: CreateSubdisciplineInput,
  ) {
    return this.subdisciplineService.create(createSubdisciplineInput)
  }

  @Query('subdiscipline')
  findAll() {
    return this.subdisciplineService.findAll()
  }

  @Query('subdiscipline')
  findOne(@Args('id') id: number) {
    return this.subdisciplineService.findOne(id)
  }

  @Mutation('updateSubdiscipline')
  update(
    @Args('updateSubdisciplineInput')
    updateSubdisciplineInput: UpdateSubdisciplineInput,
  ) {
    return this.subdisciplineService.update(
      updateSubdisciplineInput.id,
      updateSubdisciplineInput,
    )
  }

  @Mutation('removeSubdiscipline')
  remove(@Args('id') id: number) {
    return this.subdisciplineService.remove(id)
  }
}
