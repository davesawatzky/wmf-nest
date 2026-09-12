import { Module } from '@nestjs/common'

import { CommunityModule } from '@/submissions/community/community.module.js'
import { GroupModule } from '@/submissions/group/group.module.js'
import { PerformerModule } from '@/submissions/performer/performer.module.js'
import { RegisteredClassModule } from '@/submissions/registered-class/registered-class.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'
import { SchoolGroupModule } from '@/submissions/school-group/school-group.module.js'
import { SchoolModule } from '@/submissions/school/school.module.js'
import { SelectionModule } from '@/submissions/selection/selection.module.js'
import { TeacherModule } from '@/submissions/teacher/teacher.module.js'

import { SubmissionResolver } from './submission.resolver.js'
import { SubmissionService } from './submission.service.js'

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
