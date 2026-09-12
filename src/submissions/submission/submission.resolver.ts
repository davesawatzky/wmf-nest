import { BadRequestException, Logger, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { JwtAuthGuard } from '@/auth/jwt-auth.guard.js'
import { PerformerType } from '@/common.entity.js'
import { EmailConfirmationGuard } from '@/email-confirmation/email-confirmation.guard.js'
import { Registration } from '@/submissions/registration/entities/registration.entity.js'
import { SubmissionService } from '@/submissions/submission/submission.service.js'

import { SubmissionPayload } from './entities/submission.entity.js'

@Resolver(() => Registration)
@UseGuards(JwtAuthGuard)
export class SubmissionResolver {
  private readonly logger = new Logger(SubmissionResolver.name)

  constructor(private readonly submissionService: SubmissionService) {}

  @Query(() => [Registration])
  async submissions(
    @Args('performerType', { type: () => PerformerType })
    performerType?: Registration['performerType'],
  ) {
    this.logger.log(`Fetching submissions${performerType ? ` for performerType: ${performerType}` : ''}`)
    return await this.submissionService.submissions(performerType)
  }

  @Mutation(() => SubmissionPayload)
  @UseGuards(EmailConfirmationGuard)
  async submitRegistration(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id'],
  ) {
    // ✅ Defensive check - ensure registrationID is provided
    if (!registrationID) {
      this.logger.error('submitRegistration mutation failed - registrationID is required')
      throw new BadRequestException('Registration ID is required')
    }

    this.logger.log(`Submitting registration ID: ${registrationID}`)
    return await this.submissionService.submit(registrationID)
  }
}
