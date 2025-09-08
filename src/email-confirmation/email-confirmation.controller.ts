/* eslint-disable perfectionist/sort-imports */
import RequestWithUser from '@/auth/requestWithUser.interface'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { EmailConfirmationService } from './email-confirmation.service'
import { AuthService } from '@/auth/auth.service'
import { PasswordChangeResend } from './dto/password-change-resend.input'
import ConfirmationEmailDto from './dto/confirm-email.dto'

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly authService: AuthService,
  ) {}

  @Post('confirm')
  async confirm(@Body() request: ConfirmationEmailDto) {
    const email = await this.authService.emailFromToken(request.token)
    await this.emailConfirmationService.confirmEmail(email)
  }

  @Post('resend-confirmation-link')
  // @UseGuards(RestJwtAuthGuard)
  async resendConfirmationLink(@Body() request: RequestWithUser) {
    const userName = `${request.user.firstName} ${request.user.lastName}`
    await this.emailConfirmationService.resendConfirmationLink(
      userName,
      request.user.email,
    )
  }

  @Post('resend-password-link')
  async resendPasswordLink(@Body() request: PasswordChangeResend) {
    const email = request.email
    await this.emailConfirmationService.resendPasswordLink(email)
  }
}
