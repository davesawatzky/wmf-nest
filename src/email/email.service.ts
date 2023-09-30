import { Injectable } from '@nestjs/common'
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  sendMail(options: ISendMailOptions) {
    return this.mailerService.sendMail(options)
  }
  // sendMail(options: Mail.Options) {
  //   return this.nodemailerTransport.sendMail(options)
  // }
}
