import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {Community, CommunityPayload} from '../entities/community.entity'

describe('Community', () => {
  
  describe('Read full communities list', () => {
    let response: any

    it('Can return the full list of communities', async () => {
      response = await request<{communities: Community[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
      response = await request<{communities: Community[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
      response = await request<{communities: Community[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          registrationId: 1302
        })
        .expectNoErrors()
      expect(response.data.communities[0]).toHaveProperty('registration')
      expect(response.data.communities[0].id).toBeTruthy()
    })

    it('Can return a single list of communities with optional regID', async () => {
      response = await request<{communities: Community[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          registrationId: 1302
        })
        .expectNoErrors()
      expect(response.data.community.name).toContain('Louis Riel')
      expect(response.data.community.registration.id).toBeTruthy()
    })

    it('Can return a single community with optional communityID', async () => {
      response = await request<{communities: Community[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          registrationId: null
        })
        .expectNoErrors()
      expect(response.data.community.name).toContain('Louis Riel')
      expect(response.data.community.registration.id).toBeTruthy()
    })

    it('Returns and error if nothing is found', async () => {
      response = await request<{communities: Community[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          registrationId: null
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let communityId: number
    
    it('Can create a community', async () => {
      response = await request<{communityCreate: Community}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          mutation CommunityCreate($registrationId: Int!) {
            communityCreate(registrationID: $registrationId) {
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
        .variables({
          registrationId: 1500
        })
        .expectNoErrors()
    })
  })
})