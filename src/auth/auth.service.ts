import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthPayload } from './entities/auth.entity'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { UserError } from '../common.entity'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signup(credentialsSignup: CredentialsSignup): Promise<AuthPayload> {
    const user = await this.prisma.tbl_user.findUnique({
      where: { email: credentialsSignup.email.trim().toLowerCase() },
    })
    if (user && user.password !== null) {
      console.log('Denied')
      return {
        userErrors: [
          {
            message: 'User already exists',
            field: [],
          },
        ],
        user: null,
      }
    } else if (
      !user ||
      credentialsSignup.privateTeacher ||
      credentialsSignup.schoolTeacher
    ) {
      const hashedPassword = await bcrypt.hash(
        credentialsSignup.password.trim(),
        15
      )
      const { firstName, lastName, email, privateTeacher, schoolTeacher } =
        credentialsSignup
      const newUser = await this.prisma.tbl_user.upsert({
        where: { email: credentialsSignup.email },
        create: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
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
          password: hashedPassword,
          staff: false,
          admin: false,
          privateTeacher,
          schoolTeacher,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = this.stripProperties(newUser)
      return {
        userErrors: [],
        // diatonicToken: null,
        user: result,
      }
    }
  }

  async signin(user: Partial<User>): Promise<AuthPayload> {
    const payload = {
      username: user.email,
      sub: user.id,
      privateTeacher: user.privateTeacher,
      schoolTeacher: user.schoolTeacher,
    }
    const confirmed = await this.prisma.tbl_user.findUnique({
      where: { id: user.id },
    })
    if (!confirmed.emailConfirmed) {
      console.log('Not confirmed')
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
          email: confirmed.email,
          firstName: confirmed.firstName,
          lastName: confirmed.lastName,
        },
      }
    } else {
      return {
        userErrors: [],
        diatonicToken: this.jwtService.sign(payload),
        user: this.stripProperties(user),
      }
    }
  }

  async findOne(email: User['email']) {
    try {
      if (email) {
        const user = await this.prisma.tbl_user.findUnique({
          where: { email },
        })
        if (!!user) {
          if (user.password !== null) {
            const pass = true
            const { password, ...userProps } = user
            return userProps
          } else {
            const pass = false
            return user
          }
        } else {
          console.log('User is null', user)
          return { user: null }
        }
      }
    } catch (err) {
      console.log(err)
      throw new BadRequestException('No one found with those details')
    }
  }

  async checkIfPasswordExists(id: User['id']) {
    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { id },
      })
      const pass = !!user.password
      return { id, pass }
    } catch (err) {
      console.log(err)
    }
  }

  async validateUser(
    username: CredentialsSignin['email'],
    password: CredentialsSignin['password']
  ) {
    const user = await this.prisma.tbl_user.findUnique({
      where: { email: username.trim().toLowerCase() },
    })
    const valid = await bcrypt.compare(password, user?.password)
    if (user && valid) {
      const result = await this.stripProperties(user)
      return result
    }
    return null
  }

  async findAuthenticatedUser(id: User['id']): Promise<User> {
    const user = await this.prisma.tbl_user.findUnique({
      where: { id },
    })
    if (user) {
      const result = await this.stripProperties(user)
      return result
    }
    return null
  }

  stripProperties(user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetails } = user
    return userDetails
  }
}
