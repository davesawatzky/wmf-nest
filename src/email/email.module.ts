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
          host: config.get('EMAIL_SERVER') || 'mail.davesawatzky.com',
          port: config.get('SENDING_SMTP_PORT') || 465,
          secure: true,
          auth: {
            user: config.get('EMAIL_USER') || 'info@davesawtzky.com',
            pass: config.get('EMAIL_PASSWORD'),
          },
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
