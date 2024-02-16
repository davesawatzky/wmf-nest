import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { IntegrationTestManager } from '../../test/integrationTestManager'
import { AuthPayload } from '../entities/auth.entity'
import { userSignin } from '../stubs/signin'
import { userSignup } from '../stubs/signup'

describe('Signin', () => {
  const integrationTestManager = new IntegrationTestManager()

  beforeAll(async () => {
    await integrationTestManager.beforeAll()
    await request<{ signup: AuthPayload }>(integrationTestManager.httpServer)
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
  })

  afterAll(async () => {
    await integrationTestManager.prisma.tbl_user.delete({
      where: {
        email: userSignup()[0].email,
      },
    })
    await integrationTestManager.afterAll()
  })

  describe('User does not exist', () => {
    describe('When a signIn mutation is executed with false credentials', () => {
      let signedInUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(
          integrationTestManager.httpServer
        )
          .mutate(gql`
            mutation SignIn($credentials: CredentialsSignin!) {
              signin(credentials: $credentials) {
                userErrors {
                  message
                }
                diatonicToken
                user {
                  email
                  firstName
                  lastName
                  privateTeacher
                  schoolTeacher
                  hasSignedIn
                }
              }
            }
          `)
          .variables({
            credentials: {
              email: 'user@doesnotexist.com',
              password: 'nopassword',
            },
          })
      })

      afterAll(async () => {})

      it('should return an Error and not a user', () => {
        expect(response.data).toBeNull()
        expect(response.errors).toBeDefined()
      })
    })

    describe('When a signIn mutation is executed with incorrect password', () => {
      let signedInUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(
          integrationTestManager.httpServer
        )
          .mutate(gql`
            mutation SignIn($credentials: CredentialsSignin!) {
              signin(credentials: $credentials) {
                userErrors {
                  message
                }
                diatonicToken
                user {
                  email
                  firstName
                  lastName
                  privateTeacher
                  schoolTeacher
                  hasSignedIn
                }
              }
            }
          `)
          .variables({
            credentials: {
              email: userSignin().email,
              password: 'nopassword',
            },
          })
      })

      afterAll(async () => {})

      it('should return an Error and not a user', () => {
        expect(response.data).toBeNull()
        expect(response.errors).toBeDefined()
      })
    })
  })

  describe('User does exist, but not confirmed', () => {
    describe('Has never signed in', () => {
      it('Should have the "has_signed_in" field set to false', async () => {
        const result = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignin().email,
          },
        })
        expect(result.hasSignedIn).toBe(false)
      })
    })

    describe('When signing in with correct details', () => {
      let signedInUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(
          integrationTestManager.httpServer
        )
          .mutate(gql`
            mutation SignIn($credentials: CredentialsSignin!) {
              signin(credentials: $credentials) {
                userErrors {
                  message
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
            credentials: userSignin(),
          })
        signedInUser = response.data.signin
      })

      afterAll(async () => {})

      it('should return an unconfirmed Error in data', () => {
        expect(signedInUser).toBeDefined()
        expect(signedInUser.userErrors[0].message).not.toBeNull()
        expect(signedInUser.diatonicToken).toBeNull()
      })
      it('Should have the "has_signed_in" field still set to false', async () => {
        const result = await integrationTestManager.prisma.tbl_user.findUnique({
          where: {
            email: userSignin().email,
          },
        })
        expect(result.hasSignedIn).toBe(false)
      })
    })
  })

  describe('Confirmed user exists', () => {
    beforeAll(async () => {
      integrationTestManager.prisma.tbl_user.update({
        data: {
          emailConfirmed: true,
        },
        where: {
          email: userSignin().email,
        },
      })
    })

    describe('User Signs in for the first time', () => {
      let signedInUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(
          integrationTestManager.httpServer
        )
          .mutate(gql`
            mutation SignIn($credentials: CredentialsSignin!) {
              signin(credentials: $credentials) {
                userErrors {
                  message
                }
                diatonicToken
                user {
                  email
                  firstName
                  lastName
                  privateTeacher
                  schoolTeacher
                  hasSignedIn
                }
              }
            }
          `)
          .variables({
            credentials: userSignin(),
          })
        signedInUser = response.data.signin
      })

      it('Should return user details and diatonic token', () => {
        expect(signedInUser.diatonicToken).toBeDefined()
        expect(signedInUser.user.email).toBe(userSignin().email)
      })
    })
  })
})
