import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  SchoolGroup,
  SchoolGroupPayload,
} from '../entities/school-group.entity'

describe('SchoolGroup E2E Tests', () => {
  let adminRegistrationId: number
  let userRegistrationId: number
  let adminSchoolId: number
  let userSchoolId: number
  let testSchoolGroupId: number

  beforeAll(async () => {
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_reg_schoolgroup.deleteMany({
      where: { name: { startsWith: 'test_' } },
    })

    // Create registrations for both roles
    const adminRegistration = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        label: 'test_admin_schoolgroup_reg',
        performerType: 'SCHOOL',
      },
    })
    adminRegistrationId = adminRegistration.id

    const userRegistration = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        label: 'test_user_schoolgroup_reg',
        performerType: 'SCHOOL',
      },
    })
    userRegistrationId = userRegistration.id

    // Create schools for both roles
    const adminSchool = await globalThis.prisma.tbl_reg_school.create({
      data: {
        regID: adminRegistrationId,
        name: 'test_admin_school',
      },
    })
    adminSchoolId = adminSchool.id

    const userSchool = await globalThis.prisma.tbl_reg_school.create({
      data: {
        regID: userRegistrationId,
        name: 'test_user_school',
      },
    })
    userSchoolId = userSchool.id

    // Create test school group for query tests
    const testSchoolGroup = await globalThis.prisma.tbl_reg_schoolgroup.create({
      data: {
        schoolID: adminSchoolId,
        name: 'test_query_schoolgroup',
        groupSize: 25,
      },
    })
    testSchoolGroupId = testSchoolGroup.id
  }, 30000)

  afterAll(async () => {
    // Clean up test data
    await globalThis.prisma.tbl_reg_schoolgroup.deleteMany({
      where: { name: { startsWith: 'test_' } },
    })
    await globalThis.prisma.tbl_reg_school.deleteMany({
      where: { name: { startsWith: 'test_' } },
    })
    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_' } },
    })
  })

  describe('SchoolGroup Queries', () => {
    it('Should list all school groups for both roles', async () => {
      const results = await testWithBothRoles(
        'list school groups',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchoolGroups {
                schoolGroups {
                  id
                  name
                  groupSize
                }
              }
            `)
            .expectNoErrors() as { data: { schoolGroups: SchoolGroup[] } }

          return {
            hasData: !!response.data.schoolGroups,
            count: response.data.schoolGroups?.length || 0,
          }
        },
      )

      // Both roles should successfully retrieve school groups
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)

      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBeGreaterThan(0)
    })

    it('Should list school groups with associated school and registration for both roles', async () => {
      const results = await testWithBothRoles(
        'list school groups with relations',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchoolGroups {
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
                    }
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { schoolGroups: SchoolGroup[] } }

          return {
            hasData: !!response.data.schoolGroups,
            hasSchool: !!response.data.schoolGroups[0]?.school,
            hasRegistration: !!response.data.schoolGroups[0]?.school?.registration,
          }
        },
      )

      // Both roles should successfully retrieve nested data
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.hasSchool).toBe(true)
      expect(results.admin.hasRegistration).toBe(true)

      expect(results.user.hasData).toBe(true)
      expect(results.user.hasSchool).toBe(true)
      expect(results.user.hasRegistration).toBe(true)
    })

    it('Should filter school groups by schoolID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter school groups by schoolID',
        async (role) => {
          const schoolId = role === 'admin' ? adminSchoolId : userSchoolId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchoolGroups($schoolID: Int) {
                schoolGroups(schoolID: $schoolID) {
                  id
                  name
                  groupSize
                  school {
                    id
                  }
                }
              }
            `, {
              schoolID: schoolId,
            })
            .expectNoErrors() as { data: { schoolGroups: SchoolGroup[] } }

          return {
            hasData: !!response.data.schoolGroups,
            count: response.data.schoolGroups?.length || 0,
          }
        },
      )

      // Both roles should successfully filter by their school
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
    })

    it('Should find specific school group by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find school group by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchoolGroup($schoolGroupID: Int!) {
                schoolGroup(schoolGroupID: $schoolGroupID) {
                  id
                  name
                  groupSize
                  school {
                    id
                    name
                  }
                }
              }
            `, {
              schoolGroupID: testSchoolGroupId,
            })
            .expectNoErrors() as { data: { schoolGroup: SchoolGroup } }

          return {
            hasData: !!response.data.schoolGroup,
            schoolGroupName: response.data.schoolGroup?.name,
            hasSchool: !!response.data.schoolGroup?.school,
          }
        },
      )

      // Both roles should successfully retrieve the school group
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.schoolGroupName).toBe('test_query_schoolgroup')
      expect(results.admin.hasSchool).toBe(true)

      expect(results.user.hasData).toBe(true)
      expect(results.user.schoolGroupName).toBe('test_query_schoolgroup')
      expect(results.user.hasSchool).toBe(true)
    })

    it('Should return error when school group not found for both roles', async () => {
      const results = await testWithBothRoles(
        'handle school group not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSchoolGroup($schoolGroupID: Int!) {
                schoolGroup(schoolGroupID: $schoolGroupID) {
                  id
                  name
                }
              }
            `, {
              schoolGroupID: 99999,
            }) as { data?: { schoolGroup: SchoolGroup | null }, errors?: readonly any[] }

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
  })

  describe('SchoolGroup Create Tests', () => {
    it('Should create school group with schoolID for both roles', async () => {
      const results = await testWithBothRoles(
        'create school group',
        async (role) => {
          const schoolId = role === 'admin' ? adminSchoolId : userSchoolId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSchoolGroup($schoolID: Int!) {
                schoolGroupCreate(schoolID: $schoolID) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                    school {
                      id
                    }
                  }
                }
              }
            `, {
              schoolID: schoolId,
            }) as { data?: { schoolGroupCreate: SchoolGroupPayload }, errors?: readonly any[] }

          // Cleanup
          if (response.data?.schoolGroupCreate?.schoolGroup?.id) {
            await globalThis.prisma.tbl_reg_schoolgroup.delete({
              where: { id: response.data.schoolGroupCreate.schoolGroup.id },
            })
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            schoolGroup: response.data?.schoolGroupCreate?.schoolGroup as SchoolGroup | undefined,
            userErrors: response.data?.schoolGroupCreate?.userErrors,
            hasUserErrors: (response.data?.schoolGroupCreate?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.schoolGroup).toBeTruthy()
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.schoolGroup).toBeTruthy()
      expect(results.user.hasUserErrors).toBe(false)
    })

    it('Should create school group with schoolGroupInput for both roles', async () => {
      const results = await testWithBothRoles(
        'create school group with input',
        async (role) => {
          const schoolId = role === 'admin' ? adminSchoolId : userSchoolId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSchoolGroup($schoolID: Int!, $schoolGroupInput: SchoolGroupInput) {
                schoolGroupCreate(schoolID: $schoolID, schoolGroupInput: $schoolGroupInput) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                    groupSize
                    chaperones
                    wheelchairs
                  }
                }
              }
            `, {
              schoolID: schoolId,
              schoolGroupInput: {
                name: `test_${role}_schoolgroup_with_input`,
                groupSize: 30,
                chaperones: 3,
                wheelchairs: 1,
              },
            }) as { data?: { schoolGroupCreate: SchoolGroupPayload }, errors?: readonly any[] }

          // Cleanup
          if (response.data?.schoolGroupCreate?.schoolGroup?.id) {
            await globalThis.prisma.tbl_reg_schoolgroup.delete({
              where: { id: response.data.schoolGroupCreate.schoolGroup.id },
            })
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            schoolGroup: response.data?.schoolGroupCreate?.schoolGroup as SchoolGroup | undefined,
            schoolGroupName: response.data?.schoolGroupCreate?.schoolGroup?.name,
            groupSize: response.data?.schoolGroupCreate?.schoolGroup?.groupSize,
            userErrors: response.data?.schoolGroupCreate?.userErrors,
            hasUserErrors: (response.data?.schoolGroupCreate?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed with correct data
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.schoolGroup).toBeTruthy()
      expect(results.admin.schoolGroupName).toBe('test_admin_schoolgroup_with_input')
      expect(results.admin.groupSize).toBe(30)
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.schoolGroup).toBeTruthy()
      expect(results.user.schoolGroupName).toBe('test_user_schoolgroup_with_input')
      expect(results.user.groupSize).toBe(30)
      expect(results.user.hasUserErrors).toBe(false)
    })

    it('Should return userErrors when creating school group with invalid schoolID for both roles', async () => {
      const results = await testWithBothRoles(
        'create school group with invalid schoolID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSchoolGroup($schoolID: Int!) {
                schoolGroupCreate(schoolID: $schoolID) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                  }
                }
              }
            `, {
              schoolID: 99999,
            }) as { data?: { schoolGroupCreate: SchoolGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            schoolGroup: response.data?.schoolGroupCreate?.schoolGroup as SchoolGroup | undefined,
            userErrors: response.data?.schoolGroupCreate?.userErrors,
            hasUserErrors: (response.data?.schoolGroupCreate?.userErrors?.length || 0) > 0,
            userErrorMessage: response.data?.schoolGroupCreate?.userErrors?.[0]?.message,
          }
        },
      )

      // Both roles should get userErrors
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.schoolGroup).toBeNull()
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.userErrorMessage).toBeTruthy()

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.schoolGroup).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.userErrorMessage).toBeTruthy()
    })
  })

  describe('SchoolGroup Update Tests', () => {
    let updateTestSchoolGroupId: number

    beforeAll(async () => {
      // Create test school group for update tests
      const testSchoolGroup = await globalThis.prisma.tbl_reg_schoolgroup.create({
        data: {
          schoolID: adminSchoolId,
          name: 'test_update_schoolgroup',
          groupSize: 20,
        },
      })
      updateTestSchoolGroupId = testSchoolGroup.id
    })

    afterAll(async () => {
      // Cleanup update test school group
      await globalThis.prisma.tbl_reg_schoolgroup.deleteMany({
        where: { id: updateTestSchoolGroupId },
      })
    })

    it('Should successfully update school group for both roles', async () => {
      const results = await testWithBothRoles(
        'update school group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchoolGroup($schoolGroupID: Int!, $schoolGroupInput: SchoolGroupInput!) {
                schoolGroupUpdate(schoolGroupID: $schoolGroupID, schoolGroupInput: $schoolGroupInput) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                    groupSize
                    chaperones
                  }
                }
              }
            `, {
              schoolGroupID: updateTestSchoolGroupId,
              schoolGroupInput: {
                name: `test_updated_schoolgroup_${role}`,
                groupSize: 35,
                chaperones: 4,
              },
            }) as { data?: { schoolGroupUpdate: SchoolGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            schoolGroup: response.data?.schoolGroupUpdate?.schoolGroup as SchoolGroup | undefined,
            schoolGroupName: response.data?.schoolGroupUpdate?.schoolGroup?.name,
            groupSize: response.data?.schoolGroupUpdate?.schoolGroup?.groupSize,
            userErrors: response.data?.schoolGroupUpdate?.userErrors,
            hasUserErrors: (response.data?.schoolGroupUpdate?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.schoolGroup).toBeTruthy()
      expect(results.admin.schoolGroupName).toBe('test_updated_schoolgroup_admin')
      expect(results.admin.groupSize).toBe(35)
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.schoolGroup).toBeTruthy()
      expect(results.user.schoolGroupName).toBe('test_updated_schoolgroup_user')
      expect(results.user.groupSize).toBe(35)
      expect(results.user.hasUserErrors).toBe(false)
    })

    it('Should return error when updating school group with invalid ID for both roles', async () => {
      const results = await testWithBothRoles(
        'update school group with invalid ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchoolGroup($schoolGroupID: Int!, $schoolGroupInput: SchoolGroupInput!) {
                schoolGroupUpdate(schoolGroupID: $schoolGroupID, schoolGroupInput: $schoolGroupInput) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                  }
                }
              }
            `, {
              schoolGroupID: 99999,
              schoolGroupInput: {
                name: 'test_invalid_update',
              },
            }) as { data?: { schoolGroupUpdate: SchoolGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            schoolGroup: response.data?.schoolGroupUpdate?.schoolGroup as SchoolGroup | undefined,
            userErrors: response.data?.schoolGroupUpdate?.userErrors,
            hasUserErrors: (response.data?.schoolGroupUpdate?.userErrors?.length || 0) > 0,
            userErrorMessage: response.data?.schoolGroupUpdate?.userErrors?.[0]?.message,
          }
        },
      )

      // Both roles should get userErrors
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.schoolGroup).toBeNull()
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.userErrorMessage).toContain('not found')

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.schoolGroup).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.userErrorMessage).toContain('not found')
    })

    it('Should return error when updating school group with null ID for both roles', async () => {
      const results = await testWithBothRoles(
        'update school group with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchoolGroup($schoolGroupID: Int!, $schoolGroupInput: SchoolGroupInput!) {
                schoolGroupUpdate(schoolGroupID: $schoolGroupID, schoolGroupInput: $schoolGroupInput) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                  }
                }
              }
            `, {
              schoolGroupID: null,
              schoolGroupInput: {
                name: 'test_null_update',
              },
            }) as { data?: { schoolGroupUpdate: SchoolGroupPayload }, errors?: readonly any[] }

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

    it('Should return error when updating school group with bad input arguments for both roles', async () => {
      const results = await testWithBothRoles(
        'update school group with bad arguments',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSchoolGroup($schoolGroupID: Int!, $schoolGroupInput: SchoolGroupInput!) {
                schoolGroupUpdate(schoolGroupID: $schoolGroupID, schoolGroupInput: $schoolGroupInput) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                  }
                }
              }
            `, {
              schoolGroupID: 99999,
              schoolGroupInput: null,
            }) as { data?: { schoolGroupUpdate: SchoolGroupPayload }, errors?: readonly any[] }

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

  describe('SchoolGroup Delete Tests', () => {
    it('Should successfully delete school group for both roles', async () => {
      const results = await testWithBothRoles(
        'delete school group',
        async (role) => {
          const schoolId = role === 'admin' ? adminSchoolId : userSchoolId

          // Create school group to delete
          const schoolGroupToDelete = await globalThis.prisma.tbl_reg_schoolgroup.create({
            data: {
              schoolID: schoolId,
              name: `test_${role}_schoolgroup_to_delete`,
              groupSize: 25,
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSchoolGroup($schoolGroupID: Int!) {
                schoolGroupDelete(schoolGroupID: $schoolGroupID) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                  }
                }
              }
            `, {
              schoolGroupID: schoolGroupToDelete.id,
            }) as { data?: { schoolGroupDelete: SchoolGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            schoolGroup: response.data?.schoolGroupDelete?.schoolGroup as SchoolGroup | undefined,
            schoolGroupName: response.data?.schoolGroupDelete?.schoolGroup?.name,
            userErrors: response.data?.schoolGroupDelete?.userErrors,
            hasUserErrors: (response.data?.schoolGroupDelete?.userErrors?.length || 0) > 0,
          }
        },
      )

      // Both roles should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.schoolGroup).toBeTruthy()
      expect(results.admin.schoolGroupName).toBe('test_admin_schoolgroup_to_delete')
      expect(results.admin.hasUserErrors).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.schoolGroup).toBeTruthy()
      expect(results.user.schoolGroupName).toBe('test_user_schoolgroup_to_delete')
      expect(results.user.hasUserErrors).toBe(false)
    })

    it('Should return error when deleting non-existent school group for both roles', async () => {
      const results = await testWithBothRoles(
        'delete non-existent school group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSchoolGroup($schoolGroupID: Int!) {
                schoolGroupDelete(schoolGroupID: $schoolGroupID) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                  }
                }
              }
            `, {
              schoolGroupID: 99999,
            }) as { data?: { schoolGroupDelete: SchoolGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            schoolGroup: response.data?.schoolGroupDelete?.schoolGroup as SchoolGroup | undefined,
            userErrors: response.data?.schoolGroupDelete?.userErrors,
            hasUserErrors: (response.data?.schoolGroupDelete?.userErrors?.length || 0) > 0,
            userErrorMessage: response.data?.schoolGroupDelete?.userErrors?.[0]?.message,
          }
        },
      )

      // Both roles should get userErrors
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.schoolGroup).toBeNull()
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.userErrorMessage).toContain('not found')

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.schoolGroup).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.userErrorMessage).toContain('not found')
    })

    it('Should return error when deleting school group with null ID for both roles', async () => {
      const results = await testWithBothRoles(
        'delete school group with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSchoolGroup($schoolGroupID: Int!) {
                schoolGroupDelete(schoolGroupID: $schoolGroupID) {
                  userErrors {
                    message
                    field
                  }
                  schoolGroup {
                    id
                    name
                  }
                }
              }
            `, {
              schoolGroupID: null,
            }) as { data?: { schoolGroupDelete: SchoolGroupPayload }, errors?: readonly any[] }

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
    it('Should require authentication for all school group operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetSchoolGroups {
            schoolGroups {
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
