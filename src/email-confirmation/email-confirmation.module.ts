import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { EmailConfirmationService } from './email-confirmation.service'
import { EmailConfirmationController } from './email-confirmation.controller'
import { EmailModule } from '@/email/email.module'
import { UserModule } from '@/user/user.module'

@Module({
  imports: [EmailModule, JwtModule.register({}), UserModule],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
