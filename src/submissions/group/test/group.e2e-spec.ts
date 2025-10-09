import gql from 'graphql-tag'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import { Group, GroupPayload } from '../entities/group.entity'

describe('Group E2E Tests', () => {
  let adminRegId: number
  let userRegId: number
  let testGroupId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Create registrations for both roles
    const adminReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        performerType: 'GROUP',
        label: 'Test Admin Group Registration',
      },
    })
    adminRegId = adminReg.id

    const userReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        performerType: 'GROUP',
        label: 'Test User Group Registration',
      },
    })
    userRegId = userReg.id

    // Create test groups for queries (one for each role)
    const testGroup = await globalThis.prisma.tbl_reg_group.create({
      data: {
        regID: adminRegId,
        name: 'Test Query Group',
        groupType: 'Vocal',
        numberOfPerformers: 5,
      },
    })
    testGroupId = testGroup.id

    // Create a group for the user registration as well
    await globalThis.prisma.tbl_reg_group.create({
      data: {
        regID: userRegId,
        name: 'Test User Query Group',
        groupType: 'Instrumental',
        numberOfPerformers: 4,
      },
    })
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Clean up test data
    await globalThis.prisma.tbl_reg_group.deleteMany({
      where: {
        OR: [
          { regID: adminRegId },
          { regID: userRegId },
          { name: { startsWith: 'Test' } },
        ],
      },
    })

    await globalThis.prisma.tbl_registration.deleteMany({
      where: {
        OR: [
          { id: adminRegId },
          { id: userRegId },
        ],
      },
    })
  })

  describe('Group Queries', () => {
    it('Should enforce list authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'list all groups',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query Groups {
                groups {
                  id
                  name
                  groupType
                  numberOfPerformers
                  age
                  instruments
                }
              }
            `) as { data?: { groups: Group[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.groups,
            count: response.data?.groups?.length || 0,
          }
        },
      )

      // Admin should successfully retrieve groups
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)

      // User should be forbidden (admin-only query)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should enforce list with registrations authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'list groups with registrations',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query Groups {
                groups {
                  id
                  name
                  groupType
                  numberOfPerformers
                  registration {
                    id
                    confirmation
                    label
                    createdAt
                  }
                }
              }
            `) as { data?: { groups: Group[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.groups,
            hasRegistration: !!response.data?.groups?.[0]?.registration,
          }
        },
      )

      // Admin should see groups with registrations
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.hasRegistration).toBe(true)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should filter groups by registrationID: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'filter by registrationID',
        async (role) => {
          const regId = role === 'admin' ? adminRegId : userRegId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query Groups($registrationId: Int) {
                groups(registrationID: $registrationId) {
                  id
                  name
                  groupType
                  registration {
                    id
                    label
                  }
                }
              }
            `, {
              registrationId: regId,
            }) as { data?: { groups: Group[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.groups,
          }
        },
      )

      // Admin should filter successfully
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)

      // User should be forbidden (admin-only query)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should find group by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find group by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query Group($groupId: Int, $registrationId: Int) {
                group(groupID: $groupId, registrationID: $registrationId) {
                  id
                  name
                  groupType
                  registration {
                    id
                    label
                  }
                }
              }
            `, {
              groupId: testGroupId,
              registrationId: null,
            }) as { data?: { group: Group }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            found: !!response.data?.group,
            hasRegistration: !!response.data?.group?.registration,
          }
        },
      )

      // Both roles should find the group
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.found).toBe(true)
      expect(results.admin.hasRegistration).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.found).toBe(true)
      expect(results.user.hasRegistration).toBe(true)
    })

    it('Should find group by registrationID for both roles', async () => {
      const results = await testWithBothRoles(
        'find group by registrationID',
        async (role) => {
          const regId = role === 'admin' ? adminRegId : userRegId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query Group($groupId: Int, $registrationId: Int) {
                group(groupID: $groupId, registrationID: $registrationId) {
                  id
                  name
                  groupType
                  registration {
                    id
                    label
                  }
                }
              }
            `, {
              groupId: null,
              registrationId: regId,
            }) as { data?: { group: Group }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            found: !!response.data?.group,
          }
        },
      )

      // Both roles should find the group by registrationID
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.found).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.found).toBe(true)
    })

    it('Should return error when group not found for both roles', async () => {
      const results = await testWithBothRoles(
        'find non-existent group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query Group($groupId: Int, $registrationId: Int) {
                group(groupID: $groupId, registrationID: $registrationId) {
                  id
                  name
                }
              }
            `, {
              groupId: 999999,
              registrationId: null,
            }) as { data?: { group: Group }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            found: !!response.data?.group,
          }
        },
      )

      // Both roles should get errors for non-existent group
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.found).toBe(false)

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.found).toBe(false)
    })
  })

  describe('Group Mutations - Create', () => {
    let createdGroupIds: { admin?: number, user?: number } = {}
    let createTestRegIds: { admin?: number, user?: number } = {}

    beforeEach(async () => {
      // Create separate registrations for each create test
      const adminReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('admin'),
          performerType: 'GROUP',
          label: 'Create Test Admin Registration',
        },
      })
      createTestRegIds.admin = adminReg.id

      const userReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('user'),
          performerType: 'GROUP',
          label: 'Create Test User Registration',
        },
      })
      createTestRegIds.user = userReg.id
    })

    afterEach(async () => {
      // Clean up created groups and registrations
      if (createdGroupIds.admin) {
        await globalThis.prisma.tbl_reg_group.deleteMany({
          where: { id: createdGroupIds.admin },
        }).catch(() => {})
      }
      if (createdGroupIds.user) {
        await globalThis.prisma.tbl_reg_group.deleteMany({
          where: { id: createdGroupIds.user },
        }).catch(() => {})
      }
      if (createTestRegIds.admin) {
        await globalThis.prisma.tbl_registration.deleteMany({
          where: { id: createTestRegIds.admin },
        }).catch(() => {})
      }
      if (createTestRegIds.user) {
        await globalThis.prisma.tbl_registration.deleteMany({
          where: { id: createTestRegIds.user },
        }).catch(() => {})
      }
      createdGroupIds = {}
      createTestRegIds = {}
    })

    it('Should create group with registrationID: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'create group',
        async (role) => {
          const regId = createTestRegIds[role]!

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              registrationId: regId,
            }) as { data?: { groupCreate: GroupPayload }, errors?: readonly any[] }

          const groupId = response.data?.groupCreate?.group?.id
          if (groupId) {
            createdGroupIds[role] = groupId
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            group: response.data?.groupCreate?.group,
            userErrors: response.data?.groupCreate?.userErrors,
          }
        },
      )

      // Both roles should successfully create group
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.group).toBeTruthy()
      expect(results.admin.group?.id).toBeTypeOf('number')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.group).toBeTruthy()
      expect(results.user.group?.id).toBeTypeOf('number')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for invalid registrationID: both roles', async () => {
      const results = await testWithBothRoles(
        'create with invalid registrationID',
        async (role) => {
          const invalidRegId = 999999

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              registrationId: invalidRegId,
            }) as { data?: { groupCreate: GroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            group: response.data?.groupCreate?.group,
            userErrors: response.data?.groupCreate?.userErrors,
          }
        },
      )

      // Both roles should get userError for invalid registration ID
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.group).toBeNull()

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
      expect(results.user.group).toBeNull()
    })
  })

  describe('Group Mutations - Update', () => {
    let updateTestGroupId: number
    let updateTestRegId: number

    beforeAll(async () => {
      // Create a separate registration for update tests
      const updateReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('admin'),
          performerType: 'GROUP',
          label: 'Update Test Registration',
        },
      })
      updateTestRegId = updateReg.id

      const group = await globalThis.prisma.tbl_reg_group.create({
        data: {
          regID: updateTestRegId,
          name: 'Update Test Group',
          groupType: 'Vocal',
        },
      })
      updateTestGroupId = group.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_group.deleteMany({
        where: { id: updateTestGroupId },
      }).catch(() => {})
      await globalThis.prisma.tbl_registration.deleteMany({
        where: { id: updateTestRegId },
      }).catch(() => {})
    })

    it('Should update group: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'update group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              groupId: updateTestGroupId,
              groupInput: {
                name: `Updated by ${role}`,
                groupType: 'Instrumental',
              },
            }) as { data?: { groupUpdate: GroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            group: response.data?.groupUpdate?.group,
            userErrors: response.data?.groupUpdate?.userErrors,
          }
        },
      )

      // Both roles should successfully update
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.group?.name).toContain('Updated by')
      expect(results.admin.group?.groupType).toBe('Instrumental')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.group?.name).toContain('Updated by')
      expect(results.user.group?.groupType).toBe('Instrumental')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for non-existent group: both roles', async () => {
      const results = await testWithBothRoles(
        'update non-existent group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation GroupUpdate($groupId: Int!, $groupInput: GroupInput!) {
                groupUpdate(groupID: $groupId, groupInput: $groupInput) {
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
            `, {
              groupId: 999999,
              groupInput: {
                name: 'Updated Group',
              },
            }) as { data?: { groupUpdate: GroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            group: response.data?.groupUpdate?.group,
            userErrors: response.data?.groupUpdate?.userErrors,
          }
        },
      )

      // Both roles should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.group).toBeNull()

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
      expect(results.user.group).toBeNull()
    })

    it('Should return GraphQL error for null groupID: both roles', async () => {
      const results = await testWithBothRoles(
        'update with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation GroupUpdate($groupId: Int!, $groupInput: GroupInput!) {
                groupUpdate(groupID: $groupId, groupInput: $groupInput) {
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
            `, {
              groupId: null,
              groupInput: {
                name: 'Updated Group',
              },
            }) as { data?: { groupUpdate: GroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
          }
        },
      )

      // Both roles should get GraphQL errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.isAuthorized).toBe(false)

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.isAuthorized).toBe(false)
    })

    it('Should return GraphQL error for invalid input fields: both roles', async () => {
      const results = await testWithBothRoles(
        'update with invalid fields',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation GroupUpdate($groupId: Int!, $groupInput: GroupInput!) {
                groupUpdate(groupID: $groupId, groupInput: $groupInput) {
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
            `, {
              groupId: updateTestGroupId,
              groupInput: {
                name: 'Updated Group',
                okeydokey: true,
              },
            }) as { data?: { groupUpdate: GroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
          }
        },
      )

      // Both roles should get GraphQL errors for invalid input
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.isAuthorized).toBe(false)

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.isAuthorized).toBe(false)
    })
  })

  describe('Group Mutations - Delete', () => {
    let deleteTestGroupIds: { admin?: number, user?: number } = {}
    let deleteTestRegIds: { admin?: number, user?: number } = {}

    beforeEach(async () => {
      // Create separate registrations for each delete test
      const adminReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('admin'),
          performerType: 'GROUP',
          label: 'Delete Test Admin Registration',
        },
      })
      deleteTestRegIds.admin = adminReg.id

      const userReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('user'),
          performerType: 'GROUP',
          label: 'Delete Test User Registration',
        },
      })
      deleteTestRegIds.user = userReg.id

      // Create groups for each role to delete
      const adminGroup = await globalThis.prisma.tbl_reg_group.create({
        data: {
          regID: deleteTestRegIds.admin!,
          name: 'Admin Delete Test Group',
        },
      })
      deleteTestGroupIds.admin = adminGroup.id

      const userGroup = await globalThis.prisma.tbl_reg_group.create({
        data: {
          regID: deleteTestRegIds.user!,
          name: 'User Delete Test Group',
        },
      })
      deleteTestGroupIds.user = userGroup.id
    })

    afterEach(async () => {
      // Clean up any remaining groups and registrations
      await globalThis.prisma.tbl_reg_group.deleteMany({
        where: {
          OR: [
            { id: deleteTestGroupIds.admin },
            { id: deleteTestGroupIds.user },
          ],
        },
      }).catch(() => {})
      await globalThis.prisma.tbl_registration.deleteMany({
        where: {
          OR: [
            { id: deleteTestRegIds.admin },
            { id: deleteTestRegIds.user },
          ],
        },
      }).catch(() => {})
      deleteTestGroupIds = {}
      deleteTestRegIds = {}
    })

    it('Should delete group: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'delete group',
        async (role) => {
          const groupId = deleteTestGroupIds[role]!

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              groupId,
            }) as { data?: { groupDelete: GroupPayload }, errors?: readonly any[] }

          // Verify deletion
          const deletedGroup = await globalThis.prisma.tbl_reg_group.findUnique({
            where: { id: groupId },
          })

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            group: response.data?.groupDelete?.group,
            userErrors: response.data?.groupDelete?.userErrors,
            isDeleted: !deletedGroup,
          }
        },
      )

      // Both roles should successfully delete
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.group?.name).toBe('Admin Delete Test Group')
      expect(results.admin.isDeleted).toBe(true)
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.group?.name).toBe('User Delete Test Group')
      expect(results.user.isDeleted).toBe(true)
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for non-existent group: both roles', async () => {
      const results = await testWithBothRoles(
        'delete non-existent group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              groupId: 999999,
            }) as { data?: { groupDelete: GroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            group: response.data?.groupDelete?.group,
            userErrors: response.data?.groupDelete?.userErrors,
          }
        },
      )

      // Both roles should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
    })

    it('Should return GraphQL error for null groupID: both roles', async () => {
      const results = await testWithBothRoles(
        'delete with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              groupId: null,
            }) as { data?: { groupDelete: GroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
          }
        },
      )

      // Both roles should get GraphQL errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.isAuthorized).toBe(false)

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.isAuthorized).toBe(false)
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query Groups {
            groups {
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
