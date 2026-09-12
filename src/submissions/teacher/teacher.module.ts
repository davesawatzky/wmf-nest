import { forwardRef, Module } from '@nestjs/common'

import { RegistrationModule } from '@/submissions/registration/registration.module.js'

import { TeacherDataLoader } from './teacher.dataloader.js'
import { TeacherResolver } from './teacher.resolver.js'
import { TeacherService } from './teacher.service.js'

@Module({
  providers: [TeacherResolver, TeacherService, TeacherDataLoader],
  exports: [TeacherService],
  imports: [forwardRef(() => RegistrationModule)],
})
export class TeacherModule {}
