import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { LocalStrategy } from './local.strategy'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport/dist'
import { JwtModule } from '@nestjs/jwt/dist'
import { JwtStrategy } from './jwt.strategy'

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        signOptions: {
          expiresIn: '2d',
        },
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
  ],
})
export class AuthModule {}
