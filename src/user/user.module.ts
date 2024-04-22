import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { AbilityModule } from '@/ability/ability.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'

@Module({
  providers: [UserResolver, UserService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
  exports: [UserService],
})
export class UserModule {}
