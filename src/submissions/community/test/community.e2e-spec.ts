import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Community } from '../entities/community.entity'

describe('Community', () => {
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
              groupSize
              chaperones
              conflictPerformers
              earliestTime
              latestTime
              unavailable
              wheelchairs
              __typename
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.communities).toBeTruthy()
      expect(response.data.communities.length).toBeGreaterThan(0)
    })

    it('Can return the full list of communities with associated registrations', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Communities{
            communities {
              id
              name
              groupSize
              chaperones
              conflictPerformers
              earliestTime
              latestTime
              unavailable
              wheelchairs
              __typename
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

    it('Can return the full list of communities with optional registrationID', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Communities($registrationId: Int) {
            communities(registrationID: $registrationId) {
              id
              name
              groupSize
              chaperones
              conflictPerformers
              earliestTime
              latestTime
              unavailable
              wheelchairs
              __typename
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
          registrationId: 1302,
        })
        .expectNoErrors()
      expect(response.data.communities[0]).toHaveProperty('registration')
      expect(response.data.communities[0].id).toBeTruthy()
    })

    it('Can return a single list of communities with optional regID', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Community($communityId: Int, $registrationId: Int) {
            community(communityID: $communityId, registrationID: $registrationId) {
              id
              name
              groupSize
              chaperones
              conflictPerformers
              earliestTime
              latestTime
              unavailable
              wheelchairs
              __typename
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
          communityId: null,
          registrationId: 1302,
        })
        .expectNoErrors()
      expect(response.data.community.name).toContain('Louis Riel')
      expect(response.data.community.registration.id).toBeTruthy()
    })

    it('Can return a single community with optional communityID', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Community($communityId: Int, $registrationId: Int) {
            community(communityID: $communityId, registrationID: $registrationId) {
              id
              name
              groupSize
              chaperones
              conflictPerformers
              earliestTime
              latestTime
              unavailable
              wheelchairs
              __typename
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
          communityId: 18,
          registrationId: null,
        })
        .expectNoErrors()
      expect(response.data.community.name).toContain('Louis Riel')
      expect(response.data.community.registration.id).toBeTruthy()
    })

    it('Returns and error if nothing is found', async () => {
      response = await request<{ communities: Community[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Community($communityId: Int, $registrationId: Int) {
            community(communityID: $communityId, registrationID: $registrationId) {
              id
              name
              groupSize
              chaperones
              conflictPerformers
              earliestTime
              latestTime
              unavailable
              wheelchairs
              __typename
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
          communityId: 1500,
          registrationId: null,
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

    it('Can create a community', async () => {
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

    it('Returns an error if trying to create a community without registrationId', async () => {
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
          registrationId: regId + 1,
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
          name: 'TestCommunity',
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
              groupSize
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
            name: 'UpdatedCommunity',
            groupSize: 25,
          },
        })
        .expectNoErrors()
      expect(response.data.communityUpdate.community.name).toBe('UpdatedCommunity')
      expect(response.data.communityUpdate.community.groupSize).toBe(25)
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
              groupSize
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
            name: 'UpdatedCommunity',
            groupSize: 25,
          },
        })
      expect(response.data.communityUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.communityUpdate.community).toBeNull()
    })

    it('Returns html status error if any missing arguments', async () => {
      response = await request<{ communityUpdate: Community }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityUpdate($communityId: Int!, $communityInput: CommunityInput!) {
          communityUpdate(communityID: $communityId, communityInput: $communityInput) {
            community {
              id
              name
              groupSize
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
            name: 'UpdatedCommunity',
            groupSize: 25,
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
              groupSize
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
            name: 'UpdatedCommunity',
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
          name: 'TestCommunity',
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
      expect(response.data.communityDelete.community.id).toBeTruthy()
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
