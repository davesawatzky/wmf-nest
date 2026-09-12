import { forwardRef, Module } from '@nestjs/common'

import { AbilityModule } from '@/ability/ability.module.js'
import { SchoolModule } from '@/submissions/school/school.module.js'

import { SchoolGroupResolver } from './school-group.resolver.js'
import { SchoolGroupService } from './school-group.service.js'

@Module({
  providers: [SchoolGroupResolver, SchoolGroupService],
  exports: [SchoolGroupService],
  imports: [forwardRef(() => SchoolModule), AbilityModule],
})
export class SchoolGroupModule {}
