import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport/dist'
import { JwtModule } from '@nestjs/jwt/dist'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from '../user/user.module'
import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [
    ConfigModule,
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
