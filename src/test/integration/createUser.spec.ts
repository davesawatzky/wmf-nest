import request from 'supertest-graphql'
import { describe, beforeAll, afterAll, test, expect } from 'vitest'
import gql from 'graphql-tag'
import { IntegrationTestManager } from '../IntegrationTestManager'
import { AuthPayload } from '../../auth/entities/auth.entity'
import { PrismaService } from '../../prisma/prisma.service'
import { userStub } from '../../user/test/stubs/user.stub'

describe('Create a new User', () => {
  const integrationTestManager = new IntegrationTestManager()
  const prisma = new PrismaService()

  beforeAll(async () => {
    await integrationTestManager.beforeAll()
  })

  afterAll(async () => {
    await integrationTestManager.afterAll()
  })

  describe('Given that the user does not already exist', () => {
    describe('When a signup mutation is executed', () => {
      let createdUser: AuthPayload

      beforeAll(async () => {
        const response = await request<{ signup: AuthPayload }>(
          integrationTestManager.httpServer
        )
          .mutate(gql`
            mutation SignUp($credentials: CredentialsSignup!) {
              signup(credentials: $credentials) {
                user {
                  firstName
                  lastName
                }
                userErrors {
                  message
                }
              }
            }
          `)
          .variables({
            credentials: {
              firstName: userStub.firstName,
              lastName: userStub.lastName,
              email: userStub.email,
              password: userStub.password,
            },
          })
        // .expectNoErrors()
        createdUser = response.data.signup
      })

      test('the response should be the AuthPayload ', () => {
        expect(createdUser).toMatchObject({
          userErrors: [],
          user: { firstName: userStub.firstName },
        })
      })
      test('new user should be created', async () => {
        const user = await prisma.tbl_user.findUnique({
          where: { email: userStub.email },
        })
        expect(user).toBeDefined()
      })
    })
  })
})
