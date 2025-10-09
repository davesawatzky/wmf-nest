import gql from 'graphql-tag'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import { CommunityGroup, CommunityGroupPayload } from '../entities/community-group.entity'

describe('CommunityGroup E2E Tests', () => {
  let adminRegId: number
  let userRegId: number
  let adminCommId: number
  let userCommId: number
  let testCommunityGroupId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Create registrations and communities for both roles
    const adminReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        performerType: 'COMMUNITY',
        label: 'Test Admin Registration',
      },
    })
    adminRegId = adminReg.id

    const userReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        performerType: 'COMMUNITY',
        label: 'Test User Registration',
      },
    })
    userRegId = userReg.id

    const adminComm = await globalThis.prisma.tbl_reg_community.create({
      data: {
        regID: adminRegId,
        name: 'Test Admin Community',
      },
    })
    adminCommId = adminComm.id

    const userComm = await globalThis.prisma.tbl_reg_community.create({
      data: {
        regID: userRegId,
        name: 'Test User Community',
      },
    })
    userCommId = userComm.id

    // Create a test community group for queries
    const testCommunityGroup = await globalThis.prisma.tbl_reg_communitygroup.create({
      data: {
        communityID: adminCommId,
        name: 'Test Query CommunityGroup',
        groupSize: 20,
        chaperones: 2,
      },
    })
    testCommunityGroupId = testCommunityGroup.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Clean up test data
    await globalThis.prisma.tbl_reg_communitygroup.deleteMany({
      where: {
        OR: [
          { communityID: adminCommId },
          { communityID: userCommId },
          { name: { startsWith: 'Test' } },
        ],
      },
    })

    await globalThis.prisma.tbl_reg_community.deleteMany({
      where: {
        OR: [
          { id: adminCommId },
          { id: userCommId },
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

  describe('CommunityGroup Queries', () => {
    it('Should list all community groups for both roles', async () => {
      const results = await testWithBothRoles(
        'list all community groups',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query CommunityGroups {
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
            `) as { data?: { communityGroups: CommunityGroup[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.communityGroups,
            count: response.data?.communityGroups?.length || 0,
          }
        },
      )

      // Both roles should successfully retrieve community groups
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should list community groups with community and registration for both roles', async () => {
      const results = await testWithBothRoles(
        'list community groups with relations',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query CommunityGroups {
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
            `) as { data?: { communityGroups: CommunityGroup[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.communityGroups,
            hasCommunity: !!response.data?.communityGroups?.[0]?.community,
            hasRegistration: !!response.data?.communityGroups?.[0]?.community?.registration,
          }
        },
      )

      // Both roles should see community groups with relationships
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.hasCommunity).toBe(true)
      expect(results.admin.hasRegistration).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.hasData).toBe(true)
      expect(results.user.hasCommunity).toBe(true)
      expect(results.user.hasRegistration).toBe(true)
    })

    it('Should filter community groups by communityID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by communityID',
        async (role) => {
          const commId = role === 'admin' ? adminCommId : userCommId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query CommunityGroups($communityId: Int) {
                communityGroups(communityID: $communityId) {
                  id
                  name
                  groupSize
                }
              }
            `, {
              communityId: commId,
            }) as { data?: { communityGroups: CommunityGroup[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.communityGroups,
            count: response.data?.communityGroups?.length || 0,
          }
        },
      )

      // Both roles should filter successfully
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.hasData).toBe(true)
    })

    it('Should find community group by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find community group by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
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
            `, {
              communityGroupId: testCommunityGroupId,
            }) as { data?: { communityGroup: CommunityGroup }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            found: !!response.data?.communityGroup,
            hasCommunity: !!response.data?.communityGroup?.community,
          }
        },
      )

      // Both roles should find the community group
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.found).toBe(true)
      expect(results.admin.hasCommunity).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.found).toBe(true)
      expect(results.user.hasCommunity).toBe(true)
    })

    it('Should return error when community group not found for both roles', async () => {
      const results = await testWithBothRoles(
        'find non-existent community group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query CommunityGroup($communityGroupId: Int!) {
                communityGroup(communityGroupID: $communityGroupId) {
                  id
                  name
                }
              }
            `, {
              communityGroupId: 999999,
            }) as { data?: { communityGroup: CommunityGroup }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            found: !!response.data?.communityGroup,
          }
        },
      )

      // Both roles should get errors for non-existent community group
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.found).toBe(false)

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.found).toBe(false)
    })
  })

  describe('CommunityGroup Mutations - Create', () => {
    let createdCommunityGroupIds: { admin?: number, user?: number } = {}

    afterEach(async () => {
      // Clean up created community groups
      if (createdCommunityGroupIds.admin) {
        await globalThis.prisma.tbl_reg_communitygroup.deleteMany({
          where: { id: createdCommunityGroupIds.admin },
        }).catch(() => {})
      }
      if (createdCommunityGroupIds.user) {
        await globalThis.prisma.tbl_reg_communitygroup.deleteMany({
          where: { id: createdCommunityGroupIds.user },
        }).catch(() => {})
      }
      createdCommunityGroupIds = {}
    })

    it('Should create community group with communityID: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'create community group',
        async (role) => {
          const commId = role === 'admin' ? adminCommId : userCommId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityGroupCreate(
                $communityId: Int!
                $communityGroupInput: CommunityGroupInput
              ) {
                communityGroupCreate(
                  communityID: $communityId
                  communityGroupInput: $communityGroupInput
                ) {
                  communityGroup {
                    id
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `, {
              communityId: commId,
            }) as { data?: { communityGroupCreate: CommunityGroupPayload }, errors?: readonly any[] }

          const communityGroupId = response.data?.communityGroupCreate?.communityGroup?.id
          if (communityGroupId) {
            createdCommunityGroupIds[role] = communityGroupId
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            communityGroup: response.data?.communityGroupCreate?.communityGroup,
            userErrors: response.data?.communityGroupCreate?.userErrors,
          }
        },
      )

      // Both roles should successfully create community group
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.communityGroup).toBeTruthy()
      expect(results.admin.communityGroup?.id).toBeTypeOf('number')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.communityGroup).toBeTruthy()
      expect(results.user.communityGroup?.id).toBeTypeOf('number')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should create community group with communityGroupInput: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'create community group with input',
        async (role) => {
          const commId = role === 'admin' ? adminCommId : userCommId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityGroupCreate(
                $communityId: Int!
                $communityGroupInput: CommunityGroupInput
              ) {
                communityGroupCreate(
                  communityID: $communityId
                  communityGroupInput: $communityGroupInput
                ) {
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
            `, {
              communityId: commId,
              communityGroupInput: {
                name: `Test ${role} CommunityGroup`,
              },
            }) as { data?: { communityGroupCreate: CommunityGroupPayload }, errors?: readonly any[] }

          const communityGroupId = response.data?.communityGroupCreate?.communityGroup?.id
          if (communityGroupId) {
            createdCommunityGroupIds[role] = communityGroupId
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            communityGroup: response.data?.communityGroupCreate?.communityGroup,
            userErrors: response.data?.communityGroupCreate?.userErrors,
          }
        },
      )

      // Both roles should successfully create community group with input
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.communityGroup?.name).toBe('Test admin CommunityGroup')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.communityGroup?.name).toBe('Test user CommunityGroup')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for invalid communityID: both roles', async () => {
      const results = await testWithBothRoles(
        'create with invalid communityID',
        async (role) => {
          const invalidCommId = 999999

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityGroupCreate(
                $communityId: Int!
                $communityGroupInput: CommunityGroupInput
              ) {
                communityGroupCreate(
                  communityID: $communityId
                  communityGroupInput: $communityGroupInput
                ) {
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
            `, {
              communityId: invalidCommId,
              communityGroupInput: {
                name: 'Test CommunityGroup',
              },
            }) as { data?: { communityGroupCreate: CommunityGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            communityGroup: response.data?.communityGroupCreate?.communityGroup,
            userErrors: response.data?.communityGroupCreate?.userErrors,
          }
        },
      )

      // Both roles should get userError for invalid community ID
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.communityGroup).toBeNull()

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
      expect(results.user.communityGroup).toBeNull()
    })
  })

  describe('CommunityGroup Mutations - Update', () => {
    let updateTestCommunityGroupId: number
    let updateTestCommId: number
    let updateTestRegId: number

    beforeAll(async () => {
      // Create a separate registration and community for update tests
      const updateReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('admin'),
          performerType: 'COMMUNITY',
          label: 'Update Test Registration',
        },
      })
      updateTestRegId = updateReg.id

      const updateComm = await globalThis.prisma.tbl_reg_community.create({
        data: {
          regID: updateTestRegId,
          name: 'Update Test Community',
        },
      })
      updateTestCommId = updateComm.id

      const communityGroup = await globalThis.prisma.tbl_reg_communitygroup.create({
        data: {
          communityID: updateTestCommId,
          name: 'Update Test CommunityGroup',
          groupSize: 25,
          chaperones: 3,
        },
      })
      updateTestCommunityGroupId = communityGroup.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_communitygroup.deleteMany({
        where: { id: updateTestCommunityGroupId },
      }).catch(() => {})
      await globalThis.prisma.tbl_reg_community.deleteMany({
        where: { id: updateTestCommId },
      }).catch(() => {})
      await globalThis.prisma.tbl_registration.deleteMany({
        where: { id: updateTestRegId },
      }).catch(() => {})
    })

    it('Should update community group: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'update community group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityGroupUpdate(
                $communityGroupId: Int!
                $communityGroupInput: CommunityGroupInput!
              ) {
                communityGroupUpdate(
                  communityGroupID: $communityGroupId
                  communityGroupInput: $communityGroupInput
                ) {
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
            `, {
              communityGroupId: updateTestCommunityGroupId,
              communityGroupInput: {
                name: `Updated by ${role}`,
                groupSize: 30,
              },
            }) as { data?: { communityGroupUpdate: CommunityGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            communityGroup: response.data?.communityGroupUpdate?.communityGroup,
            userErrors: response.data?.communityGroupUpdate?.userErrors,
          }
        },
      )

      // Both roles should successfully update
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.communityGroup?.name).toContain('Updated by')
      expect(results.admin.communityGroup?.groupSize).toBe(30)
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.communityGroup?.name).toContain('Updated by')
      expect(results.user.communityGroup?.groupSize).toBe(30)
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for non-existent community group: both roles', async () => {
      const results = await testWithBothRoles(
        'update non-existent community group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityGroupUpdate(
                $communityGroupId: Int!
                $communityGroupInput: CommunityGroupInput!
              ) {
                communityGroupUpdate(
                  communityGroupID: $communityGroupId
                  communityGroupInput: $communityGroupInput
                ) {
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
            `, {
              communityGroupId: 999999,
              communityGroupInput: {
                name: 'Updated CommunityGroup',
              },
            }) as { data?: { communityGroupUpdate: CommunityGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            communityGroup: response.data?.communityGroupUpdate?.communityGroup,
            userErrors: response.data?.communityGroupUpdate?.userErrors,
          }
        },
      )

      // Both roles should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.communityGroup).toBeNull()

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
      expect(results.user.communityGroup).toBeNull()
    })

    it('Should return GraphQL error for null communityGroupID: both roles', async () => {
      const results = await testWithBothRoles(
        'update with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityGroupUpdate(
                $communityGroupId: Int!
                $communityGroupInput: CommunityGroupInput!
              ) {
                communityGroupUpdate(
                  communityGroupID: $communityGroupId
                  communityGroupInput: $communityGroupInput
                ) {
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
            `, {
              communityGroupId: null,
              communityGroupInput: {
                name: 'Updated CommunityGroup',
              },
            }) as { data?: { communityGroupUpdate: CommunityGroupPayload }, errors?: readonly any[] }

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
              mutation CommunityGroupUpdate(
                $communityGroupId: Int!
                $communityGroupInput: CommunityGroupInput!
              ) {
                communityGroupUpdate(
                  communityGroupID: $communityGroupId
                  communityGroupInput: $communityGroupInput
                ) {
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
            `, {
              communityGroupId: updateTestCommunityGroupId,
              communityGroupInput: {
                name: 'Updated CommunityGroup',
                okeydokey: true,
              },
            }) as { data?: { communityGroupUpdate: CommunityGroupPayload }, errors?: readonly any[] }

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

  describe('CommunityGroup Mutations - Delete', () => {
    let deleteTestCommunityGroupIds: { admin?: number, user?: number } = {}
    let deleteTestCommIds: { admin?: number, user?: number } = {}

    beforeEach(async () => {
      // Create community groups for each role to delete
      const adminCommGroup = await globalThis.prisma.tbl_reg_communitygroup.create({
        data: {
          communityID: adminCommId,
          name: 'Admin Delete Test CommunityGroup',
        },
      })
      deleteTestCommunityGroupIds.admin = adminCommGroup.id
      deleteTestCommIds.admin = adminCommId

      const userCommGroup = await globalThis.prisma.tbl_reg_communitygroup.create({
        data: {
          communityID: userCommId,
          name: 'User Delete Test CommunityGroup',
        },
      })
      deleteTestCommunityGroupIds.user = userCommGroup.id
      deleteTestCommIds.user = userCommId
    })

    afterEach(async () => {
      // Clean up any remaining community groups
      await globalThis.prisma.tbl_reg_communitygroup.deleteMany({
        where: {
          OR: [
            { id: deleteTestCommunityGroupIds.admin },
            { id: deleteTestCommunityGroupIds.user },
          ],
        },
      }).catch(() => {})
      deleteTestCommunityGroupIds = {}
      deleteTestCommIds = {}
    })

    it('Should delete community group: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'delete community group',
        async (role) => {
          const communityGroupId = deleteTestCommunityGroupIds[role]!

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              communityGroupId,
            }) as { data?: { communityGroupDelete: CommunityGroupPayload }, errors?: readonly any[] }

          // Verify deletion
          const deletedCommunityGroup = await globalThis.prisma.tbl_reg_communitygroup.findUnique({
            where: { id: communityGroupId },
          })

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            communityGroup: response.data?.communityGroupDelete?.communityGroup,
            userErrors: response.data?.communityGroupDelete?.userErrors,
            isDeleted: !deletedCommunityGroup,
          }
        },
      )

      // Both roles should successfully delete
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.communityGroup?.name).toBe('Admin Delete Test CommunityGroup')
      expect(results.admin.isDeleted).toBe(true)
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.communityGroup?.name).toBe('User Delete Test CommunityGroup')
      expect(results.user.isDeleted).toBe(true)
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for non-existent community group: both roles', async () => {
      const results = await testWithBothRoles(
        'delete non-existent community group',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              communityGroupId: 999999,
            }) as { data?: { communityGroupDelete: CommunityGroupPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            communityGroup: response.data?.communityGroupDelete?.communityGroup,
            userErrors: response.data?.communityGroupDelete?.userErrors,
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

    it('Should return GraphQL error for null communityGroupID: both roles', async () => {
      const results = await testWithBothRoles(
        'delete with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
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
            `, {
              communityGroupId: null,
            }) as { data?: { communityGroupDelete: CommunityGroupPayload }, errors?: readonly any[] }

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
          query CommunityGroups {
            communityGroups {
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
