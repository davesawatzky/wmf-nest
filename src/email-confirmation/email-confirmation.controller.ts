import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common'
import ConfirmEmailDto from './dto/confirm-email.dto'
import { EmailConfirmationService } from './email-confirmation.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import RequestWithUser from '../auth/requestWithUser.interface'

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token
    )
    await this.emailConfirmationService.confirmEmail(email)
  }

  @Post('resend-confirmation-link')
  // @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Body() request: RequestWithUser) {
    const userName = `${request.user.firstName} ${request.user.lastName}`
    await this.emailConfirmationService.resendConfirmationLink(
      userName,
      request.user.email
    )
  }
}
