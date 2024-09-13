import process from 'node:process'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt/dist'
import { PassportModule } from '@nestjs/passport/dist'
import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module'
import { UserModule } from '../user/user.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule,
    EmailConfirmationModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        signOptions: {
          expiresIn: '1d',
        },
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
  ],
})
export class AuthModule {}
