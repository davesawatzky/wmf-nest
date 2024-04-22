import { Module, forwardRef } from '@nestjs/common'
import { RegistrationResolver } from './registration.resolver'
import { RegistrationService } from './registration.service'
import { UserModule } from '@/user/user.module'
import { PerformerModule } from '@/submissions/performer/performer.module'
import { RegisteredClassModule } from '@/submissions/registered-class/registered-class.module'
import { GroupModule } from '@/submissions/group/group.module'
import { CommunityModule } from '@/submissions/community/community.module'
import { TeacherModule } from '@/submissions/teacher/teacher.module'
import { SchoolModule } from '@/submissions/school/school.module'
import { AbilityModule } from '@/ability/ability.module'

@Module({
  providers: [RegistrationResolver, RegistrationService],
  imports: [
    forwardRef(() => UserModule),
    PerformerModule,
    RegisteredClassModule,
    GroupModule,
    CommunityModule,
    forwardRef(() => TeacherModule),
    SchoolModule,
    AbilityModule,
  ],
  exports: [RegistrationService],
})
export class RegistrationModule {}
