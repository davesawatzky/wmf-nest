import { AbilityModule } from '@/ability/ability.module'
import { RegistrationModule } from '@/submissions/registration/registration.module'
import { forwardRef, Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [UserResolver, UserService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
  exports: [UserService],
})
export class UserModule {}
