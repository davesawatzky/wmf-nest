import {
  CanActivate,
  ExecutionContext,

  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import RequestWithUser from '@/auth/requestWithUser.interface'

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest()

    if (!request.user?.emailConfirmed)
      throw new UnauthorizedException('Confirm your email first')

    return true
  }
}
