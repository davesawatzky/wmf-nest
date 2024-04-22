import { Module, forwardRef } from '@nestjs/common'
import { SchoolService } from './school.service'
import { SchoolResolver } from './school.resolver'
import { SchoolGroupModule } from '@/submissions/school-group/school-group.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { AbilityModule } from '@/ability/ability.module'

@Module({
  providers: [SchoolResolver, SchoolService],
  imports: [forwardRef(() => RegistrationModule), SchoolGroupModule, AbilityModule],
  exports: [SchoolService],
})
export class SchoolModule {}
