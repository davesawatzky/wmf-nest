import { Injectable } from '@nestjs/common'
import { createTransport } from 'nodemailer'
import * as Mail from 'nodemailer/lib/mailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      host: configService.get('EMAIL_SERVER') || 'mail.davesawatzky.com',
      port: configService.get('SENDING_SMTP_PORT') || 465,
      secure: true,
      auth: {
        user: configService.get('EMAIL_USER') || 'info@davesawtzky.com',
        pass: configService.get('EMAIL_PASSWORD'),
      },
    })
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options)
  }
}
