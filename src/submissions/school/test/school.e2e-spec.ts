import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { School } from '../entities/school.entity'

describe('School', () => {
  let regId: number

  beforeAll(async () => {
    const reg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.userId,
        performerType: 'SCHOOL',
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

  describe('Read full schools list', () => {
    let response: any

    it('Can return the full list of schools', async () => {
      response = await request<{ schools: School[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Schools{
            schools {
              id
              name
              division
              address
              city
              phone
              postalCode
              province
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.schools).toBeTruthy()
      expect(response.data.schools.length).toBeGreaterThan(1)
    })

    it('Can return the full list of schools with associated registrations', async () => {
      response = await request<{ schools: School[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Schools{
            schools {
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
      expect(response.data.schools.length).toBeGreaterThan(1)
      expect(response.data.schools[0]).toHaveProperty('registration')
      expect(response.data.schools[0].id).toBeTruthy()
    })

    it('Can return the full list of schools with registrations and school groups', async () => {
      response = await request<{ schools: School[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Schools{
            schools {
              id
              name
              registration {
                id
                label
              }
              schoolGroups {
                id
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.schools.length).toBeGreaterThan(1)
      expect(response.data.schools[0]).toHaveProperty('registration')
      expect(response.data.schools[0]).toHaveProperty('schoolGroups')
      expect(response.data.schools[0].schoolGroups[0].name).toBeTruthy()
    })

    it('Can return a single school with schoolID', async () => {
      response = await request<{ school: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query School($registrationId: Int, $schoolId: Int) {
            school(registrationID: $registrationId, schoolID: $schoolId) {
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
          schoolId: 10,
        })
        .expectNoErrors()
      expect(response.data.school.name).toBeTruthy()
      expect(response.data.school.registration.id).toBeTruthy()
    })

    it('Returns an error if nothing is found', async () => {
      response = await request<{ school: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query School($registrationId: Int, $schoolId: Int) {
            school(registrationID: $registrationId, schoolID: $schoolId) {
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
          schoolId: 10,
          registrationId: 10,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let schoolId: number | null

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_school.delete({
          where: {
            id: schoolId,
          },
        })
      }
      catch (error) {
        console.error(error)
      }
    })

    it('Can create a school with regId', async () => {
      response = await request<{ schoolCreate: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolCreate($registrationId: Int!) {
            schoolCreate(registrationID: $registrationId) {
              school {
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
      schoolId = await response.data.schoolCreate.school.id
      expect(response.data.schoolCreate.school.id).toBeTypeOf('number')
      expect(response.data.schoolCreate.school.id).toBeTruthy()
    })

    it('Can create a school with school Input', async () => {
      response = await request<{ schoolCreate: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolCreate($registrationId: Int!, $schoolInput: SchoolInput) {
            schoolCreate(registrationID: $registrationId, schoolInput: $schoolInput) {
              school {
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
          schoolInput: {
            name: 'Test School',
          },
        })
        .expectNoErrors()
      schoolId = await response.data.schoolCreate.school.id
      expect(response.data.schoolCreate.school.id).toBeTypeOf('number')
      expect(response.data.schoolCreate.school.name).toBe('Test School')
    })

    it('Returns an error if trying to create a school without proper registrationId', async () => {
      response = await request<{ schoolCreate: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          mutation SchoolCreate($registrationId: Int!, $schoolInput: SchoolInput) {
            schoolCreate(registrationID: $registrationId, schoolInput: $schoolInput) {
              school {
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
          schoolInput: {
            name: 'Test School',
          },
        })
      expect(response.data.schoolCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.schoolCreate.school).toBeNull()
    })
  })

  describe('Update', () => {
    let response: any
    let schoolId: number

    beforeAll(async () => {
      response = await globalThis.prisma.tbl_reg_school.create({
        data: {
          regID: regId,
          name: 'Test School',
          division: 'Test Division',
        },
      })
      schoolId = await response.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_school.delete({
        where: {
          id: schoolId,
        },
      })
    })

    it('Can update any school', async () => {
      response = await request<{ schoolUpdate: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation SchoolUpdate($schoolId: Int!, $schoolInput: SchoolInput!) {
          schoolUpdate(schoolID: $schoolId, schoolInput: $schoolInput) {
            school {
              id
              name
              division            
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          schoolId,
          schoolInput: {
            division: 'Updated Division',
          },
        })
        .expectNoErrors()
      expect(response.data.schoolUpdate.school.division).toBe('Updated Division')
      expect(response.data.schoolUpdate.school.name).toBe('Test School')
    })

    it('Returns userError if incorrect school id', async () => {
      response = await request<{ schoolUpdate: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation SchoolUpdate($schoolId: Int!, $schoolInput: SchoolInput!) {
          schoolUpdate(schoolID: $schoolId, schoolInput: $schoolInput) {
            school {
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
          schoolId: schoolId + 1,
          schoolInput: {
            division: 'Updated Division',
          },
        })
      expect(response.data.schoolUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.schoolUpdate.school).toBeNull()
    })

    it('Returns html status error if missing school id', async () => {
      response = await request<{ schoolUpdate: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation SchoolUpdate($schoolId: Int!, $schoolInput: SchoolInput!) {
          schoolUpdate(schoolID: $schoolId, schoolInput: $schoolInput) {
            school {
              id
              name
              division
              }
            userErrors {
              field 
              message
            }
          }
        } 
      `)
        .variables({
          schoolId: null,
          schoolInput: {
            division: 'Updated Division',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns html status error if any bad input args', async () => {
      response = await request<{ schoolUpdate: School }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation SchoolUpdate($schoolId: Int!, $schoolInput: SchoolInput!) {
          schoolUpdate(schoolID: $schoolId, schoolInput: $schoolInput) {
            school {
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
          schoolId,
          schoolInput: {
            name: 'Updated School',
            okeydokey: true,
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let schoolId: number

    beforeEach(async () => {
      response = await globalThis.prisma.tbl_reg_school.create({
        data: {
          regID: regId,
          name: 'Test School',
        },
      })
      schoolId = await response.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_reg_school.delete({
          where: {
            id: schoolId,
          },
        })
      }
      catch (error) {}
    })

    it('Can delete a school', async () => {
      response = await request<{ schoolDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation SchoolDelete($schoolId: Int!) {
          schoolDelete(schoolID: $schoolId) {
            school {
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
          schoolId,
        })
        .expectNoErrors()

      const deleteCheck = await globalThis.prisma.tbl_reg_school.findUnique({
        where: { id: schoolId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.schoolDelete.school.name).toBe('Test School')
    })

    it('Returns a userError if school not found', async () => {
      response = await request<{ schoolDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation SchoolDelete($schoolId: Int!) {
          schoolDelete(schoolID: $schoolId) {
            school {
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
          schoolId: schoolId + 1,
        })
        .expectNoErrors()
      expect(response.data.schoolDelete.userErrors[0].message).toBeTruthy()
    })

    it('Returns status error if school id not given', async () => {
      response = await request<{ schoolDelete: boolean }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        mutation SchoolDelete($schoolId: Int!) {
          schoolDelete(schoolID: $schoolId) {
            school {
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
          schoolId: null,
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })
})
