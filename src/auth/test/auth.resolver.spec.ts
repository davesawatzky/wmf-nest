import { Test, TestingModule } from '@nestjs/testing'
import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { AuthResolver } from '../auth.resolver'
import { AuthService } from '../auth.service'
import { EmailConfirmationService } from '../../email-confirmation/email-confirmation.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { userSignup } from '../stubs/signup'
import { userSignin } from '../stubs/signin'
import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { EmailConfirmationModule } from 'src/email-confirmation/email-confirmation.module'
import { AuthPayload } from '../entities/auth.entity'
import { CredentialsSignup } from '../dto/credentials-signup.input'
import { UserError } from 'src/common.entity'
import { User } from 'src/user/entities/user.entity'
import { mockContext } from 'src/test/gqlMockFactory'

vi.mock('../auth.service')
// vi.mock('../../email-confirmation/email-confirmation.service.ts')

describe('AuthResolver', () => {
  let authResolver: AuthResolver
  let authService: AuthService
  let emailConfirmationService: Partial<EmailConfirmationService> = {
    sendVerificationLink: vi.fn().mockReturnValue(true),
  }
  let configService: ConfigService
  let mockRes: Partial<GqlExecutionContext>
  let credentialsSignup: CredentialsSignup

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      // imports: [EmailConfirmationModule, ConfigModule],
      providers: [
        AuthResolver,
        // AuthService,
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: EmailConfirmationService,
          useValue: emailConfirmationService,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile()

    authResolver = moduleRef.get<AuthResolver>(AuthResolver)
    authService = moduleRef.get<AuthService>(AuthService)
    mockRes = mockContext({ user: 'David Sawatzky' })
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authResolver).toBeDefined()
  })

  describe('Signup', () => {
    describe('When Signup Method is called', () => {
      let userErrors: UserError[]
      let user: Partial<User>
      let userName: string
      let result: AuthPayload

      beforeEach(async () => {
        result = await authResolver.signup(
          userSignup(),
          mockRes.switchToHttp().getResponse()
        )
        userErrors = result.userErrors
        user = result.user
      })

      it('should call the auth service with user details', () => {
        expect(authService.signup).toHaveBeenCalledWith(userSignup())
      })

      it('Should return a username with first and last name', () => {
        userName = `${user.firstName} ${user.lastName}`
        expect(userName).toEqual(
          `${userSignup().firstName} ${userSignup().lastName}`
        )
      })

      it('should send an email with username and email details', () => {
        const userName = `${user.firstName} ${user.lastName}`
        expect(userName).toBeTruthy()
        expect(user.email).toBeTruthy()
        expect(emailConfirmationService.sendVerificationLink).toHaveBeenCalled()
      })
      it('returns user and userError details', async () => {
        expect(userErrors).toEqual([])
        expect(user).toEqual(userSignup())
      })
      it('Should return type AuthPayload', () => {
        expectTypeOf(result).toEqualTypeOf<AuthPayload>()
      })
    })
  })

  describe('CheckUser', () => {
    describe('When checkuser is called', () => {
      let result: any

      beforeEach(async () => {
        result = await authResolver.checkUser(userSignup().email)
      })

      it('Should call authservice findOne with the email address', () => {
        expect(authService.findOne).toHaveBeenCalledWith(userSignup().email)
      })

      it('Should return the user instance', () => {
        expect(result).toEqual({ user: userSignup() })
      })
    })
  })

  // describe('Signin', () => {
  //   describe('When Signin is called', () => {
  //     let result: AuthPayload

  //     beforeEach(async () => {
  //       result = await authResolver.signin(userSignin(), mockRes)
  //     })

  //     it('Should call the authservice signin method with user info', () => {
  //       expect(authService.signin).toHaveBeenCalled()
  //     })
  //   })
  // })
})
