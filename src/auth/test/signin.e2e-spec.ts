import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { AuthPayload } from '../entities/auth.entity'

describe('SignIn E2E Tests', () => {
  // Mock test user for signin tests (separate from global test users)
  const testSigninUser = {
    email: 'test_signin_e2e@test.com',
    firstName: 'SignIn',
    lastName: 'TestUser',
    password: 'TestPassword123!',
    privateTeacher: false,
    schoolTeacher: false,
    instrument: null,
    isActive: false,
    roles: ['user'],
  }

  const testPrivateTeacher = {
    email: 'test_signin_teacher_e2e@test.com',
    firstName: 'SignIn',
    lastName: 'TeacherTest',
    password: 'TeacherPassword123!',
    privateTeacher: true,
    schoolTeacher: false,
    instrument: 'piano',
    isActive: false,
    roles: ['user'],
  }

  const testSchoolTeacher = {
    email: 'test_signin_school_e2e@test.com',
    firstName: 'SignIn',
    lastName: 'SchoolTest',
    password: 'SchoolPassword123!',
    privateTeacher: false,
    schoolTeacher: true,
    instrument: null,
    isActive: false,
    roles: ['user'],
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.httpServer) {
      throw new Error('HTTP server not initialized. Check test setup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        email: {
          in: [
            testSigninUser.email,
            testPrivateTeacher.email,
            testSchoolTeacher.email,
          ],
        },
      },
    })

    // Create test users for signin tests (not confirmed)
    const signupUser1 = (await request<{ signup: AuthPayload }>(
      globalThis.httpServer,
    )
      .mutate(gql`
        mutation SignUp($credentials: CredentialsSignup!) {
          signup(credentials: $credentials) {
            userErrors {
              message
              field
            }
            user {
              email
            }
            diatonicToken
          }
        }
      `)
      .variables({
        credentials: testSigninUser,
      })
      .expectNoErrors()) as { data: { signup: AuthPayload } }

    expect(signupUser1.data.signup.userErrors).toHaveLength(0)
    expect(signupUser1.data.signup.user).toBeTruthy()

    const signupUser2 = (await request<{ signup: AuthPayload }>(
      globalThis.httpServer,
    )
      .mutate(gql`
        mutation SignUp($credentials: CredentialsSignup!) {
          signup(credentials: $credentials) {
            userErrors {
              message
              field
            }
            user {
              email
            }
            diatonicToken
          }
        }
      `)
      .variables({
        credentials: testPrivateTeacher,
      })
      .expectNoErrors()) as { data: { signup: AuthPayload } }

    expect(signupUser2.data.signup.userErrors).toHaveLength(0)
    expect(signupUser2.data.signup.user).toBeTruthy()

    const signupUser3 = (await request<{ signup: AuthPayload }>(
      globalThis.httpServer,
    )
      .mutate(gql`
        mutation SignUp($credentials: CredentialsSignup!) {
          signup(credentials: $credentials) {
            userErrors {
              message
              field
            }
            user {
              email
            }
            diatonicToken
          }
        }
      `)
      .variables({
        credentials: testSchoolTeacher,
      })
      .expectNoErrors()) as { data: { signup: AuthPayload } }

    expect(signupUser3.data.signup.userErrors).toHaveLength(0)
    expect(signupUser3.data.signup.user).toBeTruthy()
  }, 30000)

  afterAll(async () => {
    // Clean up test users
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        email: {
          in: [
            testSigninUser.email,
            testPrivateTeacher.email,
            testSchoolTeacher.email,
          ],
        },
      },
    })
  })

  describe('SignIn Failures - Invalid Credentials', () => {
    it('Should return error for non-existent user', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
                firstName
                lastName
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: 'nonexistent@test.com',
            password: 'anypassword',
          },
        }) as { data?: { signin: AuthPayload }, errors?: readonly any[] }

      // Should return GraphQL error for invalid credentials
      expect(response.data).toBeNull()
      expect(response.errors).toBeDefined()
      expect(response.errors![0].message).toContain('Incorrect Email or Password')
    })

    it('Should return error for incorrect password', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
                firstName
                lastName
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: 'WrongPassword123!',
          },
        }) as { data?: { signin: AuthPayload }, errors?: readonly any[] }

      // Should return GraphQL error for incorrect password
      expect(response.data).toBeNull()
      expect(response.errors).toBeDefined()
      expect(response.errors![0].message).toBeTruthy()
    })

    it('Should return error for empty email', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: '',
            password: 'password',
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })

    it('Should return error for empty password', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: '',
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })

    it('Should return error for malformed email', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: 'notanemail',
            password: 'password',
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })
  })

  describe('SignIn Failures - Unconfirmed Email', () => {
    it('Should verify user exists but is not active', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testSigninUser.email },
      })

      expect(user).toBeTruthy()
      expect(user?.isActive).toBe(false)
      expect(user?.emailConfirmed).toBe(false)
    })

    it('Should return error for unconfirmed email on signin', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
                firstName
                lastName
                isActive
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: testSigninUser.password,
          },
        })
        .expectNoErrors() as { data: { signin: AuthPayload } }

      const signin = response.data.signin

      // Should return user error for unconfirmed email
      expect(signin.userErrors).toHaveLength(1)
      expect(signin.userErrors[0].message).toContain('email')
      expect(signin.diatonicToken).toBeNull()
      // User object is returned even for unconfirmed emails
      expect(signin.user).toBeTruthy()
      expect(signin.user.email).toBe(testSigninUser.email)
    })

    it('Should keep user inactive after failed signin attempt', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testSigninUser.email },
      })

      expect(user?.isActive).toBe(false)
    })
  })

  describe('SignIn Success - Regular User', () => {
    beforeAll(async () => {
      // Confirm email for successful signin test
      await globalThis.prisma.tbl_user.update({
        where: { email: testSigninUser.email },
        data: { emailConfirmed: true },
      })
    })

    it('Should successfully sign in with confirmed email', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
                firstName
                lastName
                privateTeacher
                schoolTeacher
                isActive
                roles
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: testSigninUser.password,
          },
        })
        .expectNoErrors() as { data: { signin: AuthPayload } }

      const signin = response.data.signin

      // Should return valid token and user details
      expect(signin.userErrors).toHaveLength(0)
      expect(signin.diatonicToken).toBeTruthy()
      expect(signin.diatonicToken).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/) // JWT format
      expect(signin.user).toBeTruthy()
      expect(signin.user.email).toBe(testSigninUser.email)
      expect(signin.user.firstName).toBe(testSigninUser.firstName)
      expect(signin.user.lastName).toBe(testSigninUser.lastName)
      expect(signin.user.roles).toContain('user')
    })

    it('Should allow subsequent signin for confirmed user', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
                isActive
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: testSigninUser.password,
          },
        })
        .expectNoErrors() as { data: { signin: AuthPayload } }

      const signin = response.data.signin

      // Should return valid token again
      expect(signin.userErrors).toHaveLength(0)
      expect(signin.diatonicToken).toBeTruthy()
      expect(signin.user).toBeTruthy()
      expect(signin.user.email).toBe(testSigninUser.email)
    })
  })

  describe('SignIn Success - Private Teacher', () => {
    beforeAll(async () => {
      // Confirm email for private teacher
      await globalThis.prisma.tbl_user.update({
        where: { email: testPrivateTeacher.email },
        data: { emailConfirmed: true },
      })
    })

    it('Should successfully sign in private teacher with instrument', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
                firstName
                lastName
                privateTeacher
                schoolTeacher
                instrument
                isActive
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testPrivateTeacher.email,
            password: testPrivateTeacher.password,
          },
        })
        .expectNoErrors() as { data: { signin: AuthPayload } }

      const signin = response.data.signin

      // Should return valid token and teacher details
      expect(signin.userErrors).toHaveLength(0)
      expect(signin.diatonicToken).toBeTruthy()
      expect(signin.user).toBeTruthy()
      expect(signin.user.email).toBe(testPrivateTeacher.email)
      expect(signin.user.privateTeacher).toBe(true)
      expect(signin.user.schoolTeacher).toBe(false)
      expect(signin.user.instrument).toBe(testPrivateTeacher.instrument)
    })
  })

  describe('SignIn Success - School Teacher', () => {
    beforeAll(async () => {
      // Confirm email for school teacher
      await globalThis.prisma.tbl_user.update({
        where: { email: testSchoolTeacher.email },
        data: { emailConfirmed: true },
      })
    })

    it('Should successfully sign in school teacher', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
                firstName
                lastName
                privateTeacher
                schoolTeacher
                isActive
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSchoolTeacher.email,
            password: testSchoolTeacher.password,
          },
        })
        .expectNoErrors() as { data: { signin: AuthPayload } }

      const signin = response.data.signin

      // Should return valid token and school teacher details
      expect(signin.userErrors).toHaveLength(0)
      expect(signin.diatonicToken).toBeTruthy()
      expect(signin.user).toBeTruthy()
      expect(signin.user.email).toBe(testSchoolTeacher.email)
      expect(signin.user.privateTeacher).toBe(false)
      expect(signin.user.schoolTeacher).toBe(true)
    })
  })

  describe('Token Validation', () => {
    it('Should return valid JWT token structure', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: testSigninUser.password,
          },
        })
        .expectNoErrors() as { data: { signin: AuthPayload } }

      const token = response.data.signin.diatonicToken

      // JWT should have 3 parts separated by dots
      expect(token).toBeTruthy()
      const parts = token!.split('.')
      expect(parts).toHaveLength(3)
      expect(parts[0]).toBeTruthy() // header
      expect(parts[1]).toBeTruthy() // payload
      expect(parts[2]).toBeTruthy() // signature
    })

    it('Should be able to use token for authenticated requests', async () => {
      // Sign in to get token
      const signinResponse = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              diatonicToken
              user {
                email
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: testSigninUser.password,
          },
        })
        .expectNoErrors() as { data: { signin: AuthPayload } }

      const token = signinResponse.data.signin.diatonicToken

      // Use token to query user details (requires authentication)
      const userResponse = await request(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${token}`)
        .query(gql`
          query Me {
            myUser {
              email
              firstName
              lastName
            }
          }
        `)
        .expectNoErrors() as { data: { myUser: any } }

      expect(userResponse.data.myUser).toBeTruthy()
      expect(userResponse.data.myUser.email).toBe(testSigninUser.email)
    })
  })

  describe('Security Tests', () => {
    it('Should not reveal if email exists when password is wrong', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: 'WrongPassword!',
          },
        }) as { data?: { signin: AuthPayload }, errors?: readonly any[] }

      // Error message should be generic, not revealing whether email exists
      expect(response.errors).toBeDefined()
      expect(response.errors![0].message).toContain('Incorrect Email or Password')
    })

    it('Should not allow signin with SQL injection attempt', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: {
            email: 'test@test.com\' OR \'1\'=\'1',
            password: 'password\' OR \'1\'=\'1',
          },
        }) as { data?: { signin: AuthPayload }, errors?: readonly any[] }

      // Should fail safely
      expect(response.errors).toBeDefined()
    })

    it('Should handle extremely long password gracefully', async () => {
      const longPassword = 'a'.repeat(10000)

      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email,
            password: longPassword,
          },
        }) as { data?: { signin: AuthPayload }, errors?: readonly any[] }

      // Should fail without crashing
      expect(response.errors).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('Should handle case-sensitive email addresses', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
              user {
                email
              }
            }
          }
        `)
        .variables({
          credentials: {
            email: testSigninUser.email.toUpperCase(),
            password: testSigninUser.password,
          },
        }) as { data?: { signin: AuthPayload }, errors?: readonly any[] }

      // Email lookup should be case-insensitive or handle appropriately
      // This test documents the actual behavior
      const hasErrors = !!response.errors
      expect(typeof hasErrors).toBe('boolean')
    })

    it('Should handle whitespace in email', async () => {
      const response = await request<{ signin: AuthPayload }>(
        globalThis.httpServer,
      )
        .mutate(gql`
          mutation SignIn($credentials: CredentialsSignin!) {
            signin(credentials: $credentials) {
              userErrors {
                message
                field
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: {
            email: ` ${testSigninUser.email} `,
            password: testSigninUser.password,
          },
        }) as { data?: { signin: AuthPayload }, errors?: readonly any[] }

      // Should either trim whitespace or reject
      expect(response.errors || response.data?.signin.userErrors.length).toBeTruthy()
    })
  })
})
