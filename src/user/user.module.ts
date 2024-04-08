import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { AbilityModule } from '../ability/ability.module'

@Module({
  providers: [UserResolver, UserService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
  exports: [UserService],
})
export class UserModule {}
