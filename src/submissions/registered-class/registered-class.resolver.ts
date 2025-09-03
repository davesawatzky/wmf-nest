import { UseGuards } from '@nestjs/common/decorators'
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { tbl_reg_class, tbl_registration } from '@prisma/client'
import { CheckAbilities } from '@/ability/abilities.decorator'
import { AbilitiesGuard } from '@/ability/abilities.guard'
import { Action } from '@/ability/ability.factory'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Performer } from '@/submissions/performer/entities/performer.entity'
import { Selection } from '@/submissions/selection/entities/selection.entity'
import { SelectionService } from '@/submissions/selection/selection.service'
import { PerformerService } from '../performer/performer.service'
import { RegisteredClassInput } from './dto/registered-class.input'
import { RegisteredClass, RegisteredClassPayload } from './entities/registered-class.entity'
import { RegisteredClassService } from './registered-class.service'

@Resolver(() => RegisteredClass)
@UseGuards(JwtAuthGuard)
export class RegisteredClassResolver {
  constructor(
    private readonly registeredClassService: RegisteredClassService,
    private readonly selectionService: SelectionService,
    private readonly performerService: PerformerService,
  ) {}

  /** Queries */

  @Query(() => [RegisteredClass])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Manage, subject: RegisteredClass })
  async registeredClasses(
    @Context() context,
    @Args('registrationID', { nullable: true, type: () => Int }) registrationID: tbl_registration['id'] | null,
  ) {
    return await this.registeredClassService.findAll(
      context.req.user.admin ? null : registrationID,
    )
  }

  @Query(() => RegisteredClass)
  async registeredClass(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id'],
  ) {
    return await this.registeredClassService.findOne(registeredClassID)
  }

  /** Mutations */

  @Mutation(() => RegisteredClassPayload)
  async registeredClassCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('registeredClass', {
      type: () => RegisteredClassInput,
      nullable: true,
    })
    registeredClass: Partial<RegisteredClassInput> | null,
  ) {
    return await this.registeredClassService.create(
      registrationID,
      registeredClass,
    )
  }

  @Mutation(() => RegisteredClassPayload)
  async registeredClassUpdate(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id'],
    @Args('registeredClassInput', { type: () => RegisteredClassInput })
    registeredClassInput: Partial<RegisteredClassInput>,
  ) {
    return await this.registeredClassService.update(
      registeredClassID,
      registeredClassInput,
    )
  }

  @Mutation(() => RegisteredClassPayload)
  async registeredClassDelete(
    @Args('registeredClassID', { type: () => Int })
    registeredClassID: RegisteredClass['id'],
  ) {
    return await this.registeredClassService.remove(registeredClassID)
  }

  /** Field Resolvers */

  @ResolveField(() => [Selection])
  async selections(@Parent() registeredClass: tbl_reg_class) {
    const { id }: { id: RegisteredClass['id'] } = registeredClass
    const registeredClassID = id
    return await this.selectionService.findAll(registeredClassID)
  }

  @ResolveField(() => [Performer])
  async performers(@Parent() registeredClass: tbl_reg_class) {
    const { classNumber }: { classNumber: RegisteredClass['classNumber'] } = registeredClass
    if (!classNumber) {
      return []
    }
    else {
      const registeredClassNumber = classNumber
      return await this.performerService.findAll(null, registeredClassNumber)
    }
  }
}
