import { EmailService } from '@/email/email.service'
import { UserService } from '@/user/user.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import VerificationTokenPayload from './verificationTokenPayload.interface'

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  public sendVerificationLink(userName: string, email: string) {
    const payload: VerificationTokenPayload = { email }
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    })
    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`
    return this.emailService.sendMail({
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'WMF account verification',
      template: './confirmation-email',
      context: {
        name: userName,
        confirmationLink: url,
      },
    })
  }

  public sendPasswordResetLink(email: string) {
    try {
      const payload: VerificationTokenPayload = { email }
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        )}s`,
      })
      const url = `${this.configService.get(
        'PASSWORD_RESET_URL',
      )}?token=${token}`
      return this.emailService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'WMF password reset',
        template: './password-reset-template',
        context: {
          email,
          resetLink: url,
        },
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.findOne(null, email)
    if (user.emailConfirmed)
      throw new BadRequestException('Email already confirmed')
    await this.userService.update(user.id, { emailConfirmed: true })
  }

  public async resendConfirmationLink(userName: string, userEmail: string) {
    const user = await this.userService.findOne(null, userEmail)
    if (user.emailConfirmed)
      throw new BadRequestException('Email already confirmed')
    await this.sendVerificationLink(userName, userEmail)
  }

  public async resendPasswordLink(userEmail: string) {
    try {
      const user = await this.userService.findOne(null, userEmail)
      if (!user.passwordResetPending)
        throw new BadRequestException('No pending password reset request')
      await this.sendPasswordResetLink(userEmail)
    }
    catch (err) {
      console.log(err)
    }
  }
}
