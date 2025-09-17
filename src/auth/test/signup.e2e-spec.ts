import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { AuthPayload } from '../entities/auth.entity'
import { userSignup } from '../stubs/signup'

describe('Signup', () => {
  describe('When a signUp mutation is executed with a normal user', () => {
    let response: any

    beforeAll(async () => {
      response = await request<{ signup: AuthPayload }>(globalThis.httpServer)
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
          credentials: userSignup()[0],
        })
        .expectNoErrors()
    })

    afterAll(async () => {
      if (response.data.signup) {
        await globalThis.prisma.tbl_user.delete({
          where: {
            email: userSignup()[0].email,
          },
        })
      }
      response = null
    })

    it('Should return the user email in an AuthPayload object', async () => {
      expect(await response.data.signup).toMatchObject({
        userErrors: [],
        user: {
          email: userSignup()[0].email,
        },
        diatonicToken: null,
      })
    })

    it('Should have created the user in the database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[0].email,
        },
      })
      expect(user).toBeTruthy()
    })
  })

  describe('Normal user signs up without instrument', () => {
    let response: any

    beforeAll(async () => {
      response = await request<{ signup: AuthPayload }>(globalThis.httpServer)
        .mutate(gql`
          mutation SignUp($credentials: CredentialsSignup!) {
            signup(credentials: $credentials) {
              userErrors {
                message
                field
              }
              user {
                email
                instrument
              }
              diatonicToken
            }
          }
        `)
        .variables({
          credentials: userSignup()[1],
        })
        .expectNoErrors()
    })

    afterAll(async () => {
      if (response.data.signup) {
        await globalThis.prisma.tbl_user.delete({
          where: {
            email: userSignup()[1].email,
          },
        })
      }
    })

    it('should return the user email in an AuthPayload object', async () => {
      expect(await response.data.signup).toMatchObject({
        userErrors: [],
        user: {
          email: userSignup()[1].email,
          instrument: null,
        },
        diatonicToken: null,
      })
    })

    it('Should have created the user in the database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[1].email,
        },
      })
      expect(user).toBeDefined()
      // expect(user.instrument).toBeNull()
    })
  })

  describe('Normal user signs up without Email (username)', () => {
    let response: any

    beforeAll(async () => {
      response = await request<{ signup: AuthPayload }>(globalThis.httpServer)
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
              diatonic
            }
          }
        `)
        .variables({
          credentials: {
            email: null,
            password: userSignup()[0].password,
            firstName: userSignup()[0].firstName,
            lastName: userSignup()[0].lastName,
            instrument: userSignup()[0].instrument,
            privateTeacher: userSignup()[0].privateTeacher,
            schoolTeacher: userSignup()[0].schoolTeacher,
          },
        })
    })

    afterAll(async () => {
      if (!response.errors) {
        await globalThis.prisma.tbl_user.delete({
          where: {
            email: userSignup()[0].email,
          },
        })
      }
    })

    it('should return an Error', async () => {
      expect(await response.errors).toBeDefined()
    })

    it('should not write user to the database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[1].email,
        },
      })
      expect(user).toBeNull()
    })
  })

  describe('Normal user signs up with weak Password', () => {
    let response: any

    beforeAll(async () => {
      response = await request<{ signup: AuthPayload }>(globalThis.httpServer)
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
            }
          }
        `)
        .variables({
          credentials: {
            email: userSignup()[0].email,
            password: 'weakpassword',
            firstName: userSignup()[0].firstName,
            lastName: userSignup()[0].lastName,
            instrument: userSignup()[0].instrument,
            privateTeacher: userSignup()[0].privateTeacher,
            schoolTeacher: userSignup()[0].schoolTeacher,
          },
        })
    })

    afterAll(async () => {
      if (!response.errors) {
        await globalThis.prisma.tbl_user.delete({
          where: {
            email: userSignup()[0].email,
          },
        })
      }
    })

    it('should return an Error', async () => {
      expect(await response.errors).toBeDefined()
    })

    it('should not write user to the database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[1].email,
        },
      })
      expect(user).toBeNull()
    })
  })

  describe('Private Teacher signs up', () => {
    let response: any

    beforeAll(async () => {
      response = await request<{ signup: AuthPayload }>(globalThis.httpServer)
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
          credentials: userSignup()[2],
        })
        .expectNoErrors()
    })

    afterAll(async () => {
      if (response) {
        await globalThis.prisma.tbl_user.delete({
          where: {
            email: userSignup()[2].email,
          },
        })
      }
    })

    it('should return the user email in an AuthPayload object', async () => {
      expect(await response.data.signup).toMatchObject({
        userErrors: [],
        user: {
          email: userSignup()[2].email,
        },
        diatonicToken: null,
      })
    })

    it('Should have created the user in the database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[2].email,
        },
      })
      expect(user).toBeDefined()
    })
  })

  describe('School Teacher signs up', () => {
    let response: any

    beforeAll(async () => {
      response = await request<{ signup: AuthPayload }>(globalThis.httpServer)
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
          credentials: userSignup()[3],
        })
        .expectNoErrors()
    })

    afterAll(async () => {
      if (response) {
        await globalThis.prisma.tbl_user.delete({
          where: {
            email: userSignup()[3].email,
          },
        })
      }
    })

    it('should return the user email in an AuthPayload object', async () => {
      expect(await response.data.signup).toMatchObject({
        userErrors: [],
        user: {
          email: userSignup()[3].email,
        },
        diatonicToken: null,
      })
    })

    it('Should have created the user in the database', async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[3].email,
        },
      })
      expect(user).toBeDefined()
    })
  })

  describe('Teacher exists but has not created an account yet.', () => {
    beforeAll(async () => {
      await globalThis.prisma.tbl_user.create({
        data: {
          email: userSignup()[2].email,
          firstName: userSignup()[2].firstName,
          lastName: userSignup()[2].lastName,
          privateTeacher: userSignup()[2].privateTeacher,
          schoolTeacher: userSignup()[2].schoolTeacher,
          instrument: userSignup()[2].instrument,
          password: null,
        },
      })
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_user.delete({
        where: {
          email: userSignup()[2].email,
        },
      })
    })

    it('Account should be in the database without a password', async () => {
      const response = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[2].email,
        },
      })
      expect(response.email).toBeTruthy()
      expect(response.password).toBeNull()
    })

    it('Should be able to add the password to the existing account', async () => {
      await request<{ signup: AuthPayload }>(globalThis.httpServer)
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
          credentials: userSignup()[2],
        })
        .expectNoErrors()

      const result = await globalThis.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[2].email,
        },
      })
      expect(result.password).toBeTruthy()
    })
  })

  describe('If user already exists in database', () => {
    beforeAll(async () => {
      await request<{ signup: AuthPayload }>(globalThis.httpServer)
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
          credentials: userSignup()[0],
        })
        .expectNoErrors()
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_user.delete({
        where: {
          email: userSignup()[0].email,
        },
      })
    })

    it('should return an Error in an AuthPayload object', async () => {
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
          credentials: userSignup()[0],
        })
      expect(response.data.signup).toMatchObject({
        userErrors: [{ message: 'User already exists', field: ['email'] }],
        user: null,
        diatonicToken: null,
      })
    })
  })
})
