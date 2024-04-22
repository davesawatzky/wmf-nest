import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { SubmissionPayload } from './entities/submission.entity'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Registration } from '@/submissions/registration/entities/registration.entity'
import { SubmissionService } from '@/submissions/submission/submission.service'
import { PerformerType } from '@/common.entity'
import { EmailConfirmationGuard } from '@/email-confirmation/email-confirmation.guard'

@Resolver(() => Registration)
@UseGuards(JwtAuthGuard)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Query(() => [Registration])
  async submissions(
    @Args('performerType', { type: () => PerformerType })
    performerType?: Registration['performerType'],
  ) {
    return await this.submissionService.submissions(performerType)
  }

  @Mutation(() => SubmissionPayload)
  @UseGuards(EmailConfirmationGuard)
  async submitRegistration(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
  ) {
    return await this.submissionService.submit(registrationID)
  }
}
