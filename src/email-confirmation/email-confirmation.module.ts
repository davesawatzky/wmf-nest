import { AuthModule } from '@/auth/auth.module'
import { EmailModule } from '@/email/email.module'
import { UserModule } from '@/user/user.module'
import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { EmailConfirmationController } from './email-confirmation.controller'
import { EmailConfirmationService } from './email-confirmation.service'

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
