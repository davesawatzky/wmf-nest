import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Registration } from '../registration/entities/registration.entity'
import { UseGuards } from '@nestjs/common'
import { SubmissionService } from '../submission/submission.service'
import { SubmissionPayload } from './entities/submission.entity'
import { PerformerType } from '../../common.entity'
import { EmailConfirmationGuard } from 'src/email-confirmation/email-confirmation.guard'

@Resolver(() => Registration)
@UseGuards(JwtAuthGuard)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Query(() => [Registration])
  async submissions(
    @Args('performerType', { type: () => PerformerType })
    performerType?: Registration['performerType']
  ) {
    return await this.submissionService.submissions(performerType)
  }

  @Mutation(() => SubmissionPayload)
  @UseGuards(EmailConfirmationGuard)
  async submitRegistration(
    @Args('registrationID', { type: () => Int })
    registrationID: Registration['id']
  ) {
    return await this.submissionService.submit(registrationID)
  }
}
