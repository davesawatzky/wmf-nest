import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserInput, User } from 'src/graphql'
import { tbl_user, tbl_registration } from '@prisma/client'
import { RegistrationService } from 'src/submissions/registration/registration.service'
// import { CreateUserInput } from './dto/create-user.input'
// import { UpdateUserInput } from './dto/update-user.input'

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly registrationService: RegistrationService,
  ) {}

  /** Queries */

  @Query('users')
  findAll() {
    return this.userService.findAll()
  }

  @Query('user')
  findOne(@Args('id') id: tbl_user['id']) {
    return this.userService.findOne(id)
  }

  /** Mutations */

  @Mutation('userUpdate')
  update(
    @Args('id') id: tbl_user['id'],
    @Args('userInput') userInput: UserInput,
  ) {
    return this.userService.update(id, userInput)
  }

  @Mutation('userDelete')
  remove(@Args('id') id: tbl_user['id']) {
    return this.userService.remove(id)
  }

  /** Field Resolvers */

  @ResolveField('registrations')
  findRegistrations(@Parent() user: tbl_user) {
    return this.registrationService.findAll(user.id)
  }
}
