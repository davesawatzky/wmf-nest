import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  School,
  SchoolPayload,
} from '../entities/school.entity'

describe('School E2E Tests', () => {
  let adminRegistrationId: number
  let _userRegistrationId: number // Created but not used - admin's registration has test data
  let testSchoolId: number

  beforeAll(async () => {
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_reg_school.deleteMany({
      where: { name: { startsWith: 'test_' } },
    })

    // Create separate registrations for admin and user with performerType SCHOOL
    const adminRegistration = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        label: 'test_admin_school_reg',
        performerType: 'SCHOOL',
      },
    })
    adminRegistrationId = adminRegistration.id

    const userRegistration = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        label: 'test_user_school_reg',
        performerType: 'SCHOOL',
      },
    })
    _userRegistrationId = userRegistration.id

    // Create test school for query tests
    const testSchool = await globalThis.prisma.tbl_reg_school.create({
      data: {
        regID: adminRegistrationId,
        name: 'test_query_school',
        division: 'Elementary',
        address: '123 Test St',
        city: 'Winnipeg',
        province: 'MB',
        postalCode: 'R3T 2N2',
        phone: '204-555-0001',
      },
    })
    testSchoolId = testSchool.id
  }, 30000)

  afterAll(async () => {
    // Clean up test data
    await globalThis.prisma.tbl_reg_school.deleteMany({
      where: { name: { startsWith: 'test_' } },
    })
    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_' } },
    })
  })

  describe('School Queries', () => {
    it('Should list all schools for admin, user gets forbidden', async () => {
      const results = await testWithBothRoles(
        'list schools',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchools {
                schools {
                  id
                  name
                  division
                }
              }
            `) as { data?: { schools: School[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.schools,
            count: response.data?.schools?.length || 0,
          }
        },
      )

      // Admin should successfully retrieve schools
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should find specific school by schoolID for both roles', async () => {
      const results = await testWithBothRoles(
        'find school by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchool($schoolID: Int!) {
                school(schoolID: $schoolID) {
                  id
                  name
                  division
                  city
                }
              }
            `, {
              schoolID: testSchoolId,
            })
            .expectNoErrors() as { data: { school: School } }

          return {
            hasData: !!response.data.school,
            schoolId: response.data.school?.id,
            schoolName: response.data.school?.name,
          }
        },
      )

      // Both roles should successfully retrieve the school
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.schoolId).toBe(testSchoolId)
      expect(results.admin.schoolName).toBe('test_query_school')

      expect(results.user.hasData).toBe(true)
      expect(results.user.schoolId).toBe(testSchoolId)
      expect(results.user.schoolName).toBe('test_query_school')
    })

    it('Should find school by registrationID for both roles', async () => {
      const results = await testWithBothRoles(
        'find school by registrationID',
        async (role) => {
          // Both roles query the admin registration (which has the test school)
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchoolByRegistration($registrationID: Int!) {
                school(registrationID: $registrationID) {
                  id
                  name
                  registration {
                    id
                  }
                }
              }
            `, {
              registrationID: role === 'admin' ? adminRegistrationId : adminRegistrationId, // Both query admin's school
            })
            .expectNoErrors() as { data: { school: School } }

          return {
            hasData: !!response.data.school,
            schoolName: response.data.school?.name,
            registrationId: response.data.school?.registration?.id,
          }
        },
      )

      // Both roles should retrieve the school
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.schoolName).toBe('test_query_school')
      expect(results.admin.registrationId).toBe(adminRegistrationId)

      expect(results.user.hasData).toBe(true)
      expect(results.user.schoolName).toBe('test_query_school')
      expect(results.user.registrationId).toBe(adminRegistrationId)
    })

    it('Should return error when school not found for both roles', async () => {
      const results = await testWithBothRoles(
        'handle school not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchool($schoolID: Int!) {
                school(schoolID: $schoolID) {
                  id
                  name
                }
              }
            `, {
              schoolID: 99999,
            }) as { data?: { school: School | null }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get not found error
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toContain('not found')

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toContain('not found')
    })

    it('Should return error when neither schoolID nor registrationID provided for both roles', async () => {
      const results = await testWithBothRoles(
        'handle missing parameters',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchool {
                school {
                  id
                  name
                }
              }
            `) as { data?: { school: School | null }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get bad request error
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toContain('must be provided')

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toContain('must be provided')
    })
  })

  describe('School Create Tests', () => {
    it('Should create school with registrationID for both roles', async () => {
      const results = await testWithBothRoles(
        'create school',
        async (role) => {
          // Create separate registration for each role's create test (regID unique constraint)
          const userId = getUserId(role)
          const newRegistration = await globalThis.prisma.tbl_registration.create({
            data: {
              userID: userId,
              label: `test_${role}_school_create_reg`,
              performerType: 'SCHOOL',
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSchool($registrationID: Int!) {
                schoolCreate(registrationID: $registrationID) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                    division
                    registration {
                      id
                    }
                  }
                }
              }
            `, {
              registrationID: newRegistration.id,
            }) as { data?: { schoolCreate: SchoolPayload }, errors?: readonly any[] }

          // Cleanup
          if (response.data?.schoolCreate?.school?.id) {
            await globalThis.prisma.tbl_reg_school.delete({
              where: { id: response.data.schoolCreate.school.id },
            })
          }
          await globalThis.prisma.tbl_registration.delete({
            where: { id: newRegistration.id },
          })

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            school: response.data?.schoolCreate?.school as School | undefined,
            userErrors: response.data?.schoolCreate?.userErrors,
            hasUserErrors: (response.data?.schoolCreate?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.school).toBeTruthy()
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.school).toBeTruthy()
      expect(results.user.hasUserErrors).toBe(false)
    })

    it('Should create school with schoolInput for both roles', async () => {
      const results = await testWithBothRoles(
        'create school with input',
        async (role) => {
          // Create separate registration for each role
          const userId = getUserId(role)
          const newRegistration = await globalThis.prisma.tbl_registration.create({
            data: {
              userID: userId,
              label: `test_${role}_school_input_reg`,
              performerType: 'SCHOOL',
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSchoolWithInput($registrationID: Int!, $schoolInput: SchoolInput) {
                schoolCreate(registrationID: $registrationID, schoolInput: $schoolInput) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                    division
                    city
                    province
                  }
                }
              }
            `, {
              registrationID: newRegistration.id,
              schoolInput: {
                name: `test_${role}_school_with_input`,
                division: 'High School',
                address: '456 Main St',
                city: 'Brandon',
                province: 'MB',
                postalCode: 'R7A 1A1',
                phone: '204-555-0100',
              },
            }) as { data?: { schoolCreate: SchoolPayload }, errors?: readonly any[] }

          // Cleanup
          if (response.data?.schoolCreate?.school?.id) {
            await globalThis.prisma.tbl_reg_school.delete({
              where: { id: response.data.schoolCreate.school.id },
            })
          }
          await globalThis.prisma.tbl_registration.delete({
            where: { id: newRegistration.id },
          })

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            school: response.data?.schoolCreate?.school as School | undefined,
            schoolName: response.data?.schoolCreate?.school?.name,
            division: response.data?.schoolCreate?.school?.division,
            city: response.data?.schoolCreate?.school?.city,
            userErrors: response.data?.schoolCreate?.userErrors,
            hasUserErrors: (response.data?.schoolCreate?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed with correct data
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.school).toBeTruthy()
      expect(results.admin.schoolName).toBe('test_admin_school_with_input')
      expect(results.admin.division).toBe('High School')
      expect(results.admin.city).toBe('Brandon')
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.school).toBeTruthy()
      expect(results.user.schoolName).toBe('test_user_school_with_input')
      expect(results.user.division).toBe('High School')
      expect(results.user.city).toBe('Brandon')
      expect(results.user.hasUserErrors).toBe(false)
    })

    it('Should return userErrors when creating school with invalid registrationID for both roles', async () => {
      const results = await testWithBothRoles(
        'create school with invalid registrationID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSchool($registrationID: Int!) {
                schoolCreate(registrationID: $registrationID) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              registrationID: 99999,
            }) as { data?: { schoolCreate: SchoolPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            school: response.data?.schoolCreate?.school as School | undefined,
            userErrors: response.data?.schoolCreate?.userErrors,
            hasUserErrors: (response.data?.schoolCreate?.userErrors?.length || 0) > 0,
            userErrorMessage: response.data?.schoolCreate?.userErrors?.[0]?.message,
          }
        },
      )

      // Both roles should get userErrors
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.school).toBeNull()
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.userErrorMessage).toContain('Cannot create school')

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.school).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.userErrorMessage).toContain('Cannot create school')
    })
  })

  describe('School Update Tests', () => {
    it('Should successfully update school for both roles', async () => {
      // Create separate registration for update test (regID unique constraint)
      const updateReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('admin'),
          label: 'test_update_school_reg',
          performerType: 'SCHOOL',
        },
      })

      // Create test school inline to avoid regID unique constraint
      const updateSchool = await globalThis.prisma.tbl_reg_school.create({
        data: {
          regID: updateReg.id,
          name: 'test_update_school',
          division: 'Elementary',
          address: '100 Update St',
          city: 'Winnipeg',
          province: 'MB',
          postalCode: 'R3T 3N3',
          phone: '204-555-0200',
        },
      })
      const updateTestSchoolId = updateSchool.id

      const results = await testWithBothRoles(
        'update school',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchool($schoolID: Int!, $schoolInput: SchoolInput!) {
                schoolUpdate(schoolID: $schoolID, schoolInput: $schoolInput) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                    division
                    city
                  }
                }
              }
            `, {
              schoolID: updateTestSchoolId,
              schoolInput: {
                name: `test_updated_school_${role}`,
                division: 'Middle School',
                city: 'Thompson',
              },
            }) as { data?: { schoolUpdate: SchoolPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            school: response.data?.schoolUpdate?.school as School | undefined,
            schoolName: response.data?.schoolUpdate?.school?.name,
            division: response.data?.schoolUpdate?.school?.division,
            city: response.data?.schoolUpdate?.school?.city,
            userErrors: response.data?.schoolUpdate?.userErrors,
            hasUserErrors: (response.data?.schoolUpdate?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.school).toBeTruthy()
      expect(results.admin.schoolName).toBe('test_updated_school_admin')
      expect(results.admin.division).toBe('Middle School')
      expect(results.admin.city).toBe('Thompson')
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.school).toBeTruthy()
      expect(results.user.schoolName).toBe('test_updated_school_user')
      expect(results.user.division).toBe('Middle School')
      expect(results.user.city).toBe('Thompson')
      expect(results.user.hasUserErrors).toBe(false)

      // Cleanup
      await globalThis.prisma.tbl_reg_school.delete({
        where: { id: updateTestSchoolId },
      })
      await globalThis.prisma.tbl_registration.delete({
        where: { id: updateReg.id },
      })
    })

    it('Should return error when updating school with invalid ID for both roles', async () => {
      const results = await testWithBothRoles(
        'update school with invalid ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchool($schoolID: Int!, $schoolInput: SchoolInput!) {
                schoolUpdate(schoolID: $schoolID, schoolInput: $schoolInput) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              schoolID: 99999,
              schoolInput: {
                name: 'test_invalid_update',
              },
            }) as { data?: { schoolUpdate: SchoolPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            school: response.data?.schoolUpdate?.school as School | undefined,
            userErrors: response.data?.schoolUpdate?.userErrors,
            hasUserErrors: (response.data?.schoolUpdate?.userErrors?.length || 0) > 0,
            userErrorMessage: response.data?.schoolUpdate?.userErrors?.[0]?.message,
          }
        },
      )

      // Both roles should get userErrors
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.school).toBeNull()
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.userErrorMessage).toContain('not found')

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.school).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.userErrorMessage).toContain('not found')
    })

    it('Should return error when updating school with null ID for both roles', async () => {
      const results = await testWithBothRoles(
        'update school with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchool($schoolID: Int!, $schoolInput: SchoolInput!) {
                schoolUpdate(schoolID: $schoolID, schoolInput: $schoolInput) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              schoolID: null,
              schoolInput: {
                name: 'test_null_update',
              },
            }) as { data?: { schoolUpdate: SchoolPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toBeTruthy()

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toBeTruthy()
    })

    it('Should return error when updating school with bad input arguments for both roles', async () => {
      const results = await testWithBothRoles(
        'update school with bad arguments',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchool($schoolID: Int!, $schoolInput: SchoolInput!) {
                schoolUpdate(schoolID: $schoolID, schoolInput: $schoolInput) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              schoolID: 99999, // Use invalid ID instead
              schoolInput: null,
            }) as { data?: { schoolUpdate: SchoolPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toBeTruthy()

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toBeTruthy()
    })
  })

  describe('School Delete Tests', () => {
    it('Should successfully delete school for both roles', async () => {
      const results = await testWithBothRoles(
        'delete school',
        async (role) => {
          // Create separate registration and school for each role's delete test (regID unique constraint)
          const userId = getUserId(role)
          const newRegistration = await globalThis.prisma.tbl_registration.create({
            data: {
              userID: userId,
              label: `test_${role}_school_delete_reg`,
              performerType: 'SCHOOL',
            },
          })

          const schoolToDelete = await globalThis.prisma.tbl_reg_school.create({
            data: {
              regID: newRegistration.id,
              name: `test_${role}_school_to_delete`,
              division: 'Elementary',
              address: '999 Delete St',
              city: 'Winnipeg',
              province: 'MB',
              postalCode: 'R3T 9Z9',
              phone: '204-555-9999',
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSchool($schoolID: Int!) {
                schoolDelete(schoolID: $schoolID) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              schoolID: schoolToDelete.id,
            }) as { data?: { schoolDelete: SchoolPayload }, errors?: readonly any[] }

          // Cleanup registration
          await globalThis.prisma.tbl_registration.delete({
            where: { id: newRegistration.id },
          })

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            school: response.data?.schoolDelete?.school as School | undefined,
            schoolName: response.data?.schoolDelete?.school?.name,
            userErrors: response.data?.schoolDelete?.userErrors,
            hasUserErrors: (response.data?.schoolDelete?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.school).toBeTruthy()
      expect(results.admin.schoolName).toBe('test_admin_school_to_delete')
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.school).toBeTruthy()
      expect(results.user.schoolName).toBe('test_user_school_to_delete')
      expect(results.user.hasUserErrors).toBe(false)
    })

    it('Should return error when deleting non-existent school for both roles', async () => {
      const results = await testWithBothRoles(
        'delete non-existent school',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSchool($schoolID: Int!) {
                schoolDelete(schoolID: $schoolID) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              schoolID: 99999,
            }) as { data?: { schoolDelete: SchoolPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            school: response.data?.schoolDelete?.school as School | undefined,
            userErrors: response.data?.schoolDelete?.userErrors,
            hasUserErrors: (response.data?.schoolDelete?.userErrors?.length || 0) > 0,
            userErrorMessage: response.data?.schoolDelete?.userErrors?.[0]?.message,
          }
        },
      )

      // Both roles should get userErrors
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.school).toBeNull()
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.userErrorMessage).toContain('not found')

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.school).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.userErrorMessage).toContain('not found')
    })

    it('Should return error when deleting school with null ID for both roles', async () => {
      const results = await testWithBothRoles(
        'delete school with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSchool($schoolID: Int!) {
                schoolDelete(schoolID: $schoolID) {
                  userErrors {
                    message
                    field
                  }
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              schoolID: null,
            }) as { data?: { schoolDelete: SchoolPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toBeTruthy()

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all school operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetSchools {
            schools {
              id
              name
            }
          }
        `) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
