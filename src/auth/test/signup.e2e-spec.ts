import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { IntegrationTestManager } from '../../test/integrationTestManager'
import { AuthPayload } from '../entities/auth.entity'
import { userSignup } from '../stubs/signup'

describe('Signup', () => {
  const integrationTestManager = new IntegrationTestManager()

  beforeAll(async () => {
    await integrationTestManager.beforeAll()
  })

  afterAll(async () => {
    await integrationTestManager.afterAll()
  })

  describe('User does not exist', () => {
    describe('when a signUp mutation is executed with a normal user', () => {
      let createdUser: AuthPayload

      beforeAll(async () => {
        const response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
              }
            }
          `)
          .variables({
            credentials: userSignup()[0],
          })
        createdUser = response.data.signup
      })

      afterAll(async () => {
        if (!!createdUser) {
          await integrationTestManager.prisma.tbl_user.delete({
            where: {
              email: userSignup()[0].email,
            },
          })
        }
      })

      it('should return a the user email in an AuthPayload object', () => {
        expect(createdUser).toMatchObject({
          userErrors: [],
          user: {
            email: userSignup()[0].email,
          },
        })
      })

      it('Should have created the user in the database', async () => {
        const user = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[0].email,
          },
        })
        expect(user).toBeDefined()
      })
    })

    describe('Normal user signs up without instrument', () => {
      let createdUser: AuthPayload

      beforeAll(async () => {
        const response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
              }
            }
          `)
          .variables({
            credentials: userSignup()[1],
          })
        createdUser = response.data.signup
      })

      afterAll(async () => {
        if (!!createdUser) {
          await integrationTestManager.prisma.tbl_user.delete({
            where: {
              email: userSignup()[1].email,
            },
          })
        }
      })

      it('should return the user email in an AuthPayload object', () => {
        expect(createdUser).toMatchObject({
          userErrors: [],
          user: {
            email: userSignup()[1].email,
          },
        })
      })

      it('Should have created the user in the database', async () => {
        const user = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[1].email,
          },
        })
        expect(user).toBeDefined()
        expect(user.instrument).toBeNull()
      })
    })

    describe('Normal user signs up without Email (username)', () => {
      let createdUser: any
      let response: any

      beforeAll(async () => {
        response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
          await integrationTestManager.prisma.tbl_user.delete({
            where: {
              email: userSignup()[0].email,
            },
          })
        }
      })

      it('should return an Error', () => {
        expect(response.errors).toBeDefined()
      })

      it('should not write user to the database', async () => {
        const user = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[1].email,
          },
        })
        expect(user).toBeNull()
      })
    })

    describe('Normal user signs up with weak Password', () => {
      let createdUser: any
      let response: any

      beforeAll(async () => {
        response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
          await integrationTestManager.prisma.tbl_user.delete({
            where: {
              email: userSignup()[0].email,
            },
          })
        }
      })

      it('should return an Error', () => {
        expect(response.errors).toBeDefined()
      })

      it('should not write user to the database', async () => {
        const user = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[1].email,
          },
        })
        expect(user).toBeNull()
      })
    })

    describe('Private Teacher signs up', () => {
      let createdUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
              }
            }
          `)
          .variables({
            credentials: userSignup()[2],
          })
        createdUser = response.data.signup
      })

      afterAll(async () => {
        if (!!createdUser) {
          await integrationTestManager.prisma.tbl_user.delete({
            where: {
              email: userSignup()[2].email,
            },
          })
        }
      })

      it('should return the user email in an AuthPayload object', () => {
        expect(createdUser).toMatchObject({
          userErrors: [],
          user: {
            email: userSignup()[2].email,
          },
        })
      })

      it('Should have created the user in the database', async () => {
        const user = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[2].email,
          },
        })
        expect(user).toBeDefined()
      })
    })

    describe('School Teacher signs up', () => {
      let createdUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
              }
            }
          `)
          .variables({
            credentials: userSignup()[3],
          })
        createdUser = response.data.signup
      })

      afterAll(async () => {
        if (!!createdUser) {
          await integrationTestManager.prisma.tbl_user.delete({
            where: {
              email: userSignup()[3].email,
            },
          })
        }
      })

      it('should return the user email in an AuthPayload object', () => {
        expect(createdUser).toMatchObject({
          userErrors: [],
          user: {
            email: userSignup()[3].email,
          },
        })
      })

      it('Should have created the user in the database', async () => {
        const user = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[3].email,
          },
        })
        expect(user).toBeDefined()
      })
    })
  })

  describe('Teacher exists but has not created an account yet.', () => {
    beforeAll(async () => {
      await integrationTestManager.prisma.tbl_user.create({
        data: {
          email: 'info@davesawatzky.com',
          firstName: 'Private',
          lastName: 'Teacher',
          password: null,
          privateTeacher: true,
          schoolTeacher: false,
          instrument: null,
        },
      })
    })
    afterAll(async () => {
      await integrationTestManager.prisma.tbl_user.delete({
        where: {
          email: userSignup()[3].email,
        },
      })
    })

    it('Account should be in database without password', async () => {
      const response = await integrationTestManager.prisma.tbl_user.findUnique({
        where: {
          email: userSignup()[3].email,
        },
      })
      expect(response.email).toBeTruthy()
      expect(response.password).toBeNull()
    })

    describe('Teacher adding password to existing account', () => {
      let createdUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
              }
            }
          `)
          .variables({
            credentials: userSignup()[3],
          })
        createdUser = response.data.signup
      })

      it('Should add the password to the existing account', async () => {
        const result = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[3].email,
          },
        })
        expect(result.password).not.toBeNull()
      })
    })
  })

  describe('User Already Exists', () => {
    beforeAll(async () => {
      await integrationTestManager.prisma.tbl_user.create({
        data: userSignup()[0],
      })
    })
    afterAll(async () => {
      await integrationTestManager.prisma.tbl_user.delete({
        where: {
          email: userSignup()[0].email,
        },
      })
    })

    describe('When a signUp mutation is executed with a normal user', () => {
      let createdUser: AuthPayload

      beforeAll(async () => {
        const response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
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
              }
            }
          `)
          .variables({
            credentials: userSignup()[0],
          })
        createdUser = response.data.signup
      })

      it('should return an Error in an AuthPayload object', () => {
        expect(createdUser).toMatchObject({
          userErrors: [{ message: 'User already exists', field: [] }],
          user: null,
        })
      })
    })
  })
})
