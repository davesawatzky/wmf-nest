import { Module } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupResolver } from './group.resolver'

@Module({
  providers: [GroupResolver, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
