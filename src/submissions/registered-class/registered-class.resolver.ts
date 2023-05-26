import {
  Resolver,
  Parent,
  Query,
  Mutation,
  Args,
  ResolveField,
  Int,
} from '@nestjs/graphql'
import { tbl_registration, tbl_reg_classes } from '@prisma/client'
import { RegisteredClassService } from './registered-class.service'
import { RegisteredClassInput } from './dto/registered-class.input'
import { RegisteredClassPayload } from './entities/registered-class.entity'
import { SelectionService } from '../selection/selection.service'
import { RegisteredClass } from './entities/registered-class.entity'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Resolver(() => RegisteredClass)
@UseGuards(JwtAuthGuard)
export class RegisteredClassResolver {
  constructor(
    private readonly registeredClassService: RegisteredClassService,
    private readonly selectionService: SelectionService
  ) {}

  /** Queries */

  @Query(() => [RegisteredClass])
  async registeredClasses(
    @Args('registrationID', {type: () => Int })
    registrationID: tbl_registration['id']
  ) {
    return this.registeredClassService.findAll(registrationID)
  }

  @Query(() => RegisteredClass)
  async registeredClass(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id']
  ) {
    return this.registeredClassService.findOne(registeredClassID)
  }

  /** Mutations */

  @Mutation(() => RegisteredClassPayload)
  async registeredClassCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
  ) {
    return this.registeredClassService.create(registrationID)
  }

  @Mutation(() => RegisteredClassPayload)
  async registeredClassUpdate(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id'],
    @Args('registeredClassInput', { type: () => RegisteredClassInput })
    registeredClassInput: RegisteredClassInput
  ) {
    return this.registeredClassService.update(
      registeredClassID,
      registeredClassInput
    )
  }

  @Mutation(() => RegisteredClassPayload)
  async registeredClassDelete(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id']
  ) {
    return this.registeredClassService.remove(registeredClassID)
  }

  /** Field Resolvers */

  @ResolveField()
  async selections(@Parent() registeredClass: tbl_reg_classes) {
    const { id }: { id: RegisteredClass['id'] } = registeredClass
    const registeredClassID = id
    return this.selectionService.findAll(registeredClassID)
  }
}
