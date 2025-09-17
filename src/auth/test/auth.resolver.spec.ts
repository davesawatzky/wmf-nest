import { ConfigService } from '@nestjs/config'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserError } from '../../common.entity'
import { EmailConfirmationService } from '../../email-confirmation/email-confirmation.service'
import { mockContext } from '../../test/gqlMockFactory'
import { User } from '../../user/entities/user.entity'
import { AuthResolver } from '../auth.resolver'
import { AuthService } from '../auth.service'
import { CredentialsSignup } from '../dto/credentials-signup.input'
import { AuthPayload } from '../entities/auth.entity'
import { userSignin } from '../stubs/signin'
import { userSignup } from '../stubs/signup'

vi.mock('../auth.service')
// vi.mock('../gql-auth.guard.ts')
// vi.mock('../../email-confirmation/email-confirmation.service.ts')

describe('authResolver', () => {
  let authResolver: AuthResolver
  let authService: AuthService
  const emailConfirmationService: Partial<EmailConfirmationService> = {
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

  describe('signup', () => {
    describe('when Signup Method is called with normal user', () => {
      let userErrors: UserError[]
      let user: Partial<User>
      let userName: string
      let result: AuthPayload

      beforeEach(async () => {
        result = await authResolver.signup(
          userSignup()[0],
          context.switchToHttp().getResponse(),
        )
        userErrors = result.userErrors
        user = result.user
      })

      it('should call the auth service with user details', () => {
        expect(authService.signup).toHaveBeenCalledWith(userSignup()[0])
      })

      it('should return a username with first and last name', () => {
        userName = `${user.firstName} ${user.lastName}`
        expect(userName).toEqual(
          `${userSignup()[0].firstName} ${userSignup()[0].lastName}`,
        )
      })

      it('should send an email with username and email details', () => {
        const userName = `${user.firstName} ${user.lastName}`
        expect(userName).toBeTruthy()
        expect(user.email).toBeTruthy()
        expect(
          emailConfirmationService.sendVerificationLink,
        ).toHaveBeenCalled()
      })
      it('returns user and userError details', () => {
        expect(userErrors).toEqual([])
        expect(user).toEqual(userSignup()[0])
      })
      it('should return type AuthPayload', () => {
        expectTypeOf(result).toEqualTypeOf<AuthPayload>()
      })
    })
  })

  describe('checkUser', () => {
    let result: any

    describe('when checkuser is called', () => {
      beforeEach(async () => {})

      it('should call authservice findOne with the email address', async () => {
        result = await authResolver.checkUser(userSignup()[0].email)
        expect(authService.findOne).toHaveBeenCalledWith(userSignup()[0].email)
      })

      it('should return the user instance', async () => {
        result = await authResolver.checkUser(userSignup()[0].email)
        expect(result).toEqual({ user: userSignup()[0] })
      })

      it('should return null if user not found', async () => {
        authService.findOne = vi.fn().mockResolvedValue(null)
        result = await authResolver.checkUser('test@test.email')
        expect(result).toBeNull()
      })
    })
  })

  describe('signin', () => {
    let result: AuthPayload
    let userErrors: UserError[]
    let user: Partial<User>
    let diatonicToken: string

    describe('when Signin is called', () => {
      beforeEach(async () => {
        result = await authResolver.signin(userSignin(), context)
        userErrors = result.userErrors
        user = result.user
        diatonicToken = result.diatonicToken
      })

      it('should call the authservice signin method with user info', () => {
        expect(authService.signin).toHaveBeenCalled()
      })

      it('should return the userErrors, diatonicToken, and user', () => {
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
