import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { User, UserPayload } from '../entities/user.entity'

describe('User', () => {
  describe('Read full User List', () => {
    let response: any

    it('Should return a list of users', async () => {
      response = await request<{ users: User[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        query {
          users {
            id
            email
            firstName
            lastName
            privateTeacher
            schoolTeacher
            instrument
            address
            city
            province
            postalCode
            phone
            emailConfirmed
            staff
            isActive
          }
        }`)
        .expectNoErrors()
      expect(response.data.users[1].firstName).toBeTruthy()
      expect(response.data.users[1].lastName).toBeTruthy()
      expect(response.data.users[1].id).toBeTruthy()
    })

    it('Should return a list of users and associated registrations', async () => {
      response = await request<{ users: User[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        query {
          users {
            id
            email
            firstName
            lastName
            registrations {
              id
              label
            }
          }
        }`)
        .expectNoErrors()
      expect(response.data.users[1].firstName).toBeTruthy()
      expect(response.data.users[1].lastName).toBeTruthy()
      expect(response.data.users[1]).toHaveProperty('registrations')
    })
  })

  describe('MyUser', () => {
    let response: any

    it('Should return ones own user details from the user id in context', async () => {
      response = await request<{ myUser: User }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        query {
          myUser {
            id
            firstName
            }
        }`)
        .expectNoErrors()
      expect(response.data.myUser.firstName).toBeTruthy()
      expect(response.data.myUser.id).toBeTruthy()
    })
  })

  describe('Return single user', () => {
    let response: any

    it('Should return a single user using user id', async () => {
      response = await request<{ user: User }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query User($userId: Int!) {
            user(userID: $userId) {
              id
              firstName
              lastName
            }
          }`)
        .variables({
          userId: 3,
        })
        .expectNoErrors()
      expect(response.data.user.firstName).toBeTruthy()
      expect(response.data.user.id).toBeTruthy()
    })

    it('Returns a single user with associated registrations', async () => {
      response = await request<{ user: User }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query User($userId: Int!) {
            user(userID: $userId) {
              id
              firstName
              lastName
              registrations {
                id
                label
              }
            }
          }`)
        .variables({
          userId: 10,
        })
        .expectNoErrors()
      expect(response.data.user.registrations[0].id).toBeTruthy()
      expect(response.data.user.registrations[0].label).toBeTruthy()
    })

    it('Returns a single user using their email address', async () => {
      response = await request<{ user: User }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query User($email: String!) {
            user(email: $email) {
              id
              firstName
              lastName
            }
          }`)
        .variables({
          email: 'test_e2e_admin@test.com',
        })
        .expectNoErrors()
      expect(response.data.user.firstName).toBeTruthy()
      expect(response.data.user.id).toBeTruthy()
    })
  })

  describe('Update User', () => {
    let testUserId: number
    let response: any

    beforeAll(async () => {
      const user = await globalThis.prisma.tbl_user.findUnique({
        where: { email: 'test_e2e_admin@test.com' },
      })
      testUserId = user.id
    })

    it('Should update a user', async () => {
      response = await request<{ updateUser: UserPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation UserUpdate($userId: Int!, $userInput: UserInput!) {
            userUpdate(userID: $userId, userInput: $userInput) {
              user {
                id
                firstName
                lastName
              }
              userErrors {
                message
                field
              }
            }
          }
        `)
        .variables({
          userId: testUserId,
          userInput: {
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
          },
        })
        .expectNoErrors()
      expect(response.data.userUpdate.user.firstName).toBe('UpdatedFirstName')
      expect(response.data.userUpdate.user.lastName).toBe('UpdatedLastName')
      expect(response.data.userUpdate.user.id).toBe(testUserId)
    })

    it('Should return a userError if user not found', async () => {
      response = await request<{ updateUser: UserPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation UserUpdate($userId: Int!, $userInput: UserInput!) {
            userUpdate(userID: $userId, userInput: $userInput) {
              userErrors {
                message
                field
              }
              user {
                id
                firstName
                lastName
              }
            }
          }
        `)
        .variables({
          userId: testUserId + 1,
          userInput: {
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
          },
        })
      expect(response.data.userUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.userUpdate.userErrors[0]).toHaveProperty('field')
    })

    // it('Should return a userError if new email address already used for another user', async () => {
    //   response = await request<{updateUser: UserPayload}>(globalThis.httpServer)
    //     .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
    //     .query(gql`
    //       mutation UserUpdate($userId: Int!, $userInput: UserInput!) {
    //         userUpdate(userID: $userId, userInput: $userInput) {
    //           userErrors {
    //             message
    //             field
    //           }
    //           user {
    //             id
    //             firstName
    //             lastName
    //           }
    //         }
    //       }
    //     `)
    //     .variables({
    //       userId: testUserId,
    //       userInput: {
    //         email: 'david@diatonic.io',
    //         firstName: 'UpdatedFirstName',
    //         lastName: 'UpdatedLastName',
    //       }
    //     })
    //   console.log(response.errors)
    //   expect(response.data.userUpdate.userErrors[0].message).toBeTruthy()
    //   expect(response.data.userUpdate.userErrors[0]).toHaveProperty('field')
    // })
  })

  describe('Delete User', () => {
    let response: any
    let newUserId: number

    beforeEach(async () => {
      try {
        const newUser = await globalThis.prisma.tbl_user.create({
          data: {
            email: 'test.delete@test.com',
            firstName: 'User',
            lastName: 'Delete',
            password: 'password',
            privateTeacher: false,
            schoolTeacher: false,
            staff: false,
            roles: ['user'],
          },
        })
        newUserId = newUser.id
      }
      catch (error) {
        console.error(error)
      }
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_user.delete({
          where: {
            email: 'test.delete@test.com',
          },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Should delete a user', async () => {
      response = await request<{ deleteUser: UserPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation UserDelete($userId: Int!) {
            userDelete(userID: $userId) {
              user {
                id
                firstName
                lastName
              }
              userErrors {
                message
                field
              }
            }
          }
        `)
        .variables({
          userId: newUserId,
        })
      const deleteCheck = await globalThis.prisma.tbl_user.findUnique({
        where: { id: newUserId },
      })
      expect(response.data.userDelete.user.id).toBe(newUserId)
      expect(deleteCheck).toBeNull()
    })

    it('Should return an error if the user is not found', async () => {
      response = await request<{ deleteUser: UserPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation UserDelete($userId: Int!) {
            userDelete(userID: $userId) {
              user {
                id
                firstName
                lastName
              }
              userErrors {
                message
                field
              }
            }
          }
        `)
        .variables({
          userId: newUserId + 1,
        })
      expect(response.data.userDelete.userErrors[0].message).toBeTruthy()
      expect(response.data.userDelete.userErrors[0]).toHaveProperty('field')
    })
  })
})
