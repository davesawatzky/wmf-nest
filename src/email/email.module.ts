import { join } from 'node:path'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EmailService } from './email.service'

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_SERVER'),
          port: Number.parseInt(config.get('SENDING_SMTP_PORT'), 10) || 1025,
          secure: config.get('EMAIL_SECURE') === 'true', // true for port 465, false for other ports (587, 1025)
          auth: config.get('EMAIL_USER')
            ? {
                user: config.get('EMAIL_USER'),
                pass: config.get('EMAIL_PASSWORD'),
              }
            : undefined,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
