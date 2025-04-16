import { AbilityModule } from '@/ability/ability.module'
import { SearchFiltersModule } from '@/common/search-filters'
import { CommunityModule } from '@/submissions/community/community.module'
import { GroupModule } from '@/submissions/group/group.module'
import { PerformerModule } from '@/submissions/performer/performer.module'
import { RegisteredClassModule } from '@/submissions/registered-class/registered-class.module'
import { SchoolModule } from '@/submissions/school/school.module'
import { TeacherModule } from '@/submissions/teacher/teacher.module'
import { UserModule } from '@/user/user.module'
import { forwardRef, Module } from '@nestjs/common'
import { RegistrationResolver } from './registration.resolver'
import { RegistrationService } from './registration.service'

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
    SearchFiltersModule,
  ],
  exports: [RegistrationService],
})
export class RegistrationModule {}
