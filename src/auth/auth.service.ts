import { Injectable } from '@nestjs/common'
import { AuthPayload } from './dto/auth.entity'
import { CredentialsSignup } from './dto/credentials-signup.input'
import { CredentialsSignin } from './dto/credentials-signin.input'
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(credentialsSignup: CredentialsSignup): Promise<AuthPayload> {
    const user = await this.prisma.tbl_user.findUnique({
      where: { email: credentialsSignup.email.trim().toLowerCase() },
    })
    if (user) {
      return {
        userErrors: [
          {
            message: 'User already exists',
            field: null,
          },
        ],
        access_token: null,
        user: null,
      }
    } else {
      const hashedPassword = await bcrypt.hash(credentialsSignup.password, 15)
      const { firstName, lastName, email } = credentialsSignup
      const newUser = await this.prisma.tbl_user.create({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          password: hashedPassword,
          staff: false,
          admin: false,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser
      return this.signin(result)
    }
  }

  async signin(user: Partial<User>) {
    const payload = {
      username: user.email,
      sub: user.id,
    }
    return {
      userErrors: [],
      access_token: this.jwtService.sign(payload),
      user: user,
    }
  }

  async validateUser(
    username: CredentialsSignin['email'],
    password: CredentialsSignin['password'],
  ) {
    const user = await this.prisma.tbl_user.findUnique({
      where: { email: username.trim().toLowerCase() },
    })
    const valid = await bcrypt.compare(password, user?.password)
    if (user && valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }
}
