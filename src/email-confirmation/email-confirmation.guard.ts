import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import RequestWithUser from '@/auth/requestWithUser.interface'

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  private readonly logger = new Logger(EmailConfirmationGuard.name)
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest()

    if (!request.user?.emailConfirmed) {
      this.logger.warn(`Unauthorized access attempt by user ID: ${request.user?.id} - Email not confirmed`)
      throw new UnauthorizedException('Confirm your email first')
    }

    return true
  }
}
