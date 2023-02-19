import { Injectable } from '@nestjs/common'
import { tbl_user } from '@prisma/client'
import {
  AuthPayload,
  CredentialsSignin,
  CredentialsSignup,
  User,
} from 'src/graphql'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
// import { CreateAuthInput } from './dto/create-auth.input'
// import { UpdateAuthInput } from './dto/update-auth.input'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(credentialsSignup: CredentialsSignup): Promise<AuthPayload> {
    const user = await this.prisma.tbl_user.findUnique({
      where: { email: credentialsSignup.email },
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
      const { password, ...result } = newUser
      return this.signin(result)
    }
  }

  async signin(user: User) {
    const payload = {
      username: user.email,
      sub: user.id,
      admin: user.admin,
      staff: user.staff,
    }
    return {
      userErrors: [],
      access_token: this.jwtService.sign(payload),
      ...user,
    }
  }

  async validateUser(
    username: tbl_user['email'],
    password: tbl_user['password'],
  ): Promise<User | undefined> {
    const user = await this.prisma.tbl_user.findUnique({
      where: { email: username },
    })
    const valid = await bcrypt.compare(password, user?.password)
    console.log(valid)

    if (user && valid) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
