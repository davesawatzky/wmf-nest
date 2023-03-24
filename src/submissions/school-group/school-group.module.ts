import { Module } from '@nestjs/common'
import { SchoolGroupService } from './school-group.service'
import { SchoolGroupResolver } from './school-group.resolver'

@Module({
  providers: [SchoolGroupResolver, SchoolGroupService],
  exports: [SchoolGroupService],
})
export class SchoolGroupModule {}
