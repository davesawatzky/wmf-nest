import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UserModule } from '../user/user.module'
import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport/dist'
import { JwtModule } from '@nestjs/jwt/dist'
import { JwtStrategy } from './jwt.strategy'

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '600s',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AuthModule {}
