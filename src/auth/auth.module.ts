import process from 'node:process'
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module.js'
import { UserModule } from '../user/user.module.js'
import { AuthResolver } from './auth.resolver.js'
import { AuthService } from './auth.service.js'
import { JwtStrategy } from './jwt.strategy.js'
import { LocalStrategy } from './local.strategy.js'

@Global()
@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PassportModule],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
