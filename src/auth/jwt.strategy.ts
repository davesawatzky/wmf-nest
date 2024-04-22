import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request as RequestType } from 'express'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
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
