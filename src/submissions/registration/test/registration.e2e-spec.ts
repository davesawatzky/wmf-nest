import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Registration } from '../entities/registration.entity'

describe('Registration', () => {
  describe('Read all registrations', () => {
    let response: any
    it('Should return full registration list', () => {
      response = request<{ registrations: Registration[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Registrations {
            registrations {
              id
              confirmation
              label
              createdAt
              __typename
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.registrations).toBeTruthy()
      expect(response.data.registrations.length).toBeGreaterThan(0)
    })
    it('Can read all registrations according to performerType', () => {})
    it('Can read all registrations according to userID', () => {})
    it('Will only return registrations for logged in user', () => {})
    it('Will not return a password with user details', () => {})
    it('Will return all necessary resolved fields', () => {})
    it('Can return a single registration using registration id', () => {})
    it('Will return an error if nothing is found', () => {})
  })

  describe('Create registration', () => {
    it('Admin can create a new registration for any user', () => {})
    it('User can only create a new registration for themselves', () => {})
    it('Can create a new registration with an optional label', () => {})
    it('Returns userError if no userID given', () => {})
  })

  describe('Update registration', () => {
    it('Admin can update any registration', () => {})
    it('User can only update their own registration', () => {})
    it('Can update a registration details', () => {})
    it('Returns userError if no registrationID given', () => {})
    it('Returns userError if improper registration input given', () => {})
    it('Returns error if no registration is found', () => {})
  })

  describe('Delete registration', () => {
    it('Admin can delete any registration', () => {})
    it('User can only delete their own registration', () => {})
    it('Can delete a registration', () => {})
    it('Returns userError if no registrationID given', () => {})
    it('Returns error if no registration is found', () => {})
  })
})
