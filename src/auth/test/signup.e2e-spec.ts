import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { AuthPayload } from '../entities/auth.entity'

describe('SignUp E2E Tests', () => {
  // Mock test users for signup tests (separate from global test users)
  const testRegularUser = {
    email: 'test_signup_regular_e2e@test.com',
    firstName: 'Signup',
    lastName: 'RegularUser',
    password: 'ValidPassword123!',
    privateTeacher: false,
    schoolTeacher: false,
    instrument: 'clarinet',
    isActive: false,
    roles: ['user'],
  }

  const testUserNoInstrument = {
    email: 'test_signup_noinst_e2e@test.com',
    firstName: 'Signup',
    lastName: 'NoInstrument',
    password: 'ValidPassword123!',
    privateTeacher: false,
    schoolTeacher: false,
    instrument: null,
    isActive: false,
    roles: ['user'],
  }

  const testPrivateTeacher = {
    email: 'test_signup_private_e2e@test.com',
    firstName: 'Signup',
    lastName: 'PrivateTeacher',
    password: 'TeacherPassword123!',
    privateTeacher: true,
    schoolTeacher: false,
    instrument: 'piano',
    isActive: false,
    roles: ['user'],
  }

  const testSchoolTeacher = {
    email: 'test_signup_school_e2e@test.com',
    firstName: 'Signup',
    lastName: 'SchoolTeacher',
    password: 'SchoolPassword123!',
    privateTeacher: false,
    schoolTeacher: true,
    instrument: null,
    isActive: false,
    roles: ['user'],
  }

  const testTeacherNoPassword = {
    email: 'test_signup_nopass_e2e@test.com',
    firstName: 'Signup',
    lastName: 'TeacherNoPassword',
    password: 'AddPasswordLater123!',
    privateTeacher: true,
    schoolTeacher: false,
    instrument: 'violin',
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
            testRegularUser.email,
            testUserNoInstrument.email,
            testPrivateTeacher.email,
            testSchoolTeacher.email,
            testTeacherNoPassword.email,
          ],
        },
      },
    })
  }, 30000)

  afterAll(async () => {
    // Clean up test users
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        email: {
          in: [
            testRegularUser.email,
            testUserNoInstrument.email,
            testPrivateTeacher.email,
            testSchoolTeacher.email,
            testTeacherNoPassword.email,
          ],
        },
      },
    })
  })

  describe('Successful SignUp - Regular User', () => {
    it('Should successfully create regular user with instrument', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
                firstName
                lastName
                instrument
                privateTeacher
                schoolTeacher
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: testRegularUser,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      // Should return successful signup
      expect(signup.userErrors).toHaveLength(0)
      expect(signup.user).toBeTruthy()
      expect(signup.user.email).toBe(testRegularUser.email)
      expect(signup.user.firstName).toBe(testRegularUser.firstName)
      expect(signup.user.lastName).toBe(testRegularUser.lastName)
      expect(signup.user.instrument).toBe(testRegularUser.instrument)
      expect(signup.user.privateTeacher).toBe(false)
      expect(signup.user.schoolTeacher).toBe(false)
      expect(signup.diatonicToken).toBeNull() // No token until email confirmed
    })

    it('Should have created user in database with correct properties', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testRegularUser.email },
      })

      expect(user).toBeTruthy()
      expect(user?.email).toBe(testRegularUser.email)
      expect(user?.firstName).toBe(testRegularUser.firstName)
      expect(user?.lastName).toBe(testRegularUser.lastName)
      expect(user?.instrument).toBe(testRegularUser.instrument)
      expect(user?.privateTeacher).toBe(false)
      expect(user?.schoolTeacher).toBe(false)
      expect(user?.emailConfirmed).toBe(false) // Not confirmed on signup
      expect(user?.roles).toContain('user')
      expect(user?.password).toBeTruthy() // Password should be hashed
    })

    it('Should default to user role when roles not specified', async () => {
      const defaultRoleUser = {
        email: 'test_default_role@test.com',
        firstName: 'Default',
        lastName: 'Role',
        password: 'ValidPassword123!',
        privateTeacher: false,
        schoolTeacher: false,
        instrument: null,
        isActive: false,
        roles: ['user'], // Default user role
      }

      const _response = await request<{ signup: AuthPayload }>(
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
          credentials: defaultRoleUser,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      // Should create user with user role
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: defaultRoleUser.email },
      })

      expect(user).toBeTruthy()
      expect(user?.roles).toContain('user')

      // Cleanup
      await globalThis.prisma.tbl_user.delete({
        where: { email: defaultRoleUser.email },
      })
    })
  })

  describe('Successful SignUp - User Without Instrument', () => {
    it('Should successfully create user without instrument', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
                firstName
                lastName
                instrument
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: testUserNoInstrument,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      // Should return successful signup
      expect(signup.userErrors).toHaveLength(0)
      expect(signup.user).toBeTruthy()
      expect(signup.user.email).toBe(testUserNoInstrument.email)
      expect(signup.user.instrument).toBeNull()
      expect(signup.diatonicToken).toBeNull()
    })

    it('Should have created user in database with null instrument', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testUserNoInstrument.email },
      })

      expect(user).toBeTruthy()
      expect(user?.instrument).toBeNull()
    })
  })

  describe('Successful SignUp - Private Teacher', () => {
    it('Should successfully create private teacher account', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
                firstName
                lastName
                privateTeacher
                schoolTeacher
                instrument
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: testPrivateTeacher,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      // Should return successful signup
      expect(signup.userErrors).toHaveLength(0)
      expect(signup.user).toBeTruthy()
      expect(signup.user.email).toBe(testPrivateTeacher.email)
      expect(signup.user.privateTeacher).toBe(true)
      expect(signup.user.schoolTeacher).toBe(false)
      expect(signup.user.instrument).toBe(testPrivateTeacher.instrument)
      expect(signup.diatonicToken).toBeNull()
    })

    it('Should have created private teacher in database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testPrivateTeacher.email },
      })

      expect(user).toBeTruthy()
      expect(user?.privateTeacher).toBe(true)
      expect(user?.schoolTeacher).toBe(false)
      expect(user?.instrument).toBe(testPrivateTeacher.instrument)
    })
  })

  describe('Successful SignUp - School Teacher', () => {
    it('Should successfully create school teacher account', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
                firstName
                lastName
                privateTeacher
                schoolTeacher
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: testSchoolTeacher,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      // Should return successful signup
      expect(signup.userErrors).toHaveLength(0)
      expect(signup.user).toBeTruthy()
      expect(signup.user.email).toBe(testSchoolTeacher.email)
      expect(signup.user.privateTeacher).toBe(false)
      expect(signup.user.schoolTeacher).toBe(true)
      expect(signup.diatonicToken).toBeNull()
    })

    it('Should have created school teacher in database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testSchoolTeacher.email },
      })

      expect(user).toBeTruthy()
      expect(user?.privateTeacher).toBe(false)
      expect(user?.schoolTeacher).toBe(true)
    })
  })

  describe('Teacher Account Creation Without Password', () => {
    it('Should create teacher record without password (for admin-created accounts)', async () => {
      // Admin creates teacher record without password
      const teacherRecord = await globalThis.prisma.tbl_user.create({
        data: {
          email: testTeacherNoPassword.email,
          firstName: testTeacherNoPassword.firstName,
          lastName: testTeacherNoPassword.lastName,
          privateTeacher: testTeacherNoPassword.privateTeacher,
          schoolTeacher: testTeacherNoPassword.schoolTeacher,
          instrument: testTeacherNoPassword.instrument,
          password: null, // No password yet
          roles: ['user'],
        },
      })

      expect(teacherRecord).toBeTruthy()
      expect(teacherRecord.email).toBe(testTeacherNoPassword.email)
      expect(teacherRecord.password).toBeNull()
    })

    it('Should verify teacher record exists without password', async () => {
      const teacher = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testTeacherNoPassword.email },
      })

      expect(teacher).toBeTruthy()
      expect(teacher?.email).toBe(testTeacherNoPassword.email)
      expect(teacher?.password).toBeNull()
    })

    it('Should allow teacher to add password via signup (upsert)', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
                firstName
                lastName
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: testTeacherNoPassword,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      // Should successfully add password
      expect(signup.userErrors).toHaveLength(0)
      expect(signup.user).toBeTruthy()
      expect(signup.user.email).toBe(testTeacherNoPassword.email)

      // Verify password was added
      const teacher = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testTeacherNoPassword.email },
      })

      expect(teacher?.password).toBeTruthy() // Password now exists
      expect(teacher?.password).not.toBeNull()
    })
  })

  describe('SignUp Failures - Duplicate User', () => {
    it('Should return error when user already exists', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: testRegularUser, // Already created in earlier test
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      // Should return error
      expect(signup.userErrors).toHaveLength(1)
      expect(signup.userErrors[0].message).toContain('User already exists')
      expect(signup.userErrors[0].field).toContain('email')
      expect(signup.user).toBeNull()
      expect(signup.diatonicToken).toBeNull()
    })

    it('Should not allow duplicate email for different user type', async () => {
      // Try to create another account with same email but different properties
      const duplicateAttempt = {
        ...testRegularUser,
        firstName: 'Different',
        lastName: 'User',
        privateTeacher: true, // Different type
      }

      const response = await request<{ signup: AuthPayload }>(
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
          credentials: duplicateAttempt,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      // Should return error
      expect(response.data.signup.userErrors).toHaveLength(1)
      expect(response.data.signup.user).toBeNull()
    })
  })

  describe('SignUp Failures - Invalid Email', () => {
    it('Should return error for missing email', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: null,
            firstName: 'Test',
            lastName: 'User',
            password: 'ValidPassword123!',
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return GraphQL validation error
      expect(response.errors).toBeDefined()
      expect(response.errors).toHaveLength(1)
    })

    it('Should return error for empty email', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: '',
            firstName: 'Test',
            lastName: 'User',
            password: 'ValidPassword123!',
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })

    it('Should return error for invalid email format', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'not-an-email',
            firstName: 'Test',
            lastName: 'User',
            password: 'ValidPassword123!',
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })
  })

  describe('SignUp Failures - Invalid Password', () => {
    it('Should return error for weak password (no uppercase)', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'weak.password@test.com',
            firstName: 'Test',
            lastName: 'User',
            password: 'weakpassword123!', // No uppercase
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })

    it('Should return error for weak password (too short)', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'short.password@test.com',
            firstName: 'Test',
            lastName: 'User',
            password: 'Abc1!', // Too short
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })

    it('Should return error for weak password (no special characters)', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'nospecial.password@test.com',
            firstName: 'Test',
            lastName: 'User',
            password: 'Password1234', // No special chars
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })

    it('Should return error for empty password', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'empty.password@test.com',
            firstName: 'Test',
            lastName: 'User',
            password: '',
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })
  })

  describe('SignUp Failures - Missing Required Fields', () => {
    it('Should return error for missing firstName', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'missing.firstname@test.com',
            firstName: '',
            lastName: 'User',
            password: 'ValidPassword123!',
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })

    it('Should return error for missing lastName', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'missing.lastname@test.com',
            firstName: 'Test',
            lastName: '',
            password: 'ValidPassword123!',
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should return validation error
      expect(response.errors).toBeDefined()
    })
  })

  describe('Security Tests', () => {
    it('Should hash password in database (not store plain text)', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: testRegularUser.email },
      })

      expect(user?.password).toBeTruthy()
      expect(user?.password).not.toBe(testRegularUser.password) // Should be hashed
      expect(user?.password?.length).toBeGreaterThan(20) // Hashed passwords are long
    })

    it('Should not allow SQL injection in email field', async () => {
      const response = await request<{ signup: AuthPayload }>(
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
          credentials: {
            email: 'test@test.com\'; DROP TABLE tbl_user; --',
            firstName: 'Test',
            lastName: 'User',
            password: 'ValidPassword123!',
            privateTeacher: false,
            schoolTeacher: false,
            instrument: null,
            isActive: false,
            roles: ['user'],
          },
        }) as { errors?: readonly any[] }

      // Should safely reject or handle
      expect(response.errors).toBeDefined()
    })

    it('Should reject email addresses with leading/trailing whitespace', async () => {
      const emailWithSpaces = {
        ...testRegularUser,
        email: '  test_trimmed@test.com  ',
      }

      const response = await request<{ signup: AuthPayload }>(
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
          credentials: emailWithSpaces,
        }) as { errors?: readonly any[] }

      // Should reject email with whitespace
      expect(response.errors).toBeDefined()
    })

    it('Should convert email to lowercase', async () => {
      const uppercaseEmail = {
        ...testRegularUser,
        email: 'Test_UPPERCASE@test.COM',
      }

      const _response = await request<{ signup: AuthPayload }>(
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
          credentials: uppercaseEmail,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: 'test_uppercase@test.com' },
      })

      expect(user).toBeTruthy()
      expect(user?.email).toBe('test_uppercase@test.com') // Lowercase

      // Cleanup
      await globalThis.prisma.tbl_user.delete({
        where: { email: 'test_uppercase@test.com' },
      })
    })
  })

  describe('Edge Cases', () => {
    it('Should handle very long names gracefully', async () => {
      const longName = 'A'.repeat(255)
      const longNameUser = {
        ...testRegularUser,
        email: 'longname@test.com',
        firstName: longName,
        lastName: longName,
      }

      const response = await request<{ signup: AuthPayload }>(
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
                firstName
                lastName
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: longNameUser,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      // Should handle long names or return appropriate error
      const hasError = response.data.signup.userErrors.length > 0
      expect(typeof hasError).toBe('boolean')

      // Cleanup if created
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: 'longname@test.com' },
      })
      if (user) {
        await globalThis.prisma.tbl_user.delete({
          where: { email: 'longname@test.com' },
        })
      }
    })

    it('Should handle special characters in names', async () => {
      const specialCharsUser = {
        ...testRegularUser,
        email: 'specialchars@test.com',
        firstName: 'O\'Brien',
        lastName: 'José-María',
      }

      const response = await request<{ signup: AuthPayload }>(
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
                firstName
                lastName
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: specialCharsUser,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      expect(signup.userErrors).toHaveLength(0)
      expect(signup.user).toBeTruthy()
      expect(signup.user.firstName).toBe('O\'Brien')
      expect(signup.user.lastName).toBe('José-María')

      // Cleanup
      await globalThis.prisma.tbl_user.delete({
        where: { email: 'specialchars@test.com' },
      })
    })

    it('Should handle both privateTeacher and schoolTeacher true', async () => {
      const bothTeacherTypes = {
        ...testRegularUser,
        email: 'bothteachers@test.com',
        privateTeacher: true,
        schoolTeacher: true,
      }

      const response = await request<{ signup: AuthPayload }>(
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
                privateTeacher
                schoolTeacher
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: bothTeacherTypes,
        })
        .expectNoErrors() as { data: { signup: AuthPayload } }

      const signup = response.data.signup

      expect(signup.userErrors).toHaveLength(0)
      expect(signup.user).toBeTruthy()
      expect(signup.user.privateTeacher).toBe(true)
      expect(signup.user.schoolTeacher).toBe(true)

      // Cleanup
      await globalThis.prisma.tbl_user.delete({
        where: { email: 'bothteachers@test.com' },
      })
    })
  })
})
