import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '@/prisma/prisma.service'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { AuthPayload, PasswordChangePayload } from './entities/auth.entity'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async signup(credentialsSignup: CredentialsSignup): Promise<AuthPayload> {
    this.logger.debug(
      `Attempting signup for email: ${credentialsSignup.email}`,
    )

    let user: any
    let userErrors: any[] = []

    try {
      user = await this.prisma.tbl_user.findUnique({
        where: { email: credentialsSignup.email.trim().toLowerCase() },
      })

      if (!!user && !!user.password) {
        this.logger.warn(
          `Signup attempt for existing user: ${credentialsSignup.email}`,
        )
        userErrors = [
          {
            message: 'User already exists',
            field: ['email'],
          },
        ]
        user = null
      }
      else if (
        !!user
        && !credentialsSignup.privateTeacher
        && !credentialsSignup.schoolTeacher
      ) {
        this.logger.warn(
          `Signup attempt for existing non-teacher user: ${credentialsSignup.email}`,
        )
        userErrors = [
          {
            message: 'User already exists',
            field: ['email'],
          },
        ]
        user = null
      }
      else if (
        !user
        || credentialsSignup.privateTeacher
        || credentialsSignup.schoolTeacher
      ) {
        const hashedPassword = await bcrypt.hash(
          credentialsSignup.password.trim(),
          15,
        )
        const {
          firstName,
          lastName,
          email,
          roles,
          privateTeacher,
          schoolTeacher,
          instrument,
        } = credentialsSignup

        const newUser = await this.prisma.tbl_user.upsert({
          // updates or creates if not found
          where: { email: credentialsSignup.email },
          create: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            instrument: instrument ? instrument.trim() : null,
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            roles: roles || ['user'],
            privateTeacher,
            schoolTeacher,
          },
          update: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            instrument: instrument ? instrument.trim() : null,
            password: hashedPassword,
            roles: roles || ['user'],
            privateTeacher,
            schoolTeacher,
          },
        })

        user = this.stripProperties(newUser)
        this.logger.log(
          `Successfully created/updated user with ID: ${newUser.id} for email: ${credentialsSignup.email}`,
        )
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to signup user ${credentialsSignup.email}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2002') {
        userErrors = [
          {
            message: 'Email address already in use',
            field: ['email'],
          },
        ]
        user = null
      }
      else if (error.code === 'P2003') {
        userErrors = [
          {
            message: 'Invalid data provided',
            field: [],
          },
        ]
        user = null
      }
      else {
        userErrors = [
          {
            message: 'Cannot create user account',
            field: [],
          },
        ]
        user = null
      }
    }

    return {
      userErrors,
      diatonicToken: null,
      user,
    }
  }

  async signin(user: Partial<User>): Promise<AuthPayload> {
    this.logger.debug(`Attempting signin for user ID: ${user.id}`)

    try {
      const payload = {
        username: user.email,
        sub: user.id,
        roles: user.roles,
      }

      const signedInUser = await this.prisma.tbl_user.findUnique({
        where: { id: user.id },
      })

      if (!!signedInUser && !signedInUser.emailConfirmed) {
        this.logger.warn(
          `Signin attempt for unconfirmed user: ${signedInUser.email}`,
        )
        return {
          userErrors: [
            {
              message:
                'Account not confirmed. Check email account for verification link',
              field: ['email'],
            },
          ],
          diatonicToken: null,
          user: {
            email: signedInUser.email,
            firstName: signedInUser.firstName,
            lastName: signedInUser.lastName,
          },
        }
      }
      else if (!!signedInUser && signedInUser.passwordResetPending) {
        this.logger.warn(
          `Signin attempt for user with pending password reset: ${signedInUser.email}`,
        )
        return {
          userErrors: [
            {
              message: 'Cannot sign in. Password change pending',
              field: ['password'],
            },
          ],
          diatonicToken: null,
          user: {
            email: signedInUser.email,
            firstName: signedInUser.firstName,
            lastName: signedInUser.lastName,
          },
        }
      }
      else if (!signedInUser) {
        this.logger.warn(`Signin attempt for non-existent user ID: ${user.id}`)
        return {
          userErrors: [
            {
              message: 'Incorrect Email or Password',
              field: ['email', 'password'],
            },
          ],
          diatonicToken: null,
          user: null,
        }
      }
      else {
        const token = this.jwtService.sign(payload)
        this.logger.log(`Successful signin for user: ${signedInUser.email}`)
        return {
          userErrors: [],
          diatonicToken: token,
          user: this.stripProperties(user),
        }
      }
    }
    catch (error: any) {
      this.logger.error(
        `Failed to signin user ID ${user.id}: ${error.message}`,
        error.stack,
      )

      return {
        userErrors: [
          {
            message: 'Error during sign in process',
            field: [],
          },
        ],
        diatonicToken: null,
        user: null,
      }
    }
  }

  async findOne(email: User['email']) {
    if (!email)
      throw new BadRequestException('Email is required - findOne')

    this.logger.debug(`Finding user by email: ${email}`)

    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { email },
      })

      if (user) {
        this.logger.log(`Successfully found user: ${email}`)
        if (user.password !== null) {
          const { password, ...userProps } = user
          return userProps
        }
        else {
          return user
        }
      }
      else {
        this.logger.warn(`User not found: ${email}. New user?`)
      }
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to find user ${email}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to retrieve user')
    }
  }

  async checkIfPasswordExists(id: User['id']) {
    if (!id)
      throw new BadRequestException('User ID is required')

    this.logger.debug(`Checking password existence for user ID: ${id}`)

    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { id },
      })

      if (user) {
        const pass = !!user.password
        this.logger.log(
          `Password check completed for user ID: ${id}, has password: ${pass}`,
        )
        return { id, pass }
      }
      else {
        this.logger.warn(`User not found for password check: ${id}`)
        throw new NotFoundException('User not found')
      }
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to check password for user ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException('Failed to check password status')
    }
  }

  async validateUser(
    username: CredentialsSignin['email'],
    password: CredentialsSignin['password'],
  ) {
    if (!username || !password) {
      this.logger.warn('Validation attempt with missing credentials')
      return null
    }

    this.logger.debug(`Validating user credentials for: ${username}`)

    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { email: username.trim().toLowerCase() },
      })

      if (!user) {
        this.logger.warn(`User not found during validation: ${username}`)
        return null
      }

      if (!user.password) {
        this.logger.warn(`User has no password set: ${username}`)
        return null
      }

      const valid = await bcrypt.compare(password, user.password)
      if (user && valid) {
        this.logger.log(`Successful credential validation for: ${username}`)
        const result = await this.stripProperties(user)
        return result
      }

      this.logger.warn(`Invalid password for user: ${username}`)
      return null
    }
    catch (error: any) {
      this.logger.error(
        `Failed to validate user ${username}: ${error.message}`,
        error.stack,
      )
      return null
    }
  }

  async findAuthenticatedUser(id: User['id']): Promise<Partial<User> | null> {
    if (!id) {
      this.logger.warn('Find authenticated user called without ID')
      return null
    }

    this.logger.debug(`Finding authenticated user with ID: ${id}`)

    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { id },
      })

      if (user) {
        this.logger.log(`Successfully found authenticated user: ${id}`)
        const result = await this.stripProperties(user)
        return result
      }

      this.logger.warn(`Authenticated user not found: ${id}`)
      return null
    }
    catch (error: any) {
      this.logger.error(
        `Failed to find authenticated user ${id}: ${error.message}`,
        error.stack,
      )
      return null
    }
  }

  stripProperties(user: any) {
    const { password, ...userDetails } = user
    return userDetails
  }

  async setPasswordChangePending(id: User['id']) {
    if (!id)
      throw new BadRequestException('User ID is required')

    this.logger.debug(`Setting password change pending for user ID: ${id}`)

    try {
      await this.prisma.tbl_user.update({
        where: { id },
        data: {
          passwordResetPending: true,
        },
      })

      this.logger.log(
        `Successfully set password change pending for user ID: ${id}`,
      )
    }
    catch (error: any) {
      this.logger.error(
        `Failed to set password change pending for user ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to update password reset status',
      )
    }
  }

  async checkIfPasswordResetPending(id: User['id']) {
    if (!id)
      throw new BadRequestException('User ID is required')

    this.logger.debug(
      `Checking password reset pending status for user ID: ${id}`,
    )

    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { id },
      })

      if (!user) {
        this.logger.warn(`User not found for password reset check: ${id}`)
        throw new NotFoundException('User not found')
      }

      const status = user.passwordResetPending ? 'pending' : 'not_pending'
      this.logger.log(`Password reset status for user ID ${id}: ${status}`)
      return status
    }
    catch (error: any) {
      if (
        error instanceof BadRequestException
        || error instanceof NotFoundException
      ) {
        throw error
      }

      this.logger.error(
        `Failed to check password reset status for user ID ${id}: ${error.message}`,
        error.stack,
      )
      throw new InternalServerErrorException(
        'Failed to check password reset status',
      )
    }
  }

  async passwordChange(
    email: string,
    password: string,
  ): Promise<PasswordChangePayload> {
    if (!email || !password) {
      this.logger.warn(
        'Password change attempt with missing email or password',
      )
      return {
        userErrors: [
          {
            message: 'Email and password are required',
            field: ['email', 'password'],
          },
        ],
        passwordChanged: false,
      }
    }

    this.logger.debug(`Attempting password change for email: ${email}`)

    try {
      const hashedPassword = await bcrypt.hash(password, 15)
      await this.prisma.tbl_user.update({
        where: { email },
        data: {
          password: hashedPassword,
          passwordResetPending: false,
        },
      })

      this.logger.log(`Successfully changed password for user: ${email}`)
    }
    catch (error: any) {
      this.logger.error(
        `Failed to change password for user ${email}: ${error.message}`,
        error.stack,
      )

      if (error.code === 'P2025') {
        return {
          userErrors: [
            {
              message: 'User not found',
              field: ['email'],
            },
          ],
          passwordChanged: false,
        }
      }

      return {
        userErrors: [
          {
            message: 'Could not change password',
            field: [],
          },
        ],
        passwordChanged: false,
      }
    }
    return { userErrors: [], passwordChanged: true }
  }

  public async emailFromToken(token: string) {
    if (!token)
      throw new BadRequestException('Token is required')

    this.logger.debug('Extracting email from verification token')

    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      })

      if (typeof payload === 'object' && 'email' in payload) {
        this.logger.log(`Successfully extracted email from token`)
        return payload.email
      }

      this.logger.warn('Invalid token payload structure')
      throw new BadRequestException('Invalid token payload')
    }
    catch (error: any) {
      this.logger.error(
        `Failed to extract email from token: ${error.message}`,
        error.stack,
      )

      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired')
      }
      throw new BadRequestException('Bad confirmation token')
    }
  }

  async validateTokenAndGetUser(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token)
      return await this.userService.findOne(payload.sub)
    }
    catch (error: any) {
      this.logger.error(
        `Failed to validate token and get user: ${error.message}`,
        error.stack,
      )
      return null
    }
  }
}
