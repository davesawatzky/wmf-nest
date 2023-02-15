import { Module, forwardRef } from '@nestjs/common'
import { RegistrationService } from './registration.service'
import { RegistrationResolver } from './registration.resolver'
import { UserModule } from 'src/user/user.module'
import { PerformerModule } from '../performer/performer.module'
import { RegisteredClassModule } from '../registered-class/registered-class.module'
import { GroupModule } from '../group/group.module'
import { CommunityModule } from '../community/community.module'
import { TeacherModule } from '../teacher/teacher.module'
import { SchoolModule } from '../school/school.module'

@Module({
  providers: [RegistrationResolver, RegistrationService],
  imports: [
    forwardRef(() => UserModule),
    PerformerModule,
    RegisteredClassModule,
    GroupModule,
    CommunityModule,
    TeacherModule,
    SchoolModule,
  ],
  exports: [RegistrationService],
})
export class RegistrationModule {}
