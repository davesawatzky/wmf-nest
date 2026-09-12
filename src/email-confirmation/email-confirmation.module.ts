import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from '@/auth/auth.module.js'
import { EmailModule } from '@/email/email.module.js'
import { UserModule } from '@/user/user.module.js'
import { EmailConfirmationController } from './email-confirmation.controller.js'
import { EmailConfirmationService } from './email-confirmation.service.js'

@Module({
  imports: [
    EmailModule,
    JwtModule.register({}),
    UserModule,
    forwardRef(() => AuthModule),
  ],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
