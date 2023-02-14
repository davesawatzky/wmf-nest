import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RegistrationService } from './registration.service'
import { RegistrationInput, Registration } from 'src/graphql'
// import { CreateRegistrationInput } from './dto/create-registration.input';
// import { UpdateRegistrationInput } from './dto/update-registration.input';

@Resolver('Registration')
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation('registrationCreate')
  create(
    @Args('performerType') performerType: Registration['performerType'],
    @Args('label') label: Registration['label'],
  ) {
    return this.registrationService.create(performerType, label)
  }

  @Query('registrations')
  findAll() {
    return this.registrationService.findAll()
  }

  @Query('registration')
  findOne(@Args('id') id: number) {
    return this.registrationService.findOne(id)
  }

  @Mutation('registrationUpdate')
  update(
    @Args('registrationID') registrationID: Registration['id'],
    @Args('registration') registration: RegistrationInput,
  ) {
    return this.registrationService.update(registrationID, registration)
  }

  @Mutation('registrationDelete')
  remove(@Args('id') id: number) {
    return this.registrationService.remove(id)
  }
}
