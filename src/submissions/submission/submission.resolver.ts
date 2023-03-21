import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Registration } from '../registration/entities/registration.entity'
import { UseGuards } from '@nestjs/common'
import { SubmissionService } from '../submission/submission.service'
import { SubmissionPayload } from './entities/submission.entity'
import { SGS_label } from 'src/common.entity'

@Resolver(() => Registration)
@UseGuards(JwtAuthGuard)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Query(() => [Registration])
  async submissions(
    @Args('performer_type', { type: () => SGS_label })
    performer_type?: Registration['performer_type'],
  ) {
    return this.submissionService.submissions(performer_type)
  }

  @Mutation(() => SubmissionPayload)
  async submitRegistration(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
  ) {
    return this.submissionService.submit(registrationID)
  }
}
