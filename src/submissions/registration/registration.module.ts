import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
// import { SearchFiltersModule } from '@/common/search-filters.js'
import { CommunityModule } from '@/submissions/community/community.module.js'
import { GroupModule } from '@/submissions/group/group.module.js'
import { PerformerModule } from '@/submissions/performer/performer.module.js'
import { RegisteredClassModule } from '@/submissions/registered-class/registered-class.module.js'
import { SchoolModule } from '@/submissions/school/school.module.js'
import { TeacherModule } from '@/submissions/teacher/teacher.module.js'
import { UserModule } from '@/user/user.module.js'

import { RegistrationDataLoader } from './registration.dataloader.js'
import { RegistrationResolver } from './registration.resolver.js'
import { RegistrationService } from './registration.service.js'

@Module({
  providers: [RegistrationResolver, RegistrationService, RegistrationDataLoader],
  imports: [
    forwardRef(() => UserModule),
    PerformerModule,
    RegisteredClassModule,
    GroupModule,
    CommunityModule,
    forwardRef(() => TeacherModule),
    SchoolModule,
    AbilityModule,
    // SearchFiltersModule,
  ],
  exports: [RegistrationService],
})
export class RegistrationModule {}
