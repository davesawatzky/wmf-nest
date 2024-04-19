import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { SchoolGroup, SchoolGroupPayload } from '../entities/school-group.entity'

describe('SchoolGroup', () => {

  let regId: number
  let schlId: number

  beforeAll(async () => {
    const reg = await global.prisma.tbl_registration.create({
      data: {
        userID: global.userId,
        performerType: 'SCHOOL',
        label: 'Test Form',
      }
    })
    regId = await reg.id

    const schl = await global.prisma.tbl_reg_school.create({
      data: {
        regID: regId,
        name: 'Test SchoolGroup'
      }
    })
    schlId = await schl.id
  })

  afterAll(async () => {
    await global.prisma.tbl_reg_school.delete({
      where: {
        id: schlId
      }
    })
    await global.prisma.tbl_registration.delete({
      where: {
        id: regId
      }
    })
  })

  describe('Read full schoolgroups list', () => {
    let response: any

    it('Can return the full list of schoolgroups', async () => {
      response = await request<{schoolGroups: SchoolGroup[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query SchoolGroups{
            schoolGroups {
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
      expect(response.data.schoolGroups).toBeTruthy()
      expect(response.data.schoolGroups.length).toBeGreaterThan(1)
    })

    it('Can return the full list of schoolgroups with associated schools and reg', async () => {
      response = await request<{schoolGroups: SchoolGroup[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query SchoolGroups{
            schoolGroups {
              id
              name
              groupSize
              school {
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
      expect(response.data.schoolGroups[0].school).toHaveProperty('registration')
      expect(response.data.schoolGroups[0].school.registration.label).toBeTruthy()
    })

    it('Can return the full list of schoolgroups from one school using schoolID', async () => {
      response = await request<{schoolgroups: SchoolGroup[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query SchoolGroups{
            schoolGroups {
              id
              name
              groupSize
            }
          }
        `)
        .variables({
          schoolId: 18
        })
        .expectNoErrors()
      expect(response.data.schoolGroups[0].name).toBeTruthy()
    })

    it('Can return a single schoolgroup with schoolgroupID with school', async () => {
      response = await request<{schoolgroup: SchoolGroup}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query SchoolGroup($schoolGroupId: Int!) {
            schoolGroup(schoolGroupID: $schoolGroupId) {
              id
              name
              school {
                id
                name
              }
            }
          }
        `)
        .variables({
          schoolGroupId: 24,
        })
        .expectNoErrors()
      expect(response.data.schoolGroup.name).toBeTruthy()
      expect(response.data.schoolGroup.school.name).toBeTruthy()
    })

    it('Returns an error if nothing is found', async () => {
      response = await request<{schoolgroup: SchoolGroup}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query SchoolGroup($schoolGroupId: Int!) {
            schoolGroup(schoolGroupID: $schoolGroupId) {
              id
              name
              school {
                id
                name
              }
            }
          }
        `)
        .variables({
          schoolgroupId: 1000,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  // describe('Create', () => {
  //   let response: any
  //   let schoolgroupId: number | null

  //   afterEach(async () => {
  //     try {
  //       await global.prisma.tbl_reg_schoolgroup.delete({
  //         where: {
  //           id: schoolgroupId
  //         }
  //       })
  //     } catch (error) {}
  //   })
        
  //   it('Can create a schoolgroup', async () => {
  //     response = await request<{schoolgroupCreate: SchoolGroup}>(global.httpServer)
  //       .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //       .query(gql`
  //         mutation SchoolGroupCreate($registrationId: Int!) {
  //           schoolgroupCreate(registrationID: $registrationId) {
  //             schoolgroup {
  //               id
  //               }
  //             userErrors {
  //               field 
  //               message
  //             }
  //           }
  //         } 
  //       `)
  //       .variables({
  //         registrationId: regId,
  //       })
  //       .expectNoErrors()
  //     schoolgroupId = await response.data.schoolgroupCreate.schoolgroup.id
  //     expect(response.data.schoolgroupCreate.schoolgroup.id).toBeTypeOf('number')
  //     expect(response.data.schoolgroupCreate.schoolgroup.id).toBeTruthy()
  //   })

  //   it('Can create a schoolgroup with schoolgroup Input', async () => {
  //     response = await request<{schoolgroupCreate: SchoolGroup}>(global.httpServer)
  //       .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //       .query(gql`
  //         mutation SchoolGroupCreate($registrationId: Int!, $schoolgroupInput: SchoolGroupInput) {
  //           schoolgroupCreate(registrationID: $registrationId, schoolgroupInput: $schoolgroupInput) {
  //             schoolgroup {
  //               id
  //               name
  //               }
  //             userErrors {
  //               field 
  //               message
  //             }
  //           }
  //         } 
  //       `)
  //       .variables({
  //         registrationId: regId,
  //         schoolgroupInput: {
  //           name: 'Test SchoolGroup'
  //         }
  //       })
  //       .expectNoErrors()
  //     schoolgroupId = await response.data.schoolgroupCreate.schoolgroup.id
  //     expect(response.data.schoolgroupCreate.schoolgroup.id).toBeTypeOf('number')
  //     expect(response.data.schoolgroupCreate.schoolgroup.name).toBe('Test SchoolGroup')
  //   })

  //   it('Returns an error if trying to create a schoolgroup without proper registrationId', async () => {
  //     response = await request<{schoolgroupCreate: SchoolGroup}>(global.httpServer)
  //       .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //       .query(gql`
  //         mutation SchoolGroupCreate($registrationId: Int!, $schoolgroupInput: SchoolGroupInput) {
  //           schoolgroupCreate(registrationID: $registrationId, schoolgroupInput: $schoolgroupInput) {
  //             schoolgroup {
  //               id
  //               name
  //               }
  //             userErrors {
  //               field 
  //               message
  //             }
  //           }
  //         } 
  //       `)
  //       .variables({
  //         registrationId: regId + 1,
  //         schoolgroupInput: {
  //           name: 'Test SchoolGroup'
  //         }
  //       })
  //     expect(response.data.schoolgroupCreate.userErrors[0].message).toBeTruthy()
  //     expect(response.data.schoolgroupCreate.schoolgroup).toBeNull()
  //   })
  // })

  // describe('Update', () => {
  //   let response: any
  //   let schoolgroupId: number

  //   beforeAll(async () => {
  //     response = await global.prisma.tbl_reg_schoolgroup.create({
  //       data: {
  //         regID: regId,
  //         name: 'Test SchoolGroup',
  //         division: 'Test Division',
  //       }
  //     })
  //     schoolgroupId = await response.id
  //   })

  //   afterAll(async () => {
  //     await global.prisma.tbl_reg_schoolgroup.delete({
  //       where: {
  //         id: schoolgroupId
  //       }
  //     })
  //   })

  //   it('Can update any schoolgroup', async () => {
  //     response = await request<{schoolgroupUpdate: SchoolGroup}>(global.httpServer)
  //     .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //     .query(gql`
  //       mutation SchoolGroupUpdate($schoolgroupId: Int!, $schoolgroupInput: SchoolGroupInput!) {
  //         schoolgroupUpdate(schoolgroupID: $schoolgroupId, schoolgroupInput: $schoolgroupInput) {
  //           schoolgroup {
  //             id
  //             name
  //             division            
  //             }
  //           userErrors {
  //             field 
  //             message
  //           }
  //         }
  //       } 
  //     `)
  //     .variables({
  //       schoolgroupId,
  //       schoolgroupInput: {
  //         division: 'Updated Division',
  //       }
  //     })
  //     .expectNoErrors()
  //     expect(response.data.schoolgroupUpdate.schoolgroup.division).toBe('Updated Division')
  //     expect(response.data.schoolgroupUpdate.schoolgroup.name).toBe('Test SchoolGroup')
  //   })

  //   it('Returns userError if incorrect schoolgroup id', async () => {
  //     response = await request<{schoolgroupUpdate: SchoolGroup}>(global.httpServer)
  //       .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //     .query(gql`
  //       mutation SchoolGroupUpdate($schoolgroupId: Int!, $schoolgroupInput: SchoolGroupInput!) {
  //         schoolgroupUpdate(schoolgroupID: $schoolgroupId, schoolgroupInput: $schoolgroupInput) {
  //           schoolgroup {
  //             id
  //             name
  //             }
  //           userErrors {
  //             field 
  //             message
  //           }
  //         }
  //       } 
  //     `)
  //     .variables({
  //       schoolgroupId: schoolgroupId + 1,
  //       schoolgroupInput: {
  //         division: 'Updated Division',
  //       }
  //     })
  //     expect(response.data.schoolgroupUpdate.userErrors[0].message).toBeTruthy()
  //     expect(response.data.schoolgroupUpdate.schoolgroup).toBeNull()
  //   })

  //   it('Returns html status error if missing schoolgroup id', async () => {
  //     response = await request<{schoolgroupUpdate: SchoolGroup}>(global.httpServer)
  //       .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //     .query(gql`
  //       mutation SchoolGroupUpdate($schoolgroupId: Int!, $schoolgroupInput: SchoolGroupInput!) {
  //         schoolgroupUpdate(schoolgroupID: $schoolgroupId, schoolgroupInput: $schoolgroupInput) {
  //           schoolgroup {
  //             id
  //             name
  //             division
  //             }
  //           userErrors {
  //             field 
  //             message
  //           }
  //         }
  //       } 
  //     `)
  //     .variables({
  //       schoolgroupId: null,
  //       schoolgroupInput: {
  //         division: 'Updated Division',
  //       }
  //     })
  //     expect(response.errors[0].message).toBeTruthy()
  //   })

  //   it('Returns html status error if any bad input args', async () => {
  //     response = await request<{schoolgroupUpdate: SchoolGroup}>(global.httpServer)
  //       .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //     .query(gql`
  //       mutation SchoolGroupUpdate($schoolgroupId: Int!, $schoolgroupInput: SchoolGroupInput!) {
  //         schoolgroupUpdate(schoolgroupID: $schoolgroupId, schoolgroupInput: $schoolgroupInput) {
  //           schoolgroup {
  //             id
  //             name
  //             performerType
  //             }
  //           userErrors {
  //             field 
  //             message
  //           }
  //         }
  //       } 
  //     `)
  //     .variables({
  //       schoolgroupId,
  //       schoolgroupInput: {
  //         name: 'Updated SchoolGroup',
  //         okeydokey: true
  //       }
  //     })
  //     expect(response.errors[0].message).toBeTruthy()
  //   })
  // })

  // describe('Delete', () => {
  //   let response: any
  //   let schoolgroupId: number

  //   beforeEach(async () => {
  //     response = await global.prisma.tbl_reg_schoolgroup.create({
  //       data: {
  //         regID: regId,
  //         name: 'Test SchoolGroup'
  //       }
  //     })
  //     schoolgroupId = await response.id
  //   })

  //   afterEach(async () => {
  //     try {
  //       await global.prisma.tbl_reg_schoolgroup.delete({
  //         where: {
  //           id: schoolgroupId
  //         }
  //       })
  //     } catch (error) {}
  //   })

  //   it('Can delete a schoolgroup', async () => {
  //     response = await request<{schoolgroupDelete: boolean}>(global.httpServer)
  //     .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //     .query(gql`
  //       mutation SchoolGroupDelete($schoolgroupId: Int!) {
  //         schoolgroupDelete(schoolgroupID: $schoolgroupId) {
  //           schoolgroup {
  //             id
  //             name
  //           }
  //           userErrors {
  //             field 
  //             message
  //           }
  //         }
  //       } 
  //     `)
  //     .variables({
  //       schoolgroupId
  //     })
  //     .expectNoErrors()
      
  //     const deleteCheck = await global.prisma.tbl_reg_schoolgroup.findUnique({
  //       where: {id: schoolgroupId}
  //     })
  //     expect(deleteCheck).toBeNull()
  //     expect(response.data.schoolgroupDelete.schoolgroup.name).toBe('Test SchoolGroup')
  //   })

  //   it('Returns a userError if schoolgroup not found', async () => {
  //     response = await request<{schoolgroupDelete: boolean}>(global.httpServer)
  //     .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //     .query(gql`
  //       mutation SchoolGroupDelete($schoolgroupId: Int!) {
  //         schoolgroupDelete(schoolgroupID: $schoolgroupId) {
  //           schoolgroup {
  //             id
  //             name
  //           }
  //           userErrors {
  //             field 
  //             message
  //           }
  //         }
  //       } 
  //     `)
  //     .variables({
  //       schoolgroupId: schoolgroupId + 1
  //     })
  //     .expectNoErrors()
  //     expect(response.data.schoolgroupDelete.userErrors[0].message).toBeTruthy()
  //   })

  //   it('Returns status error if schoolgroup id not given', async () => {
  //     response = await request<{schoolgroupDelete: boolean}>(global.httpServer)
  //     .set('Cookie', `diatonicToken=${global.diatonicToken}`)
  //     .query(gql`
  //       mutation SchoolGroupDelete($schoolgroupId: Int!) {
  //         schoolgroupDelete(schoolgroupID: $schoolgroupId) {
  //           schoolgroup {
  //             id
  //             name
  //           }
  //           userErrors {
  //             field 
  //             message
  //           }
  //         }
  //       } 
  //     `)
  //     .variables({
  //       schoolgroupId: null
  //     })
  //     expect(response.errors[0].message).toBeTruthy()
  //   })
  // })
})
  

