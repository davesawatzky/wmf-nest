import { Module, forwardRef } from '@nestjs/common'
import { SchoolGroupService } from './school-group.service'
import { SchoolGroupResolver } from './school-group.resolver'
import {AbilityModule} from '@/ability/ability.module'
import {SchoolModule} from '../school/school.module'

@Module({
  providers: [SchoolGroupResolver, SchoolGroupService],
  exports: [SchoolGroupService],
  imports: [forwardRef(() => SchoolModule), AbilityModule]
})
export class SchoolGroupModule {}
