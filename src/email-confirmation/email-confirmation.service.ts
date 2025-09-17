import type VerificationTokenPayload from './verificationTokenPayload.interface'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { EmailService } from '@/email/email.service'
import { UserService } from '@/user/user.service'

@Injectable()
export class EmailConfirmationService {
  private readonly logger = new Logger(EmailConfirmationService.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  public async sendVerificationLink(userName: string, email: string) {
    if (!userName) {
      throw new BadRequestException('User name is required')
    }
    if (!email) {
      throw new BadRequestException('Email is required')
    }

    this.logger.debug(`Sending verification link to: ${email}`)

    try {
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

      await this.emailService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'WMF account verification',
        template: './confirmation-email',
        context: {
          name: userName,
          confirmationLink: url,
        },
      })

      this.logger.log(`Successfully sent verification email to: ${email}`)
    }
    catch (error: any) {
      this.logger.error(
        `Failed to send verification email to ${email}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to send verification email',
      )
    }
  }

  public async sendPasswordResetLink(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required')
    }

    this.logger.debug(`Sending password reset link to: ${email}`)

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

      await this.emailService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'WMF password reset',
        template: './password-reset-template',
        context: {
          email,
          resetLink: url,
        },
      })

      this.logger.log(`Successfully sent password reset email to: ${email}`)
    }
    catch (error: any) {
      this.logger.error(
        `Failed to send password reset email to ${email}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to send password reset email',
      )
    }
  }

  public async confirmEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required')
    }

    this.logger.debug(`Confirming email: ${email}`)

    try {
      const user = await this.userService.findOne(null, email)

      if (user.emailConfirmed) {
        throw new BadRequestException('Email already confirmed')
      }

      await this.userService.update(user.id, { emailConfirmed: true })

      this.logger.log(`Successfully confirmed email: ${email}`)
    }
    catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error
      }

      this.logger.error(
        `Failed to confirm email ${email}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to confirm email')
    }
  }

  public async resendConfirmationLink(userName: string, userEmail: string) {
    if (!userName) {
      throw new BadRequestException('User name is required')
    }
    if (!userEmail) {
      throw new BadRequestException('User email is required')
    }

    this.logger.debug(`Resending confirmation link to: ${userEmail}`)

    try {
      const user = await this.userService.findOne(null, userEmail)

      if (user.emailConfirmed) {
        throw new BadRequestException('Email already confirmed')
      }

      await this.sendVerificationLink(userName, userEmail)

      this.logger.log(`Successfully resent confirmation link to: ${userEmail}`)
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof InternalServerErrorException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to resend confirmation link to ${userEmail}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to resend confirmation link',
      )
    }
  }

  public async resendPasswordLink(userEmail: string) {
    if (!userEmail) {
      throw new BadRequestException('User email is required')
    }

    this.logger.debug(`Resending password reset link to: ${userEmail}`)

    try {
      const user = await this.userService.findOne(null, userEmail)

      if (!user.passwordResetPending) {
        throw new BadRequestException('No pending password reset request')
      }

      await this.sendPasswordResetLink(userEmail)

      this.logger.log(
        `Successfully resent password reset link to: ${userEmail}`,
      )
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof InternalServerErrorException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to resend password reset link to ${userEmail}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to resend password reset link',
      )
    }
  }
}
