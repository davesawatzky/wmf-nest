import { forwardRef, Module } from '@nestjs/common'
import { AbilityModule } from '@/ability/ability.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { SchoolGroupModule } from '@/submissions/school-group/school-group.module'
import { SchoolResolver } from './school.resolver'
import { SchoolService } from './school.service'

@Module({
  providers: [SchoolResolver, SchoolService],
  imports: [
    forwardRef(() => RegistrationModule),
    SchoolGroupModule,
    AbilityModule,
  ],
  exports: [SchoolService],
})
export class SchoolModule {}
