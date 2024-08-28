import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../user/entities/user.entity'
import { AuthPayload } from './entities/auth.entity'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(credentialsSignup: CredentialsSignup): Promise<AuthPayload> {
    try {
      const user = await this.prisma.tbl_user.findUnique({
        where: { email: credentialsSignup.email.trim().toLowerCase() },
      })
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
      console.log(err)
      throw new BadRequestException('Be sure to provide all fields')
    }
  }

  async signin(user: Partial<User>): Promise<AuthPayload> {
    try {
      const payload = {
        username: user.email,
        sub: user.id,
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
      console.log(err)
      throw new BadRequestException('Error searching for user')
    }
  }

  async findOne(email: User['email']): Promise<User> {
    try {
      if (email) {
        const user = await this.prisma.tbl_user.findUnique({
          where: { email },
        })
        if (user) {
          if (user.password !== null) {
            const pass = true
            const { password, ...userProps } = user
            return userProps
          }
          else {
            const pass = false
            return user
          }
        }
        else {
          return null
        }
      }
      else {
        throw new BadRequestException('No email given')
      }
    }
    catch (err) {
      throw new BadRequestException('No one found with those details')
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
      console.log(err)
    }
  }

  stripProperties(user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetails } = user
    return userDetails
  }
}
