import { Module } from '@nestjs/common'
import { RegistrationModule } from '../registration/registration.module'
import { SubmissionResolver } from './submission.resolver'
import { SubmissionService } from './submission.service'

@Module({
  providers: [SubmissionResolver],
  imports: [RegistrationModule],
  exports: [SubmissionService],
})
export class SubmissionModule {}
