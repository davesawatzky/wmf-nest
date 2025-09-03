import { Module } from '@nestjs/common'
import { CommunityModule } from '@/submissions/community/community.module'
import { GroupModule } from '@/submissions/group/group.module'
import { PerformerModule } from '@/submissions/performer/performer.module'
import { RegisteredClassModule } from '@/submissions/registered-class/registered-class.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { SchoolGroupModule } from '@/submissions/school-group/school-group.module'
import { SchoolModule } from '@/submissions/school/school.module'
import { SelectionModule } from '@/submissions/selection/selection.module'
import { TeacherModule } from '@/submissions/teacher/teacher.module'
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
    SchoolGroupModule,
    SelectionModule,
    TeacherModule,
  ],
  exports: [SubmissionService],
})
export class SubmissionModule {}
