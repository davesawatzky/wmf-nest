import { Test, TestingModule } from '@nestjs/testing'
import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest'
import { AuthResolver } from '../auth.resolver'
import { AuthService } from '../auth.service'
import { EmailConfirmationService } from '../../email-confirmation/email-confirmation.service'
import { ConfigService } from '@nestjs/config'
import { userSignup } from '../stubs/signup'
import { userSignin } from '../stubs/signin'
import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { EmailConfirmationModule } from 'src/email-confirmation/email-confirmation.module'
import { AuthPayload } from '../entities/auth.entity'
import { CredentialsSignup } from '../dto/credentials-signup.input'
import { UserError } from '../../common.entity'
import { User } from '../../user/entities/user.entity'
import { mockContext } from '../../test/gqlMockFactory'

vi.mock('../auth.service')
// vi.mock('../gql-auth.guard.ts')
// vi.mock('../../email-confirmation/email-confirmation.service.ts')

describe('AuthResolver', () => {
  let authResolver: AuthResolver
  let authService: AuthService
  let emailConfirmationService: Partial<EmailConfirmationService> = {
    sendVerificationLink: vi.fn().mockReturnValue(true),
  }
  let configService: ConfigService
  let context: GqlExecutionContext
  let credentialsSignup: CredentialsSignup

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      // imports: [EmailConfirmationModule, ConfigModule],
      providers: [
        AuthResolver,
        AuthService,
        // {
        //   provide: AuthService,
        //   useValue: authService,
        // },
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
    context = mockContext(userSignup())
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
          userSignup()[0],
          context.switchToHttp().getResponse()
        )
        userErrors = result.userErrors
        user = result.user
      })

      it('should call the auth service with user details', () => {
        expect(authService.signup).toHaveBeenCalledWith(userSignup()[0])
      })

      it('Should return a username with first and last name', () => {
        userName = `${user.firstName} ${user.lastName}`
        expect(userName).toEqual(
          `${userSignup()[0].firstName} ${userSignup()[0].lastName}`
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
        expect(user).toEqual(userSignup()[0])
      })
      it('Should return type AuthPayload', () => {
        expectTypeOf(result).toEqualTypeOf<AuthPayload>()
      })
    })
  })

  describe('CheckUser', () => {
    let result: any

    describe('When checkuser is called', () => {
      beforeEach(async () => {
        result = await authResolver.checkUser(userSignup()[0].email)
      })

      it('Should call authservice findOne with the email address', () => {
        expect(authService.findOne).toHaveBeenCalledWith(userSignup()[0].email)
      })

      it('Should return the user instance', () => {
        expect(result).toEqual({ user: userSignup()[0] })
      })
    })
  })

  describe('Signin', () => {
    let result: AuthPayload
    let userErrors: UserError[]
    let user: Partial<User>
    let diatonicToken: string

    describe('When Signin is called', () => {
      beforeEach(async () => {
        result = await authResolver.signin(userSignin(), context)
        userErrors = result.userErrors
        user = result.user
        diatonicToken = result.diatonicToken
      })

      it('Should call the authservice signin method with user info', () => {
        expect(authService.signin).toHaveBeenCalled()
      })

      it('Should return the userErrors, diatonicToken, and user', () => {
        expect(result).toEqual({ userErrors, diatonicToken, user })
        expectTypeOf(result).toEqualTypeOf<AuthPayload>()
      })
    })

    // describe('Setting the Diatonic Cookie', () => {
    //   beforeEach(async () => {})

    //   it('Should set the cookie if diatonicToken is returned from authService', async () => {
    //     result = await authResolver.signin(userSignin(), context)
    //     console.log(context.getContext().res.cookie.mock.calls)
    //     expect(context.getContext().res.cookie).toBeCalled()
    //   })
    // })
  })
})
