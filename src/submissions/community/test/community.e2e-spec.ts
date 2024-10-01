import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Community } from '../entities/community.entity'

describe('Community', () => {
  let regId: number

  beforeAll(async () => {
    const reg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.userId,
        performerType: 'COMMUNITY',
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

  describe('Read full communities list', () => {
    let response: any

    it('Can return the full list of communities', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Communities{
            communities {
              id
              name
              city
              phone
              email
              postalCode
              province
              address
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.communities).toBeTruthy()
      expect(response.data.communities.length).toBeGreaterThan(1)
    })

    it('Can return the full list of communities with associated registrations', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Communities{
            communities {
              id
              name
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
      expect(response.data.communities.length).toBeGreaterThan(1)
      expect(response.data.communities[0]).toHaveProperty('registration')
      expect(response.data.communities[0].id).toBeTruthy()
    })

    it('Can return the full list of communities with registrations and community groups', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Communities{
            communities {
              id
              name
              registration {
                id
                label
              }
              communityGroups {
                id
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.communities.length).toBeGreaterThan(1)
      expect(response.data.communities[0]).toHaveProperty('registration')
      expect(response.data.communities[0]).toHaveProperty('communityGroups')
      expect(response.data.communities[0].communityGroups[0].name).toBeTruthy()
    })

    it('Can return a single community with communityID', async () => {
      response = await request<{ community: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Community($registrationId: Int, $communityId: Int) {
            community(registrationID: $registrationId, communityID: $communityId) {
              id
              name
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
          communityId: 3,
        })
        .expectNoErrors()
      expect(response.data.community.name).toBeTruthy()
      expect(response.data.community.registration.id).toBeTruthy()
    })

    it('Returns an error if nothing is found', async () => {
      response = await request<{ community: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Community($registrationId: Int, $communityId: Int) {
            community(registrationID: $registrationId, communityID: $communityId) {
              id
              name
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
          communityId: 10,
          registrationId: 10,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let communityId: number | null

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_community.delete({
          where: {
            id: communityId,
          },
        })
      }
      catch (error) {}
    })

    it('Can create a community with regId', async () => {
      response = await request<{ communityCreate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation CommunityCreate($registrationId: Int!) {
            communityCreate(registrationID: $registrationId) {
              community {
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
      communityId = await response.data.communityCreate.community.id
      expect(response.data.communityCreate.community.id).toBeTypeOf('number')
      expect(response.data.communityCreate.community.id).toBeTruthy()
    })

    it('Can create a community with community Input', async () => {
      response = await request<{ communityCreate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation CommunityCreate($registrationId: Int!, $communityInput: CommunityInput) {
            communityCreate(registrationID: $registrationId, communityInput: $communityInput) {
              community {
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
          registrationId: regId,
          communityInput: {
            name: 'Test Community',
          },
        })
        .expectNoErrors()
      communityId = await response.data.communityCreate.community.id
      expect(response.data.communityCreate.community.id).toBeTypeOf('number')
      expect(response.data.communityCreate.community.name).toBe('Test Community')
    })

    it('Returns an error if trying to create a community without proper registrationId', async () => {
      response = await request<{ communityCreate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation CommunityCreate($registrationId: Int!, $communityInput: CommunityInput) {
            communityCreate(registrationID: $registrationId, communityInput: $communityInput) {
              community {
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
          registrationId: regId + 1,
          communityInput: {
            name: 'Test Community',
          },
        })
      expect(response.data.communityCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.communityCreate.community).toBeNull()
    })
  })

  describe('Update', () => {
    let response: any
    let communityId: number

    beforeAll(async () => {
      response = await globalThis.prisma.tbl_reg_community.create({
        data: {
          regID: regId,
          name: 'Test Community',
        },
      })
      communityId = await response.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_community.delete({
        where: {
          id: communityId,
        },
      })
    })

    it('Can update any community', async () => {
      response = await request<{ communityUpdate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityUpdate($communityId: Int!, $communityInput: CommunityInput!) {
          communityUpdate(communityID: $communityId, communityInput: $communityInput) {
            community {
              id
              name
              streetName
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          communityId,
          communityInput: {
            streetName: 'Updated Street Name',
          },
        })
        .expectNoErrors()
      expect(response.data.communityUpdate.community.streetName).toBe('Updated Street Name')
      expect(response.data.communityUpdate.community.name).toBe('Test Community')
    })

    it('Returns userError if incorrect community id', async () => {
      response = await request<{ communityUpdate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityUpdate($communityId: Int!, $communityInput: CommunityInput!) {
          communityUpdate(communityID: $communityId, communityInput: $communityInput) {
            community {
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
          communityId: communityId + 1,
          communityInput: {
            streetName: 'Updated Street Name',
          },
        })
      expect(response.data.communityUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.communityUpdate.community).toBeNull()
    })

    it('Returns html status error if missing community id', async () => {
      response = await request<{ communityUpdate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityUpdate($communityId: Int!, $communityInput: CommunityInput!) {
          communityUpdate(communityID: $communityId, communityInput: $communityInput) {
            community {
              id
              name
              streetName
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          communityId: null,
          communityInput: {
            streetName: 'Updated Street Name',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns html status error if any bad input args', async () => {
      response = await request<{ communityUpdate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityUpdate($communityId: Int!, $communityInput: CommunityInput!) {
          communityUpdate(communityID: $communityId, communityInput: $communityInput) {
            community {
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
          communityId,
          communityInput: {
            name: 'Updated Community',
            okeydokey: true,
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let communityId: number

    beforeEach(async () => {
      response = await globalThis.prisma.tbl_reg_community.create({
        data: {
          regID: regId,
          name: 'Test Community',
        },
      })
      communityId = await response.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_community.delete({
          where: {
            id: communityId,
          },
        })
      }
      catch (error) {}
    })

    it('Can delete a community', async () => {
      response = await request<{ communityDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityDelete($communityId: Int!) {
          communityDelete(communityID: $communityId) {
            community {
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
          communityId,
        })
        .expectNoErrors()

      const deleteCheck = await globalThis.prisma.tbl_reg_community.findUnique({
        where: { id: communityId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.communityDelete.community.name).toBe('Test Community')
    })

    it('Returns a userError if community not found', async () => {
      response = await request<{ communityDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityDelete($communityId: Int!) {
          communityDelete(communityID: $communityId) {
            community {
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
          communityId: communityId + 1,
        })
        .expectNoErrors()
      expect(response.data.communityDelete.userErrors[0].message).toBeTruthy()
    })

    it('Returns status error if community id not given', async () => {
      response = await request<{ communityDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityDelete($communityId: Int!) {
          communityDelete(communityID: $communityId) {
            community {
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
          communityId: null,
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })
})
