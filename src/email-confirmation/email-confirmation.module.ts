import { Module } from '@nestjs/common'
import { EmailConfirmationService } from './email-confirmation.service'
import { EmailModule } from 'src/email/email.module'
import { JwtModule } from '@nestjs/jwt'
import { EmailConfirmationController } from './email-confirmation.controller'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [EmailModule, JwtModule.register({}), UserModule],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
