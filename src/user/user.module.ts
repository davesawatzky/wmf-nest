import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { RegistrationModule } from '../submissions/registration/registration.module'
import { AbilityModule } from 'src/ability/ability.module'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Module({
  providers: [UserResolver, UserService],
  imports: [forwardRef(() => RegistrationModule), AbilityModule],
  exports: [UserService],
})
export class UserModule {}
