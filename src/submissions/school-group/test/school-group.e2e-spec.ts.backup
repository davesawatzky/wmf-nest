import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { SchoolGroup } from '@/submissions/school-group/entities/school-group.entity'

describe('SchoolGroup', () => {
  let regId: number
  let schlId: number

  beforeAll(async () => {
    const reg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.userId,
        performerType: 'SCHOOL',
        label: 'Test Form',
      },
    })
    regId = await reg.id

    const schl = await globalThis.prisma.tbl_reg_school.create({
      data: {
        regID: regId,
        name: 'Test School',
      },
    })
    schlId = await schl.id
  })

  afterAll(async () => {
    await globalThis.prisma.tbl_reg_school.delete({
      where: {
        id: schlId,
      },
    })
    await globalThis.prisma.tbl_registration.delete({
      where: {
        id: regId,
      },
    })
  })

  describe('Read full schoolGroups list', () => {
    let response: any

    it('Can return the full list of schoolGroups', async () => {
      response = await request<{ schoolGroups: SchoolGroup[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query SchoolGroups {
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

    it('Can return the full list of schoolGroups with associated schools and reg', async () => {
      response = await request<{ schoolGroups: SchoolGroup[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query SchoolGroups {
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
      expect(response.data.schoolGroups[0].school).toHaveProperty(
        'registration',
      )
      expect(
        response.data.schoolGroups[0].school.registration.label,
      ).toBeTruthy()
    })

    it('Can return the full list of schoolGroups from one school using schoolID', async () => {
      response = await request<{ schoolGroups: SchoolGroup[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query SchoolGroups {
            schoolGroups {
              id
              name
              groupSize
            }
          }
        `)
        .variables({
          schoolId: 18,
        })
        .expectNoErrors()
      expect(response.data.schoolGroups[0].name).toBeTruthy()
    })

    it('Can return a single schoolGroup with schoolGroupID with school', async () => {
      response = await request<{ schoolGroup: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
      response = await request<{ schoolGroup: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
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
          schoolGroupId: 1000,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let schoolGroupId: number

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_schoolgroup.delete({
          where: {
            id: schoolGroupId,
          },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Can create a schoolGroup', async () => {
      response = await request<{ schoolGroupCreate: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroup(
            $schoolId: Int!
            $schoolGroupInput: SchoolGroupInput
          ) {
            schoolGroupCreate(
              schoolID: $schoolId
              schoolGroupInput: $schoolGroupInput
            ) {
              schoolGroup {
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
          schoolId: schlId,
        })
        .expectNoErrors()
      schoolGroupId = await response.data.schoolGroupCreate.schoolGroup.id
      expect(response.data.schoolGroupCreate.schoolGroup.id).toBeTypeOf(
        'number',
      )
      expect(response.data.schoolGroupCreate.schoolGroup.id).toBeTruthy()
    })

    it('Can create a schoolGroup with schoolGroup Input', async () => {
      response = await request<{ schoolGroupCreate: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroup(
            $schoolId: Int!
            $schoolGroupInput: SchoolGroupInput
          ) {
            schoolGroupCreate(
              schoolID: $schoolId
              schoolGroupInput: $schoolGroupInput
            ) {
              schoolGroup {
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
          schoolId: schlId,
          schoolGroupInput: {
            name: 'Test SchoolGroup',
          },
        })
        .expectNoErrors()
      schoolGroupId = await response.data.schoolGroupCreate.schoolGroup.id
      expect(response.data.schoolGroupCreate.schoolGroup.id).toBeTypeOf(
        'number',
      )
      expect(response.data.schoolGroupCreate.schoolGroup.name).toBe(
        'Test SchoolGroup',
      )
    })

    it('Returns an userError if trying to create a schoolGroup without valid schoolID', async () => {
      response = await request<{ schoolGroupCreate: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroup(
            $schoolId: Int!
            $schoolGroupInput: SchoolGroupInput
          ) {
            schoolGroupCreate(
              schoolID: $schoolId
              schoolGroupInput: $schoolGroupInput
            ) {
              schoolGroup {
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
          schoolId: schlId + 1,
          schoolGroupInput: {
            name: 'Test SchoolGroup',
          },
        })
      expect(
        response.data.schoolGroupCreate.userErrors[0].message,
      ).toBeTruthy()
      expect(response.data.schoolGroupCreate.schoolGroup).toBeNull()
    })
  })

  describe('Update', () => {
    let response: any
    let schoolGroupId: number

    beforeAll(async () => {
      response = await globalThis.prisma.tbl_reg_schoolgroup.create({
        data: {
          schoolID: schlId,
          name: 'Test SchoolGroup',
          groupSize: 25,
          chaperones: 3,
        },
      })
      schoolGroupId = await response.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_schoolgroup.delete({
        where: {
          id: schoolGroupId,
        },
      })
    })

    it('Can update any schoolGroup', async () => {
      response = await request<{ schoolGroupUpdate: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroupUpdate(
            $schoolGroupId: Int!
            $schoolGroupInput: SchoolGroupInput!
          ) {
            schoolGroupUpdate(
              schoolGroupID: $schoolGroupId
              schoolGroupInput: $schoolGroupInput
            ) {
              schoolGroup {
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
          schoolGroupId,
          schoolGroupInput: {
            name: 'Updated SchoolGroup',
            groupSize: 30,
          },
        })
        .expectNoErrors()
      expect(response.data.schoolGroupUpdate.schoolGroup.name).toBe(
        'Updated SchoolGroup',
      )
      expect(response.data.schoolGroupUpdate.schoolGroup.groupSize).toBe(30)
    })

    it('Returns userError if incorrect schoolGroup id', async () => {
      response = await request<{ schoolGroupUpdate: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroupUpdate(
            $schoolGroupId: Int!
            $schoolGroupInput: SchoolGroupInput!
          ) {
            schoolGroupUpdate(
              schoolGroupID: $schoolGroupId
              schoolGroupInput: $schoolGroupInput
            ) {
              schoolGroup {
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
          schoolGroupId: schoolGroupId + 1,
          schoolGroupInput: {
            name: 'Updated SchoolGroup',
          },
        })
      expect(
        response.data.schoolGroupUpdate.userErrors[0].message,
      ).toBeTruthy()
      expect(response.data.schoolGroupUpdate.schoolGroup).toBeNull()
    })

    it('Returns html status error if missing schoolGroup id', async () => {
      response = await request<{ schoolGroupUpdate: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroupUpdate(
            $schoolGroupId: Int!
            $schoolGroupInput: SchoolGroupInput!
          ) {
            schoolGroupUpdate(
              schoolGroupID: $schoolGroupId
              schoolGroupInput: $schoolGroupInput
            ) {
              schoolGroup {
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
          schoolGroupId: null,
          schoolGroupInput: {
            name: 'Updated SchoolGroup',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns html status error if any bad input args', async () => {
      response = await request<{ schoolGroupUpdate: SchoolGroup }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroupUpdate(
            $schoolGroupId: Int!
            $schoolGroupInput: SchoolGroupInput!
          ) {
            schoolGroupUpdate(
              schoolGroupID: $schoolGroupId
              schoolGroupInput: $schoolGroupInput
            ) {
              schoolGroup {
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
          schoolGroupId,
          schoolGroupInput: {
            name: 'Updated SchoolGroup',
            okeydokey: true,
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let schoolGroupId: number

    beforeEach(async () => {
      response = await globalThis.prisma.tbl_reg_schoolgroup.create({
        data: {
          schoolID: schlId,
          name: 'Test SchoolGroup',
        },
      })
      schoolGroupId = await response.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_schoolgroup.delete({
          where: {
            id: schoolGroupId,
          },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Can delete a schoolGroup', async () => {
      response = await request<{ schoolGroupDelete: boolean }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroupDelete($schoolGroupId: Int!) {
            schoolGroupDelete(schoolGroupID: $schoolGroupId) {
              schoolGroup {
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
          schoolGroupId,
        })
        .expectNoErrors()

      const deleteCheck
        = await globalThis.prisma.tbl_reg_schoolgroup.findUnique({
          where: { id: schoolGroupId },
        })
      expect(deleteCheck).toBeNull()
      expect(response.data.schoolGroupDelete.schoolGroup.name).toBe(
        'Test SchoolGroup',
      )
    })

    it('Returns a userError if schoolGroup not found', async () => {
      response = await request<{ schoolGroupDelete: boolean }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroupDelete($schoolGroupId: Int!) {
            schoolGroupDelete(schoolGroupID: $schoolGroupId) {
              schoolGroup {
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
          schoolGroupId: schoolGroupId + 1,
        })
        .expectNoErrors()
      expect(
        response.data.schoolGroupDelete.userErrors[0].message,
      ).toBeTruthy()
    })

    it('Returns status error if schoolGroup id not given', async () => {
      response = await request<{ schoolGroupDelete: boolean }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolGroupDelete($schoolGroupId: Int!) {
            schoolGroupDelete(schoolGroupID: $schoolGroupId) {
              schoolGroup {
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
          schoolGroupId: null,
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })
})
