import { Test, TestingModule } from '@nestjs/testing'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'
import { AuthService } from '../auth.service'
import { UserService } from '../../user/user.service'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { CredentialsSignup } from '../dto/credentials-signup.input'
import { userSignup } from '../stubs/signup'
import { userSignin } from '../stubs/signin'
import { userStub } from '../../user/test/stubs/user.stub'
import Prisma__tbl_userClient from 'prisma/prisma-client'

describe('AuthService', () => {
  let authService: AuthService
  let prisma: PrismaService
  let jwtService: JwtService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
    prisma = moduleRef.get<PrismaService>(PrismaService)
    jwtService = moduleRef.get<JwtService>(JwtService)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('Signup', () => {
    describe('When Signup Method is Called', () => {
      let credentialsSignup: CredentialsSignup

      beforeEach(() => {
        credentialsSignup = userSignup()[0]
      })

      it('Should return user (minus password) if email and password present', async () => {
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(null)
        prisma.tbl_user.upsert = vi.fn().mockResolvedValue(userSignup()[0])
        const { password, ...userDetails } = userSignup()[0]

        let result = await authService.signup(userSignup()[0])

        expect(result).toEqual({ userErrors: [], user: userDetails })
      })
    })
  })
})
