import { AbilityModule } from '@/ability/ability.module'
import { SchoolModule } from '@/submissions/school/school.module'
import { forwardRef, Module } from '@nestjs/common'
import { SchoolGroupResolver } from './school-group.resolver'
import { SchoolGroupService } from './school-group.service'

@Module({
  providers: [SchoolGroupResolver, SchoolGroupService],
  exports: [SchoolGroupService],
  imports: [forwardRef(() => SchoolModule), AbilityModule],
})
export class SchoolGroupModule {}
