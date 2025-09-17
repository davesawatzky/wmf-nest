import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)

  constructor(private mailerService: MailerService) {}

  async sendMail(options: ISendMailOptions): Promise<any> {
    try {
      this.logger.debug(`Sending email to: ${options.to}`, {
        to: options.to,
        subject: options.subject,
        template: options.template,
      })

      const result = await this.mailerService.sendMail(options)

      this.logger.log(
        `Successfully sent email to: ${options.to} with subject: ${options.subject}`,
      )
      return result
    }
    catch (error: any) {
      this.logger.error(
        `Failed to send email to ${options.to}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to send email')
    }
  }
}
