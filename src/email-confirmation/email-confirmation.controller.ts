import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service.js'
/* eslint-disable perfectionist/sort-imports */
import type RequestWithUser from '@/auth/requestWithUser.interface.js'

import ConfirmationEmailDto from './dto/confirm-email.dto.js'
import { PasswordChangeResend } from './dto/password-change-resend.input.js'
import { EmailConfirmationService } from './email-confirmation.service.js'

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
    const result = await this.emailConfirmationService.confirmEmail(email)
    return result
  }

  @Post('resend-confirmation-link')
  // @UseGuards(RestJwtAuthGuard)
  async resendConfirmationLink(@Body() request: RequestWithUser) {
    const userName = `${request.user.firstName} ${request.user.lastName}`
    await this.emailConfirmationService.resendConfirmationLink(userName, request.user.email)
  }

  @Post('resend-password-link')
  async resendPasswordLink(@Body() request: PasswordChangeResend) {
    const email = request.email
    await this.emailConfirmationService.resendPasswordLink(email)
  }
}
