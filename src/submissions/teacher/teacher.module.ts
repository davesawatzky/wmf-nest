import { Module, forwardRef } from '@nestjs/common'
import { TeacherService } from './teacher.service'
import { TeacherResolver } from './teacher.resolver'
import { RegistrationModule } from '../registration/registration.module'

@Module({
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
  imports: [forwardRef(() => RegistrationModule)],
})
export class TeacherModule {}
