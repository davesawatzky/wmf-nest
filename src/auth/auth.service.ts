import { PrismaService } from '@/prisma/prisma.service'
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../user/entities/user.entity'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { AuthPayload, PasswordChangePayload } from './entities/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(credentialsSignup: CredentialsSignup): Promise<AuthPayload> {
    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { email: credentialsSignup.email.trim().toLowerCase() },
      }) ?? null
      if (!!user && !!user.password) {
        return {
          userErrors: [
            {
              message: 'User already exists',
              field: [],
            },
          ],
          diatonicToken: null,
          user: null,
        }
      }
      else if (
        !!user
        && !credentialsSignup.privateTeacher
        && !credentialsSignup.schoolTeacher
      ) {
        return {
          userErrors: [
            {
              message: 'User already exists',
              field: [],
            },
          ],
          diatonicToken: null,
          user: null,
        }
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
            staff: false,
            admin: false,
            privateTeacher,
            schoolTeacher,
          },
          update: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            instrument: instrument ? instrument.trim() : null,
            password: hashedPassword,
            staff: false,
            admin: false,
            privateTeacher,
            schoolTeacher,
          },
        })

        const result = this.stripProperties(newUser)
        return {
          userErrors: [],
          // diatonicToken: null,
          user: result,
        }
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException('Be sure to provide all fields')
    }
  }

  async signin(user: Partial<User>): Promise<AuthPayload> {
    try {
      const payload = {
        username: user.email,
        sub: user.id,
        admin: user.admin,
        // privateTeacher: user.privateTeacher,
        // schoolTeacher: user.schoolTeacher,
      }
      const signedInUser = await this.prisma.tbl_user.findUnique({
        where: { id: user.id },
      })
      if (!!signedInUser && !signedInUser.emailConfirmed) {
        return {
          userErrors: [
            {
              message:
                'Account not confirmed.  Check email account for verification link',
              field: [],
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
        return {
          userErrors: [
            {
              message:
                'Cannot sign in.  Password change pending',
              field: [],
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
        return {
          userErrors: [
            {
              message: 'Incorrect Email or Password',
              field: [],
            },
          ],
          diatonicToken: null,
          user: null,
        }
      }
      else {
        return {
          userErrors: [],
          diatonicToken: this.jwtService.sign(payload),
          user: this.stripProperties(user),
        }
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException('Error searching for user')
    }
  }

  async findOne(email: User['email']) {
    if (email) {
      const user = await this.prisma.tbl_user.findUnique({
        where: { email },
      })
      if (user) {
        if (user.password !== null) {
          const { password, ...userProps } = user
          return userProps
        }
        else {
          return user
        }
      }
      else {
        return null
      }
    }
    else {
      throw new BadRequestException('No email given.')
    }
  }

  async checkIfPasswordExists(id: User['id']) {
    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { id },
      })
      if (user) {
        const pass = !!user.password
        return { id, pass }
      }
      else {
        throw new BadRequestException('No user found')
      }
    }
    catch (err) {
      console.error(err)
      throw new BadRequestException('No valid user given')
    }
  }

  async validateUser(
    username: CredentialsSignin['email'],
    password: CredentialsSignin['password'],
  ) {
    const user = await this.prisma.tbl_user.findUnique({
      where: { email: username.trim().toLowerCase() },
    })
    if (!user)
      return null
    else if (!user.password)
      return null

    const valid = await bcrypt.compare(password, user.password)
    if (user && valid) {
      const result = await this.stripProperties(user)
      return result
    }
    return null
  }

  async findAuthenticatedUser(id: User['id']): Promise<User> {
    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { id },
      })
      if (user) {
        const result = await this.stripProperties(user)
        return result
      }
      return null
    }
    catch (err) {
      console.error(err)
    }
  }

  stripProperties(user) {
    const { password, ...userDetails } = user
    return userDetails
  }

  async setPasswordChangePending(id: User['id']) {
    await this.prisma.tbl_user.update({
      where: { id },
      data: {
        passwordResetPending: true,
      },
    })
  }

  async checkIfPasswordResetPending(id: User['id']) {
    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { id },
      })
      if (user.passwordResetPending) {
        return 'pending'
      }
    }
    catch (err) {
      console.error(err)
      return 'error'
    }
  }

  async passwordChange(email: string, password: string): Promise<PasswordChangePayload> {
    try {
      const hashedPassword = await bcrypt.hash(password, 15)
      await this.prisma.tbl_user.update({
        where: { email },
        data: {
          password: hashedPassword,
          passwordResetPending: false,
        },
      })
    }
    catch (err) {
      console.error(err)
      return {
        userErrors: [{
          message: 'Could not change password',
          field: [],
        }],
        passwordChanged: false,
      }
    }
    return { userErrors: [], passwordChanged: true }
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      })
      if (typeof payload === 'object' && 'email' in payload)
        return payload.email
      throw new BadRequestException()
    }
    catch (error: any) {
      if (error?.name === 'TokenExpiredError')
        throw new BadRequestException('Email confirmation token expired')
      throw new BadRequestException('Bad confirmation token')
    }
  }
}
