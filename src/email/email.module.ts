import { join } from 'node:path'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EmailService } from './email.service'

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_SERVER'),
          port: config.get('SENDING_SMTP_PORT'),
          secure: config.get('EMAIL_SECURE') === 'true', // true for 465, false for other ports
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
