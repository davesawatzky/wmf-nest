import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { AuthPayload } from '../entities/auth.entity'
import { userSignup } from '../stubs/signup'

describe('Signin', () => {
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
  })

  afterAll(async () => {
    await globalThis.prisma.tbl_user.delete({
      where: {
        email: userSignup()[0].email,
      },
    })
  })

  describe('User does not exist', () => {
    describe('When a signIn mutation is executed with false credentials', () => {
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(globalThis.httpServer)
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
                  isActive
                }
              }
            }
          `)
          .variables({
            credentials: {
              email: 'user@doesnotexist.com',
              password: 'falsepassword',
            },
          })
      })

      afterAll(async () => {})

      it('should return an Error and not a user', () => {
        expect(response.data).toBeNull()
        expect(response.errors).toBeDefined()
        expect(response.errors[0].message).toBe('Incorrect Email or Password')
      })
    })

    describe('When a signIn mutation is executed with incorrect password', () => {
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(globalThis.httpServer)
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
                  isActive
                }
              }
            }
          `)
          .variables({
            credentials: {
              email: userSignup()[0].email,
              password: 'wrongpassword',
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
      it('Should have the "isActive" field set to false', async () => {
        const result = await globalThis.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[0].email,
          },
        })
        expect(result.isActive).toBe(false)
      })
    })

    describe('When signing in with correct details, but not confirmed', () => {
      let signedInUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(globalThis.httpServer)
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
            credentials: {
              email: userSignup()[0].email,
              password: userSignup()[0].password,
            },
          })
        signedInUser = response.data.signin
      })

      afterAll(async () => {})

      it('should return an unconfirmed email Error in data', () => {
        expect(signedInUser).toBeDefined()
        expect(signedInUser.userErrors[0].message).not.toBeNull()
        expect(signedInUser.diatonicToken).toBeNull()
      })
      it('Should have the "has_signed_in" field still set to false', async () => {
        const result = await globalThis.prisma.tbl_user.findUnique({
          where: {
            email: userSignup()[0].email,
          },
        })
        expect(result.isActive).toBe(false)
      })
    })
  })

  describe('User has confirmed email', () => {
    beforeAll(async () => {
      await globalThis.prisma.tbl_user.update({
        data: {
          emailConfirmed: true,
        },
        where: {
          email: userSignup()[0].email,
        },
      })
    })

    describe('User Signs in for the first time', () => {
      let signedInUser: AuthPayload
      let response: any

      beforeAll(async () => {
        response = await request<{ signin: AuthPayload }>(globalThis.httpServer)
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
                  isActive
                }
              }
            }
          `)
          .variables({
            credentials: {
              email: userSignup()[0].email,
              password: userSignup()[0].password,
            },
          })
        signedInUser = response.data.signin
      })

      it('Should return user details and diatonic token', () => {
        expect(signedInUser.diatonicToken).toBeTruthy()
        expect(signedInUser.user.email).toBe(userSignup()[0].email)
      })
    })
  })
})
