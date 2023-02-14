import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RegisteredClassService } from './registered-class.service'
import { CreateRegisteredClassInput } from './dto/create-registered-class.input'
import { UpdateRegisteredClassInput } from './dto/update-registered-class.input'

@Resolver('RegisteredClass')
export class RegisteredClassResolver {
  constructor(
    private readonly registeredClassService: RegisteredClassService,
  ) {}

  @Mutation('createRegisteredClass')
  create(
    @Args('createRegisteredClassInput')
    createRegisteredClassInput: CreateRegisteredClassInput,
  ) {
    return this.registeredClassService.create(createRegisteredClassInput)
  }

  @Query('registeredClass')
  findAll() {
    return this.registeredClassService.findAll()
  }

  @Query('registeredClass')
  findOne(@Args('id') id: number) {
    return this.registeredClassService.findOne(id)
  }

  @Mutation('updateRegisteredClass')
  update(
    @Args('updateRegisteredClassInput')
    updateRegisteredClassInput: UpdateRegisteredClassInput,
  ) {
    return this.registeredClassService.update(
      updateRegisteredClassInput.id,
      updateRegisteredClassInput,
    )
  }

  @Mutation('removeRegisteredClass')
  remove(@Args('id') id: number) {
    return this.registeredClassService.remove(id)
  }
}
