import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Registration } from '../registration/entities/registration.entity'
import { UseGuards } from '@nestjs/common'
import { SubmissionService } from '../submission/submission.service'
import { RegistrationPayload } from '../registration/entities/registration.entity'
import { SGSlabel } from 'src/common.entity'

@Resolver(() => Registration)
@UseGuards(JwtAuthGuard)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Query(() => [Registration])
  async submissions(
    @Args('performerType', { type: () => SGSlabel })
    performerType?: Registration['performerType'],
  ) {
    return this.submissionService.submissions(performerType)
  }

  @Mutation(() => RegistrationPayload)
  async submitRegistration(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
  ) {
    return this.submissionService.submit(registrationID)
  }
}