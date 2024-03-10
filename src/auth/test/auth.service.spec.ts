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
import { JwtModule, JwtService } from '@nestjs/jwt'
import { CredentialsSignup } from '../dto/credentials-signup.input'
import { CredentialsSignin } from '../dto/credentials-signin.input'
import { userSignup } from '../stubs/signup'
import { userSignin } from '../stubs/signin'
import { userStub } from '../../user/test/stubs/user.stub'
import Prisma__tbl_userClient from 'prisma/prisma-client'
import { AuthPayload } from '../entities/auth.entity'
import { User } from 'src/user/entities/user.entity'

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
      let result: AuthPayload

      beforeEach(() => {
        credentialsSignup = userSignup()[0]
      })

      afterEach(() => {
        vi.fn().mockClear()
      })

      it('Should return user (minus password) if email and password are unique', async () => {
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(null)
        prisma.tbl_user.upsert = vi.fn().mockResolvedValue(userSignup()[0])
        const { password, ...userDetails } = userSignup()[0]
        result = await authService.signup(userSignup()[0])
        expect(result).toEqual({ userErrors: [], user: userDetails })
      })

      it('Should return error message if the user and password return true in the db', async () => {
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(userSignup()[0])
        result = await authService.signup(userSignup()[0])
        expect(result.user).toBeNull()
        expect(result.userErrors[0].message).toBeTruthy()
      })

      it('Should user exist but not a teacher, then it should return error', async () => {
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue({
          email: userSignup()[0].email,
          privateTeacher: false,
          schoolTeacher: false,
        })
        result = await authService.signup(userSignup()[0])
        expect(result.user).toBeNull()
        expect(result.userErrors[0].message).toBeTruthy()
      })

      it("Should update password if user exists but no password, and it's a teacher", async () => {
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue({
          email: userSignup()[0].email,
          password: null,
          privateTeacher: true,
          schoolTeacher: false,
        })
        prisma.tbl_user.upsert = vi.fn().mockResolvedValue(userSignup()[2])
        const { password, ...userDetails } = userSignup()[2]
        result = await authService.signup(userSignup()[2])
        expect(result).toEqual({ userErrors: [], user: userDetails })
      })
    })
  })

  describe('Signin', () => {
    describe('When the signin method is called', () => {
      let signinFromAuthGuard: User & CredentialsSignin
      let result: AuthPayload

      beforeEach(() => {
        signinFromAuthGuard = userStub()
        jwtService.sign = vi.fn().mockImplementation((payload) => payload)
      })
      afterEach(() => {
        vi.fn().mockClear()
      })

      it('Should allow a user to signin with email and password if confirmed', async () => {
        signinFromAuthGuard.emailConfirmed = true
        prisma.tbl_user.findUnique = vi
          .fn()
          .mockResolvedValue(signinFromAuthGuard)
        result = await authService.signin(signinFromAuthGuard)
        expect(result.diatonicToken).toBeTruthy()
      })

      it('Should produce an error if email not confirmed', async () => {
        signinFromAuthGuard.emailConfirmed = false
        prisma.tbl_user.findUnique = vi
          .fn()
          .mockResolvedValue(signinFromAuthGuard)
        result = await authService.signin(signinFromAuthGuard)
        expect(result.diatonicToken).toBeNull()
        expect(result.userErrors[0].message).toBeTruthy()
      })

      it('Should produce an error if no user found', async () => {
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(null)
        result = await authService.signin({
          id: 5,
          firstName: 'David',
          lastName: 'Sawatzky',
          email: 'test@test.com',
          admin: false,
          staff: false,
          privateTeacher: false,
          schoolTeacher: false,
        })
        expect(result.diatonicToken).toBeNull()
        expect(result.userErrors[0].message).toBeTruthy()
      })
    })
  })

  describe('findOne', () => {
    describe('If Email is given', () => {
      let result: User
      let userDetails: User & CredentialsSignup

      beforeEach(() => {
        userDetails = userStub()
      })
      afterEach(() => {
        vi.fn().mockClear()
        userDetails = null
      })

      it('Should return one unique account', async () => {
        const { password, ...userProps } = userDetails
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(userProps)
        result = await authService.findOne(userProps.email)
        expect(result).toEqual(userProps)
      })

      it("Should return full user details, with blank password property, if password doesn't exist", async () => {
        userDetails.password = null
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(userDetails)
        result = await authService.findOne(userDetails.email)
        expect(result).toEqual(userDetails)
      })

      it('Should return null if no user found', async () => {
        prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(null)
        result = await authService.findOne(userDetails.email)
        expect(result).toBeNull()
      })
    })

    describe('If no email given', () => {
      let result: User

      it('Should return error message', async () => {
        await expect(() => authService.findOne(null)).rejects.toThrowError()
      })
    })
  })

  describe('checkIfPasswordExists', () => {
    let result: { id: number; pass: boolean }
    let userDetails: User & CredentialsSignin
    beforeEach(() => {
      userDetails = userStub()
    })
    afterEach(() => {
      vi.fn().mockClear()
      userDetails = null
    })

    it('Should return an id and true if password present', async () => {
      prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(userDetails)
      result = await authService.checkIfPasswordExists(userDetails.id)
      expect(result).toEqual({ id: 5, pass: true })
    })

    it('Should return an id and false if password not present', async () => {
      userDetails.password = null
      prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(userDetails)
      result = await authService.checkIfPasswordExists(userDetails.id)
      expect(result).toEqual({ id: 5, pass: false })
    })

    it('Should throw an error if nothing found', async () => {
      prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(null)
      await expect(() =>
        authService.checkIfPasswordExists(null)
      ).rejects.toThrowError()
    })
  })
})
