import { Module } from '@nestjs/common'
import { SchoolService } from './school.service'
import { SchoolGroupModule } from '../school-group/school-group.module'
import { SchoolResolver } from './school.resolver'

@Module({
  providers: [SchoolResolver, SchoolService],
  imports: [SchoolGroupModule],
  exports: [SchoolService],
})
export class SchoolModule {}
