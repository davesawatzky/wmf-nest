import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { RegistrationModule } from 'src/submissions/registration/registration.module'

@Module({
  providers: [UserResolver, UserService],
  imports: [forwardRef(() => RegistrationModule)],
  exports: [UserService],
})
export class UserModule {}
