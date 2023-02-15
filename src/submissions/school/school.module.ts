import { Module } from '@nestjs/common'
import { SchoolService } from './school.service'
import { CommunityModule } from '../community/community.module'
import { SchoolResolver } from './school.resolver'

@Module({
  providers: [SchoolResolver, SchoolService],
  imports: [CommunityModule],
  exports: [SchoolService],
})
export class SchoolModule {}
