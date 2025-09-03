import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

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
