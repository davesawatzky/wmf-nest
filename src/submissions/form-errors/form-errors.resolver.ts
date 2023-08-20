import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { FormErrorsService } from './form-errors.service'
import { FormError } from './entities/form-error.entity'
import { FormErrorInput } from './dto/form-error.input'
import { UseGuards } from '@nestjs/common/decorators'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { tbl_registration } from '@prisma/client'

@Resolver(() => FormError)
@UseGuards(JwtAuthGuard)
export class FormErrorsResolver {
  constructor(private readonly formErrorsService: FormErrorsService) {}

  @Query(() => [FormError])
  async formErrors(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id']
  ) {
    return this.formErrorsService.findAll(registrationID)
  }

  @Query(() => FormError)
  async formError(
    @Args('formErrorID', { type: () => Int, nullable: true })
    formErrorID: FormError['id'],
    @Args('registrationID', { type: () => Int, nullable: true })
    registrationID: tbl_registration['id']
  ) {
    return this.formErrorsService.findOne(formErrorID, registrationID)
  }

  @Mutation(() => FormError)
  async formErrorCreate(
    @Args('registrationID', { type: () => Int })
    registrationID: tbl_registration['id'],
    @Args('formErrorInput', { type: () => FormErrorInput })
    formErrorInput: Partial<FormErrorInput>
  ) {
    return this.formErrorsService.create(registrationID, formErrorInput)
  }

  @Mutation(() => FormError)
  async formErrorUpdate(
    @Args('formErrorID', { type: () => Int }) formErrorID: FormError['id'],
    @Args('formErrorInput', { type: () => FormErrorInput })
    formErrorInput: Partial<FormErrorInput>
  ) {
    return this.formErrorsService.update(formErrorID, formErrorInput)
  }

  @Mutation(() => FormError)
  async formErrorDelete(
    @Args('formErrorID', { type: () => Int }) formErrorID: FormError['id']
  ) {
    return this.formErrorsService.remove(formErrorID)
  }
}
