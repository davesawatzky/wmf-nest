import { Module } from '@nestjs/common'
import { CommunityModule } from '../community/community.module'
import { GroupModule } from '../group/group.module'
import { PerformerModule } from '../performer/performer.module'
import { RegisteredClassModule } from '../registered-class/registered-class.module'
import { RegistrationModule } from '../registration/registration.module'
import { SchoolModule } from '../school/school.module'
import { SelectionModule } from '../selection/selection.module'
import { TeacherModule } from '../teacher/teacher.module'
import { SubmissionResolver } from './submission.resolver'
import { SubmissionService } from './submission.service'

@Module({
  providers: [SubmissionResolver, SubmissionService],
  imports: [
    RegistrationModule,
    CommunityModule,
    GroupModule,
    PerformerModule,
    RegistrationModule,
    RegisteredClassModule,
    SchoolModule,
    SelectionModule,
    TeacherModule,
  ],
  exports: [SubmissionService],
})
export class SubmissionModule {}
