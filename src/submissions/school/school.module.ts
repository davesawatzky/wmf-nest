import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { RegistrationModule } from '@/submissions/registration/registration.module.js'
import { SchoolGroupModule } from '@/submissions/school-group/school-group.module.js'

import { SchoolDataLoader } from './school.dataloader.js'
import { SchoolResolver } from './school.resolver.js'
import { SchoolService } from './school.service.js'

@Module({
  providers: [SchoolResolver, SchoolService, SchoolDataLoader],
  imports: [forwardRef(() => RegistrationModule), SchoolGroupModule, AbilityModule],
  exports: [SchoolService],
})
export class SchoolModule {}
