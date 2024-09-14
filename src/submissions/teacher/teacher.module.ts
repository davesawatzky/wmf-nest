import { RegistrationModule } from '@/submissions/registration/registration.module'
import { forwardRef, Module } from '@nestjs/common'
import { TeacherResolver } from './teacher.resolver'
import { TeacherService } from './teacher.service'

@Module({
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
  imports: [forwardRef(() => RegistrationModule)],
})
export class TeacherModule {}
