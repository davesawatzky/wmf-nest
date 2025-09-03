import type { Performer } from '../entities/performer.entity'
import gql from 'graphql-tag'
import request from 'supertest-graphql'

describe('Performer', () => {
  let regId: number

  beforeAll(async () => {
    const reg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.userId,
        performerType: 'SOLO',
        label: 'Test Form',
      },
    })
    regId = reg.id
  })

  afterAll(async () => {
    await globalThis.prisma.tbl_registration.delete({
      where: {
        id: regId,
      },
    })
  })

  describe('Read full performers list', () => {
    let response: any

    it('Can return the full list of performers', async () => {
      response = await request<{ performers: Performer[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Performers{
            performers {
              id
              pronouns
              firstName
              lastName
              age
              address
              city
              email
              instrument
              level
              unavailable
              otherClasses
              phone
              postalCode
              province
              __typename
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.performers).toBeTruthy()
      expect(response.data.performers.length).toBeGreaterThan(1)
    })

    it('Can return the full list of performers with associated registrations', async () => {
      response = await request<{ performers: Performer[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Performers{
            performers {
              id
              firstName
              lastName
              registration {
                id
                confirmation
                label
                createdAt
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.performers.length).toBeGreaterThan(1)
      expect(response.data.performers[0]).toHaveProperty('registration')
      expect(response.data.performers[0].id).toBeTruthy()
    })

    it('Can return the full list of performers with optional registrationID', async () => {
      response = await request<{ performers: Performer[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Performers($registrationId: Int) {
            performers(registrationID: $registrationId) {
              id
              firstName
              lastName
              registration {
                id
                confirmation
                label
                createdAt
              }
            }
          }
        `)
        .variables({
          registrationId: 24,
        })
        .expectNoErrors()
      expect(response.data.performers[0]).toHaveProperty('registration')
      expect(response.data.performers[0].id).toBeTruthy()
    })

    it('Can return a single performer with performerID', async () => {
      response = await request<{ performer: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Performer($performerId: Int!) {
            performer(performerID: $performerId) {
              id
              firstName
              lastName
              registration {
                id
                confirmation
                label
                createdAt
              }
            }
          }
        `)
        .variables({
          performerId: 7,
        })
        .expectNoErrors()
      expect(response.data.performer.lastName).toBe('Zhou')
      expect(response.data.performer.registration.id).toBeTruthy()
    })

    it('Returns an error if nothing is found', async () => {
      response = await request<{ performer: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Performer($performerId: Int) {
            performer(performerID: $performerId) {
              id
              firstName
              lastName
              registration {
                id
                confirmation
                label
                createdAt
              }
            }
          }
        `)
        .variables({
          performerId: 1,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let performerId: number | null

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_performer.delete({
          where: {
            id: performerId,
          },
        })
      }
      catch (error) {
        console.error(error)
      }
    })

    it('Can create a performer', async () => {
      response = await request<{ performerCreate: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation PerformerCreate($registrationId: Int!) {
            performerCreate(registrationID: $registrationId) {
              performer {
                id
                }
              userErrors {
                field 
                message
              }
            }
          } 
        `)
        .variables({
          registrationId: regId,
        })
        .expectNoErrors()
      performerId = await response.data.performerCreate.performer.id
      expect(response.data.performerCreate.performer.id).toBeTypeOf('number')
      expect(response.data.performerCreate.performer.id).toBeTruthy()
    })

    it('Can create a performer with performer Input', async () => {
      response = await request<{ performerCreate: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation PerformerCreate($registrationId: Int!, $performerInput: PerformerInput) {
            performerCreate(registrationID: $registrationId, performerInput: $performerInput) {
              performer {
                id
                firstName
                lastName
                }
              userErrors {
                field 
                message
              }
            }
          } 
        `)
        .variables({
          registrationId: regId,
          performerInput: {
            firstName: 'Performer',
            lastName: 'Test',
          },
        })
        .expectNoErrors()
      performerId = await response.data.performerCreate.performer.id
      expect(response.data.performerCreate.performer.id).toBeTypeOf('number')
      expect(response.data.performerCreate.performer.lastName).toBe('Test')
    })

    it('Returns an error if trying to create a performer without proper registrationId', async () => {
      response = await request<{ performerCreate: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation PerformerCreate($registrationId: Int!, $performerInput: PerformerInput) {
            performerCreate(registrationID: $registrationId, performerInput: $performerInput) {
              performer {
                id
                firstName
                lastName
                }
              userErrors {
                field 
                message
              }
            }
          } 
        `)
        .variables({
          registrationId: regId + 1,
          performerInput: {
            firstName: 'Performer',
            lastName: 'Test',
          },
        })
      expect(response.data.performerCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.performerCreate.performer).toBeNull()
    })
  })

  describe('Update', () => {
    let response: any
    let performerId: number

    beforeAll(async () => {
      response = await globalThis.prisma.tbl_reg_performer.create({
        data: {
          regID: regId,
          firstName: 'Test',
          lastName: 'Performer',
          address: 'Test Address',
        },
      })
      performerId = await response.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_performer.delete({
        where: {
          id: performerId,
        },
      })
    })

    it('Can update any performer', async () => {
      response = await request<{ performerUpdate: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation PerformerUpdate($performerId: Int!, $performerInput: PerformerInput!) {
          performerUpdate(performerID: $performerId, performerInput: $performerInput) {
            performer {
              id
              firstName
              lastName
              address              
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          performerId,
          performerInput: {
            address: 'Updated Address',
          },
        })
        .expectNoErrors()
      expect(response.data.performerUpdate.performer.address).toBe('Updated Address')
      expect(response.data.performerUpdate.performer.firstName).toBe('Test')
    })

    it('Returns userError if incorrect performer id', async () => {
      response = await request<{ performerUpdate: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation PerformerUpdate($performerId: Int!, $performerInput: PerformerInput!) {
          performerUpdate(performerID: $performerId, performerInput: $performerInput) {
            performer {
              id
              firstName
              lastName
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          performerId: performerId + 1,
          performerInput: {
            lastName: 'HuckleBerry',
          },
        })
      expect(response.data.performerUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.performerUpdate.performer).toBeNull()
    })

    it('Returns html status error if missing performer id', async () => {
      response = await request<{ performerUpdate: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation PerformerUpdate($performerId: Int!, $performerInput: PerformerInput!) {
          performerUpdate(performerID: $performerId, performerInput: $performerInput) {
            performer {
              id
              firstName
              lastName
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          performerId: null,
          performerInput: {
            lastName: 'HuckleBerry',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns html status error if any bad input args', async () => {
      response = await request<{ performerUpdate: Performer }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation PerformerUpdate($performerId: Int!, $performerInput: PerformerInput!) {
          performerUpdate(performerID: $performerId, performerInput: $performerInput) {
            performer {
              id
              name
              performerType
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          performerId,
          performerInput: {
            name: 'UpdatedPerformer',
            okeydokey: true,
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let performerId: number

    beforeEach(async () => {
      response = await globalThis.prisma.tbl_reg_performer.create({
        data: {
          regID: regId,
          firstName: 'Test',
          lastName: 'Performer',
        },
      })
      performerId = await response.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_performer.delete({
          where: {
            id: performerId,
          },
        })
      }
      catch (error) {
        console.error(error)
      }
    })

    it('Can delete a performer', async () => {
      response = await request<{ performerDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation PerformerDelete($performerId: Int!) {
          performerDelete(performerID: $performerId) {
            performer {
              id
              firstName
              lastName
            }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          performerId,
        })
        .expectNoErrors()

      const deleteCheck = await globalThis.prisma.tbl_reg_performer.findUnique({
        where: { id: performerId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.performerDelete.performer.lastName).toBe('Performer')
    })

    it('Returns a userError if performer not found', async () => {
      response = await request<{ performerDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation PerformerDelete($performerId: Int!) {
          performerDelete(performerID: $performerId) {
            performer {
              id
              firstName
              lastName
            }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          performerId: performerId + 1,
        })
        .expectNoErrors()
      expect(response.data.performerDelete.userErrors[0].message).toBeTruthy()
    })

    it('Returns status error if performer id not given', async () => {
      response = await request<{ performerDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation PerformerDelete($performerId: Int!) {
          performerDelete(performerID: $performerId) {
            performer {
              id
              name
            }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          performerId: null,
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })
})
