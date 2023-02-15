import {
  Resolver,
  Parent,
  Query,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql'
import { tbl_registration, tbl_reg_classes } from '@prisma/client'
import { RegisteredClassService } from './registered-class.service'
import { RegisteredClassInput } from 'src/graphql'
import { SelectionService } from '../selection/selection.service'
// import { CreateRegisteredClassInput } from './dto/create-registered-class.input'
// import { UpdateRegisteredClassInput } from './dto/update-registered-class.input'

@Resolver('RegisteredClass')
export class RegisteredClassResolver {
  constructor(
    private readonly registeredClassService: RegisteredClassService,
    private readonly selectionService: SelectionService,
  ) {}

  /** Queries */

  @Query('registeredClasses')
  async findAll() {
    return this.registeredClassService.findAll()
  }

  @Query('registeredClass')
  async findOne(
    @Args('registeredClassID') registeredClassID: tbl_reg_classes['id'],
  ) {
    return this.registeredClassService.findOne(registeredClassID)
  }

  /** Mutations */

  @Mutation('registeredClassCreate')
  async create(
    @Args('registrationID') registrationID: tbl_registration['id'],
    @Args('registeredClassInput')
    registeredClassInput: Partial<RegisteredClassInput>,
  ) {
    return this.registeredClassService.create(
      registrationID,
      registeredClassInput,
    )
  }

  @Mutation('registeredClassUpdate')
  async update(
    @Args('registeredClassID') registeredClassID: tbl_reg_classes['id'],
    @Args('registeredClassInput')
    registeredClassInput: Partial<RegisteredClassInput>,
  ) {
    return this.registeredClassService.update(
      registeredClassID,
      registeredClassInput,
    )
  }

  @Mutation('registeredClassDelete')
  async remove(
    @Args('registeredClassID') registeredClassID: tbl_reg_classes['id'],
  ) {
    return this.registeredClassService.remove(registeredClassID)
  }

  /** Field Resolvers */

  @ResolveField('selections')
  async selections(@Parent() registeredClass: tbl_reg_classes) {
    const { id }: { id: tbl_reg_classes['id'] } = registeredClass
    const registeredClassID = id
    return this.selectionService.findAll(registeredClassID)
  }
}
