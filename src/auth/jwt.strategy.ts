import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request as RequestType } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    })
  }

  private static extractJWTFromCookie(req: RequestType) {
    if (req.cookies && 'diatonicToken' in req.cookies)
      return req.cookies.diatonicToken

    return null
  }

  // payload = decoded JWT
  async validate(payload: any): Promise<User> {
    const user = await this.authService.findAuthenticatedUser(payload.sub)
    return user
  }
}
