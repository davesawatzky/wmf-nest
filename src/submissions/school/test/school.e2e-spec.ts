import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { School, SchoolPayload } from '../entities/school.entity'

describe('School', () => {

  let regId: number

  beforeAll(async () => {
    const reg = await global.prisma.tbl_registration.create({
      data: {
        userID: global.userId,
        performerType: 'SCHOOL',
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

  describe('Read full schools list', () => {
    let response: any

    it('Can return the full list of schools', async () => {
      response = await request<{schools: School[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Schools{
            schools {
              id
              name
              division
              city
              phone
              postalCode
              province
              streetName
              streetNumber
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.schools).toBeTruthy()
      expect(response.data.schools.length).toBeGreaterThan(1)
    })

    it('Can return the full list of schools with associated registrations', async () => {
      response = await request<{schools: School[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Schools{
            schools {
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
      expect(response.data.schools.length).toBeGreaterThan(1)
      expect(response.data.schools[0]).toHaveProperty('registration')
      expect(response.data.schools[0].id).toBeTruthy()
    })

    it('Can return the full list of schools with optional registrationID', async () => {
      response = await request<{schools: School[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Schools($registrationId: Int) {
            schools(registrationID: $registrationId) {
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
          registrationId: 24
        })
        .expectNoErrors()
      expect(response.data.schools[0]).toHaveProperty('registration')
      expect(response.data.schools[0].id).toBeTruthy()
    })

    it('Can return a single school with schoolID', async () => {
      response = await request<{school: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query School($schoolId: Int!) {
            school(schoolID: $schoolId) {
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
          schoolId: 7,
        })
        .expectNoErrors()
      expect(response.data.school.lastName).toBe('Zhou')
      expect(response.data.school.registration.id).toBeTruthy()
    })

    it('Returns an error if nothing is found', async () => {
      response = await request<{school: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query School($schoolId: Int) {
            school(schoolID: $schoolId) {
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
          schoolId: 1,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let schoolId: number | null

    afterEach(async () => {
      try {
        await global.prisma.tbl_reg_school.delete({
          where: {
            id: schoolId
          }
        })
      } catch (error) {}
    })
        
    it('Can create a school', async () => {
      response = await request<{schoolCreate: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
      response = await request<{schoolCreate: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          mutation SchoolCreate($registrationId: Int!, $schoolInput: SchoolInput) {
            schoolCreate(registrationID: $registrationId, schoolInput: $schoolInput) {
              school {
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
          schoolInput: {
            firstName: 'School',
            lastName: 'Test',
          }
        })
        .expectNoErrors()
      schoolId = await response.data.schoolCreate.school.id
      expect(response.data.schoolCreate.school.id).toBeTypeOf('number')
      expect(response.data.schoolCreate.school.lastName).toBe('Test')
    })

    it('Returns an error if trying to create a school without proper registrationId', async () => {
      response = await request<{schoolCreate: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          mutation SchoolCreate($registrationId: Int!, $schoolInput: SchoolInput) {
            schoolCreate(registrationID: $registrationId, schoolInput: $schoolInput) {
              school {
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
          schoolInput: {
            firstName: 'School',
            lastName: 'Test',
          }
        })
      expect(response.data.schoolCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.schoolCreate.school).toBeNull()
    })
  })

  describe('Update', () => {
    let response: any
    let schoolId: number

    beforeAll(async () => {
      response = await global.prisma.tbl_reg_school.create({
        data: {
          regID: regId,
          firstName: 'Test',
          lastName: 'School',
          streetName: 'Test Street',
        }
      })
      schoolId = await response.id
    })

    afterAll(async () => {
      await global.prisma.tbl_reg_school.delete({
        where: {
          id: schoolId
        }
      })
    })

    it('Can update any school', async () => {
      response = await request<{schoolUpdate: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation SchoolUpdate($schoolId: Int!, $schoolInput: SchoolInput!) {
          schoolUpdate(schoolID: $schoolId, schoolInput: $schoolInput) {
            school {
              id
              firstName
              lastName
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
        schoolId,
        schoolInput: {
          streetName: 'Updated Test Street',
        }
      })
      .expectNoErrors()
      expect(response.data.schoolUpdate.school.streetName).toBe('Updated Test Street')
      expect(response.data.schoolUpdate.school.firstName).toBe('Test')
    })

    it('Returns userError if incorrect school id', async () => {
      response = await request<{schoolUpdate: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation SchoolUpdate($schoolId: Int!, $schoolInput: SchoolInput!) {
          schoolUpdate(schoolID: $schoolId, schoolInput: $schoolInput) {
            school {
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
        schoolId: schoolId + 1,
        schoolInput: {
          lastName: 'HuckleBerry',
        }
      })
      expect(response.data.schoolUpdate.userErrors[0].message).toBeTruthy()
      expect(response.data.schoolUpdate.school).toBeNull()
    })

    it('Returns html status error if missing school id', async () => {
      response = await request<{schoolUpdate: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation SchoolUpdate($schoolId: Int!, $schoolInput: SchoolInput!) {
          schoolUpdate(schoolID: $schoolId, schoolInput: $schoolInput) {
            school {
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
        schoolId: null,
        schoolInput: {
          lastName: 'HuckleBerry',
        }
      })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns html status error if any bad input args', async () => {
      response = await request<{schoolUpdate: School}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
          name: 'UpdatedSchool',
          okeydokey: true
        }
      })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let schoolId: number

    beforeEach(async () => {
      response = await global.prisma.tbl_reg_school.create({
        data: {
          regID: regId,
          firstName: 'Test',
          lastName: 'School',
        }
      })
      schoolId = await response.id
    })

    afterEach(async () => {
      try {
        await global.prisma.tbl_reg_school.delete({
          where: {
            id: schoolId
          }
        })
      } catch (error) {}
    })

    it('Can delete a school', async () => {
      response = await request<{schoolDelete: boolean}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation SchoolDelete($schoolId: Int!) {
          schoolDelete(schoolID: $schoolId) {
            school {
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
        schoolId
      })
      .expectNoErrors()
      
      const deleteCheck = await global.prisma.tbl_reg_school.findUnique({
        where: {id: schoolId}
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.schoolDelete.school.lastName).toBe('School')
    })

    it('Returns a userError if school not found', async () => {
      response = await request<{schoolDelete: boolean}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .query(gql`
        mutation SchoolDelete($schoolId: Int!) {
          schoolDelete(schoolID: $schoolId) {
            school {
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
        schoolId: schoolId + 1
      })
      .expectNoErrors()
      expect(response.data.schoolDelete.userErrors[0].message).toBeTruthy()
    })

    it('Returns status error if school id not given', async () => {
      response = await request<{schoolDelete: boolean}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
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
        schoolId: null
      })
      expect(response.errors[0].message).toBeTruthy()
    })
  })
})
  

