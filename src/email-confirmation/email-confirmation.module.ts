import { Module } from '@nestjs/common'
import { EmailConfirmationService } from './email-confirmation.service'
import { ConfigModule } from '@nestjs/config'
import { EmailModule } from 'src/email/email.module'
import { JwtModule } from '@nestjs/jwt'
import { EmailConfirmationController } from './email-confirmation.controller'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [ConfigModule, EmailModule, JwtModule.register({}), UserModule],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
