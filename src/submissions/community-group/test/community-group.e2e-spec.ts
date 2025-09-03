import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { CommunityGroup } from '@/submissions/community-group/entities/community-group.entity'

describe('CommunityGroup', () => {
  let regId: number
  let commId: number

  beforeAll(async () => {
    const reg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.userId,
        performerType: 'COMMUNITY',
        label: 'Test Form',
      },
    })
    regId = await reg.id

    const comm = await globalThis.prisma.tbl_reg_community.create({
      data: {
        regID: regId,
        name: 'Test Community',
      },
    })
    commId = await comm.id
  })

  afterAll(async () => {
    await globalThis.prisma.tbl_reg_community.delete({
      where: {
        id: commId,
      },
    })
    await globalThis.prisma.tbl_registration.delete({
      where: {
        id: regId,
      },
    })
  })

  describe('Read full communityGroups list', () => {
    let response: any

    it('Can return the full list of communityGroups', async () => {
      response = await request<{ communityGroups: CommunityGroup[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query CommunityGroups{
            communityGroups {
              id
              name
              chaperones
              conflictPerformers
              earliestTime
              groupSize
              latestTime
              unavailable
              wheelchairs
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.communityGroups).toBeTruthy()
      expect(response.data.communityGroups.length).toBeGreaterThan(1)
    })

    it('Can return the full list of communityGroups with associated communities and reg', async () => {
      response = await request<{ communityGroups: CommunityGroup[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query CommunityGroups{
            communityGroups {
              id
              name
              groupSize
              community {
                id
                name
                registration {
                  id
                  label
                  createdAt
                }
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.communityGroups[0].community).toHaveProperty('registration')
      expect(response.data.communityGroups[0].community.registration.label).toBeTruthy()
    })

    it('Can return the full list of communityGroups from one community using communityID', async () => {
      response = await request<{ communityGroups: CommunityGroup[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query CommunityGroups{
            communityGroups {
              id
              name
              groupSize
            }
          }
        `)
        .variables({
          communityId: 18,
        })
        .expectNoErrors()
      expect(response.data.communityGroups[0].name).toBeTruthy()
    })

    it('Can return a single communityGroup with communityGroupID with community', async () => {
      response = await request<{ communityGroup: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query CommunityGroup($communityGroupId: Int!) {
            communityGroup(communityGroupID: $communityGroupId) {
              id
              name
              community {
                id
                name
              }
            }
          }
        `)
        .variables({
          communityGroupId: 8,
        })
        .expectNoErrors()
      expect(response.data.communityGroup.name).toBeTruthy()
      expect(response.data.communityGroup.community.name).toBeTruthy()
    })

    it('Returns an error if nothing is found', async () => {
      response = await request<{ communityGroup: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query CommunityGroup($communityGroupId: Int!) {
            communityGroup(communityGroupID: $communityGroupId) {
              id
              name
              community {
                id
                name
              }
            }
          }
        `)
        .variables({
          communityGroupId: 1000,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let communityGroupId: number

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_communitygroup.delete({
          where: {
            id: communityGroupId,
          },
        })
      }
      catch (error) {}
    })

    it('Can create a communityGroup', async () => {
      response = await request<{ communityGroupCreate: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation CommunityGroup($communityId: Int!, $communityGroupInput: CommunityGroupInput) {
            communityGroupCreate(communityID: $communityId, communityGroupInput: $communityGroupInput) {
              communityGroup {
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
          communityId: commId,
        })
        .expectNoErrors()
      communityGroupId = await response.data.communityGroupCreate.communityGroup.id
      expect(response.data.communityGroupCreate.communityGroup.id).toBeTypeOf('number')
      expect(response.data.communityGroupCreate.communityGroup.id).toBeTruthy()
    })

    it('Can create a communityGroup with communityGroup Input', async () => {
      response = await request<{ communityGroupCreate: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation CommunityGroup($communityId: Int!, $communityGroupInput: CommunityGroupInput) {
            communityGroupCreate(communityID: $communityId, communityGroupInput: $communityGroupInput) {
              communityGroup {
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
          communityId: commId,
          communityGroupInput: {
            name: 'Test CommunityGroup',
          },
        })
        .expectNoErrors()
      communityGroupId = await response.data.communityGroupCreate.communityGroup.id
      expect(response.data.communityGroupCreate.communityGroup.id).toBeTypeOf('number')
      expect(response.data.communityGroupCreate.communityGroup.name).toBe('Test CommunityGroup')
    })

    it('Returns an userError if trying to create a communityGroup without valid communityID', async () => {
      response = await request<{ communityGroupCreate: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation CommunityGroup($communityId: Int!, $communityGroupInput: CommunityGroupInput) {
            communityGroupCreate(communityID: $communityId, communityGroupInput: $communityGroupInput) {
              communityGroup {
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
          communityId: commId + 1,
          communityGroupInput: {
            name: 'Test CommunityGroup',
          },
        })
      expect(response.data.communityGroupCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.communityGroupCreate.communityGroup).toBeNull()
    })
  })

  describe('Update', () => {
    let response: any
    let communityGroupId: number

    beforeAll(async () => {
      response = await globalThis.prisma.tbl_reg_communitygroup.create({
        data: {
          communityID: commId,
          name: 'Test CommunityGroup',
          groupSize: 25,
          chaperones: 3,
        },
      })
      communityGroupId = await response.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_communitygroup.delete({
        where: {
          id: communityGroupId,
        },
      })
    })

    it('Can update any communityGroup', async () => {
      response = await request<{ communityGroupUpdate: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityGroupUpdate($communityGroupId: Int!, $communityGroupInput: CommunityGroupInput!) {
          communityGroupUpdate(communityGroupID: $communityGroupId, communityGroupInput: $communityGroupInput) {
            communityGroup {
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
          communityGroupId,
          communityGroupInput: {
            name: 'Updated CommunityGroup',
            groupSize: 30,
          },
        })
        .expectNoErrors()
      expect(response.data.communityGroupUpdate.communityGroup.name).toBe('Updated CommunityGroup')
      expect(response.data.communityGroupUpdate.communityGroup.groupSize).toBe(30)
    })

    it('Returns userError if incorrect communityGroup id', async () => {
      response = await request<{ communityGroupUpdate: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityGroupUpdate($communityGroupId: Int!, $communityGroupInput: CommunityGroupInput!) {
          communityGroupUpdate(communityGroupID: $communityGroupId, communityGroupInput: $communityGroupInput) {
            communityGroup {
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
          communityGroupId: communityGroupId + 1,
          communityGroupInput: {
            name: 'Updated CommunityGroup',
          },
        })
      expect(response.data.communityGroupUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.communityGroupUpdate.communityGroup).toBeNull()
    })

    it('Returns html status error if missing communityGroup id', async () => {
      response = await request<{ communityGroupUpdate: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityGroupUpdate($communityGroupId: Int!, $communityGroupInput: CommunityGroupInput!) {
          communityGroupUpdate(communityGroupID: $communityGroupId, communityGroupInput: $communityGroupInput) {
            communityGroup {
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
          communityGroupId: null,
          communityGroupInput: {
            name: 'Updated CommunityGroup',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns html status error if any bad input args', async () => {
      response = await request<{ communityGroupUpdate: CommunityGroup }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityGroupUpdate($communityGroupId: Int!, $communityGroupInput: CommunityGroupInput!) {
          communityGroupUpdate(communityGroupID: $communityGroupId, communityGroupInput: $communityGroupInput) {
            communityGroup {
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
          communityGroupId,
          communityGroupInput: {
            name: 'Updated CommunityGroup',
            okeydokey: true,
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let communityGroupId: number

    beforeEach(async () => {
      response = await globalThis.prisma.tbl_reg_communitygroup.create({
        data: {
          communityID: commId,
          name: 'Test CommunityGroup',
        },
      })
      communityGroupId = await response.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_communitygroup.delete({
          where: {
            id: communityGroupId,
          },
        })
      }
      catch (error) {}
    })

    it('Can delete a communityGroup', async () => {
      response = await request<{ communityGroupDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityGroupDelete($communityGroupId: Int!) {
          communityGroupDelete(communityGroupID: $communityGroupId) {
            communityGroup {
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
          communityGroupId,
        })
        .expectNoErrors()

      const deleteCheck = await globalThis.prisma.tbl_reg_communitygroup.findUnique({
        where: { id: communityGroupId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.communityGroupDelete.communityGroup.name).toBe('Test CommunityGroup')
    })

    it('Returns a userError if communityGroup not found', async () => {
      response = await request<{ communityGroupDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityGroupDelete($communityGroupId: Int!) {
          communityGroupDelete(communityGroupID: $communityGroupId) {
            communityGroup {
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
          communityGroupId: communityGroupId + 1,
        })
        .expectNoErrors()
      expect(response.data.communityGroupDelete.userErrors[0].message).toBeTruthy()
    })

    it('Returns status error if communityGroup id not given', async () => {
      response = await request<{ communityGroupDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation CommunityGroupDelete($communityGroupId: Int!) {
          communityGroupDelete(communityGroupID: $communityGroupId) {
            communityGroup {
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
          communityGroupId: null,
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })
})
