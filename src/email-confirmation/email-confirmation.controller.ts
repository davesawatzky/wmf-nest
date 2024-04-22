import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import ConfirmEmailDto from './dto/confirm-email.dto'
import { EmailConfirmationService } from './email-confirmation.service'
import RequestWithUser from '@/auth/requestWithUser.interface'

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    )
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
}
