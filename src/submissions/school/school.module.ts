import { Module, forwardRef } from '@nestjs/common'
import { SchoolService } from './school.service'
import { SchoolGroupModule } from '../school-group/school-group.module'
import { SchoolResolver } from './school.resolver'
import {RegistrationModule} from '../registration/registration.module'
import {AbilityModule} from '@/ability/ability.module'

@Module({
  providers: [SchoolResolver, SchoolService],
  imports: [forwardRef(() => RegistrationModule),SchoolGroupModule, AbilityModule],
  exports: [SchoolService],
})
export class SchoolModule {}
