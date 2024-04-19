import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {Group, GroupPayload} from '../entities/group.entity'

describe('Group', () => {

  let regId: number

  beforeAll(async () => {
    const reg = await global.prisma.tbl_registration.create({
      data: {
        userID: global.userId,
        performerType: 'GROUP',
        label: 'Test Form',
      }
    })
    regId = reg.id
  })

  afterAll(async () => {
    await global.prisma.tbl_registration.delete({
      where: {
        id: regId
      }
    })
  })

  describe('Read full groups list', () => {
    let response: any

    it('Can return the full list of groups', async () => {
      response = await request<{groups: Group[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Groups{
            groups {
              id
              name
              groupType
              numberOfPerformers
              age
              instruments
              __typename
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.groups).toBeTruthy()
      expect(response.data.groups.length).toBeGreaterThan(0)
    })

    it('Can return the full list of groups with associated registrations', async () => {
      response = await request<{groups: Group[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Groups{
            groups {
              id
              name
              groupType
              numberOfPerformers
              age
              instruments
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
      expect(response.data.groups.length).toBeGreaterThan(1)
      expect(response.data.groups[0]).toHaveProperty('registration')
      expect(response.data.groups[0].id).toBeTruthy()
    })

    it('Can return the full list of groups with optional registrationID', async () => {
      response = await request<{groups: Group[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Groups($registrationId: Int) {
            groups(registrationID: $registrationId) {
              id
              name
              groupType
              numberOfPerformers
              age
              instruments
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
          registrationId: 145
        })
        .expectNoErrors()
      expect(response.data.groups[0]).toHaveProperty('registration')
      expect(response.data.groups[0].id).toBeTruthy()
    })

    it('Can return a single group with optional regID', async () => {
      response = await request<{groups: Group[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Group($groupId: Int, $registrationId: Int) {
            group(groupID: $groupId, registrationID: $registrationId) {
              id
              name
              groupType
              numberOfPerformers
              age
              instruments
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
          groupId: null,
          registrationId: 145
        })
        .expectNoErrors()
      expect(response.data.group.name).toContain('Fireflies')
      expect(response.data.group.registration.id).toBeTruthy()
    })

    it('Can return a single group with optional groupID', async () => {
      response = await request<{groups: Group[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Group($groupId: Int, $registrationId: Int) {
            group(groupID: $groupId, registrationID: $registrationId) {
              id
              name
              groupType
              numberOfPerformers
              age
              instruments
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
          groupId: 9,
          registrationId: null
        })
        .expectNoErrors()
      expect(response.data.group.name).toContain('Fireflies')
      expect(response.data.group.registration.id).toBeTruthy()
    })

    it('Returns and error if nothing is found', async () => {
      response = await request<{groups: Group[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Group($groupId: Int, $registrationId: Int) {
            group(groupID: $groupId, registrationID: $registrationId) {
              id
              name
              groupType
              numberOfPerformers
              age
              instruments
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
          groupId: 1500,
          registrationId: null
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let groupId: number | null

    afterEach(async () => {
      try {
        await global.prisma.tbl_reg_group.delete({
          where: {
            id: groupId
          }
        })
      } catch (error) {}
    })
        
    it('Admin can create a group on any existing registration', async () => {
      response = await request<{groupCreate: Group}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          mutation GroupCreate($registrationId: Int!) {
            groupCreate(registrationID: $registrationId) {
              group {
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
      groupId = await response.data.groupCreate.group.id
      expect(response.data.groupCreate.group.id).toBeTypeOf('number')
      expect(response.data.groupCreate.group.id).toBeTruthy()
    })

    it('Returns an error if trying to create a group without registrationId', async () => {
      response = await request<{groupCreate: Group}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          mutation GroupCreate($registrationId: Int!) {
            groupCreate(registrationID: $registrationId) {
              group {
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
      expect(response.data.groupCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.groupCreate.group).toBeNull()
    })
  })

  describe('Update', () => {
    let response: any
    let groupId: number

    beforeAll(async () => {
      response = await global.prisma.tbl_reg_group.create({
        data: {
          regID: regId,
          name: 'TestGroup',
        }
      })
      groupId = await response.id
    })

    afterAll(async () => {
      await global.prisma.tbl_reg_group.delete({
        where: {
          id: groupId
        }
      })
    })

    it('Admin can update any group', async () => {
      response = await request<{groupUpdate: Group}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation GroupUpdate($groupId: Int!, $groupInput: GroupInput!) {
          groupUpdate(groupID: $groupId, groupInput: $groupInput) {
            group {
              id
              name
              groupType
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
      .variables({
        groupId,
        groupInput: {
          name: 'UpdatedGroup',
          groupType: 'Instrumental'
        }
      })
      .expectNoErrors()
      expect(response.data.groupUpdate.group.name).toBe('UpdatedGroup')
      expect(response.data.groupUpdate.group.groupType).toBe('Instrumental')
    })

    it('Returns userError if incorrect group id', async () => {
      response = await request<{groupUpdate: Group}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation GroupUpdate($groupId: Int!, $groupInput: GroupInput!) {
          groupUpdate(groupID: $groupId, groupInput: $groupInput) {
            group {
              id
              name
              groupType
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
      .variables({
        groupId: groupId + 1,
        groupInput: {
          name: 'UpdatedGroup',
          groupType: 'Instrumental'
        }
      })
      expect(response.data.groupUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.groupUpdate.group).toBeNull()
    })

    it('Returns html status error if any missing arguments', async () => {
      response = await request<{groupUpdate: Group}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation GroupUpdate($groupId: Int!, $groupInput: GroupInput!) {
          groupUpdate(groupID: $groupId, groupInput: $groupInput) {
            group {
              id
              name
              groupType
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
      .variables({
        groupId: null,
        groupInput: {
          name: 'UpdatedGroup',
          groupType: 'Instrumental'
        }
      })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns html status error if any bad input args', async () => {
      response = await request<{groupUpdate: Group}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation GroupUpdate($groupId: Int!, $groupInput: GroupInput!) {
          groupUpdate(groupID: $groupId, groupInput: $groupInput) {
            group {
              id
              name
              groupType
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
      .variables({
        groupId: null,
        groupInput: {
          name: 'UpdatedGroup',
          okeydokey: true
        }
      })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let groupId: number

    beforeEach(async () => {
      response = await global.prisma.tbl_reg_group.create({
        data: {
          regID: regId,
          name: 'TestGroup',
        }
      })
      groupId = await response.id
    })

    afterEach(async () => {
      try {
        await global.prisma.tbl_reg_group.delete({
          where: {
            id: groupId
          }
        })
      } catch (error) {}
    })

    it('Can delete a group', async () => {
      response = await request<{groupDelete: boolean}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation GroupDelete($groupId: Int!) {
          groupDelete(groupID: $groupId) {
            group {
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
        groupId
      })
      .expectNoErrors()
      
      const deleteCheck = await global.prisma.tbl_reg_group.findUnique({
        where: {id: groupId}
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.groupDelete.group.id).toBeTruthy()
    })

    it('Returns a userError if group not found', async () => {
      response = await request<{groupDelete: boolean}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation GroupDelete($groupId: Int!) {
          groupDelete(groupID: $groupId) {
            group {
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
        groupId: groupId + 1
      })
      .expectNoErrors()
      expect(response.data.groupDelete.userErrors[0].message).toBeTruthy()
    })

    it('Returns status error if group id not given', async () => {
      response = await request<{groupDelete: boolean}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation GroupDelete($groupId: Int!) {
          groupDelete(groupID: $groupId) {
            group {
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
        groupId: null
      })
      expect(response.errors[0].message).toBeTruthy()
    })
  })
})
  

