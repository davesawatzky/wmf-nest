import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserInput, User } from 'src/graphql'
// import { CreateUserInput } from './dto/create-user.input'
// import { UpdateUserInput } from './dto/update-user.input'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  findAll() {
    return this.userService.findAll()
  }

  @Query('user')
  findOne(@Args('id') id: User['id']) {
    return this.userService.findOne(id)
  }

  @Mutation('updateUser')
  update(@Args('id') id: User['id'], @Args('userInput') userInput: UserInput) {
    return this.userService.update(id, userInput)
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id)
  }
}
