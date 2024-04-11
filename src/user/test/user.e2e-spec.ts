import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {User, UserPayload} from '../entities/user.entity'
import {UserError} from '@/common.entity'

describe('User', () => {

  let testUserId: number

  describe('Read full User List', () => {
    let response: any
    
    it('Should return a list of users', async () => {
      response = await request<{users: User}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
            apartment
            streetNumber
            streetName
            city
            province
            postalCode
            phone
            emailConfirmed
            staff
            admin
            hasSignedIn
          }
        }`)
        .expectNoErrors()
      expect(response.data.users[0].firstName).toBeTruthy()
      expect(response.data.users[0].lastName).toBeTruthy()
      expect(response.data.users[0].id).toBeTruthy()
    })

    it('Should return a list of users and associated registrations', async () => {
      response = await request<{users: User}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
      expect(response.data.users[0].firstName).toBeTruthy()
      expect(response.data.users[0].lastName).toBeTruthy()
      expect(response.data.users[0]).toHaveProperty('registrations')
    })
  })

  describe('MyUser', () => {
    let response: any

    it('Should return ones own user details from the user id in context', async () => {
      response = await request<{myUser: User}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
    let userId: number
  
    it('Should return a single user using user id', async () => {
      response = await request<{user: User}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query User($userId: Int!) {
            user(userID: $userId) {
              id
              firstName
              lastName
            }
          }`)
        .variables({
          userId: 3
        })
        .expectNoErrors()
      expect(response.data.user.firstName).toBeTruthy()
      expect(response.data.user.id).toBeTruthy()
    })

    it('Returns a single user with associated registrations', async () => {
      response = await request<{user: User}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          userId: 10
        })
        .expectNoErrors()
      expect(response.data.user.registrations[0].id).toBeTruthy()
      expect(response.data.user.registrations[0].label).toBeTruthy()
    })

    it('Returns a single user using their email address', async () => {
      response = await request<{user: User}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query User($email: String!) {
            user(email: $email) {
              id
              firstName
              lastName
            }
          }`)
        .variables({
          email: 'test_e2e_user@test.com'
        })
        .expectNoErrors()
      expect(response.data.user.firstName).toBeTruthy()
      expect(response.data.user.id).toBeTruthy()
      testUserId = response.data.user.id
    })
  })

  describe('Update User', () => {
    let response: any
    let userErrors: UserError[]

    it('Should update a user', async () => {
      response = await request<{updateUser: UserPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          }
        })
        .expectNoErrors()
      expect(response.data.userUpdate.user.firstName).toBe('UpdatedFirstName')
      expect(response.data.userUpdate.user.lastName).toBe('UpdatedLastName')
      expect(response.data.userUpdate.user.id).toBe(testUserId)
    })

    it('Should return a userError if user not found', async () => {
      response = await request<{updateUser: UserPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          userId: 9999,
          userInput: {
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
          }
        })
      expect(response.data.userUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.userUpdate.userErrors[0]).toHaveProperty('field')
    })

    it('Should return a userError if new email address already used for another user', async () => {
      response = await request<{updateUser: UserPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          userId: testUserId,
          userInput: {
            email: 'david@diatonic.io',
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
          }
        })
      console.log(response.errors)
      expect(response.data.userUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.userUpdate.userErrors[0]).toHaveProperty('field')
    })

  })
})