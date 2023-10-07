import { Module, forwardRef } from '@nestjs/common'
import { TeacherService } from './teacher.service'
import { TeacherResolver } from './teacher.resolver'
import { RegistrationModule } from '../registration/registration.module'
import { UserModule } from '../../user/user.module'

@Module({
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
  imports: [forwardRef(() => RegistrationModule), forwardRef(() => UserModule)],
})
export class TeacherModule {}
