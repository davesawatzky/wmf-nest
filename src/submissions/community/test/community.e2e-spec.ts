import gql from 'graphql-tag'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import { Community, CommunityPayload } from '../entities/community.entity'

describe('Community E2E Tests', () => {
  let adminRegId: number
  let userRegId: number
  let testCommunityId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Create registrations for both roles
    // Note: Each registration can only have ONE community due to unique constraint on regID
    const adminReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        performerType: 'COMMUNITY',
        label: 'Test Admin Community Registration',
      },
    })
    adminRegId = adminReg.id

    const userReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        performerType: 'COMMUNITY',
        label: 'Test User Community Registration',
      },
    })
    userRegId = userReg.id

    // Create an additional registration for query tests (won't be used for mutations)
    const queryReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        performerType: 'COMMUNITY',
        label: 'Test Query Registration',
      },
    })

    // Create a test community for query tests
    const testCommunity = await globalThis.prisma.tbl_reg_community.create({
      data: {
        regID: queryReg.id,
        name: 'Test Query Community',
        city: 'Test City',
        address: '123 Test St',
      },
    })
    testCommunityId = testCommunity.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Clean up test data
    await globalThis.prisma.tbl_reg_community.deleteMany({
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

  describe('Community Queries', () => {
    it('Should enforce list authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'list all communities',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCommunities {
                communities {
                  id
                  name
                  city
                  phone
                  email
                  postalCode
                  province
                  address
                }
              }
            `) as { data?: { communities: Community[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.communities,
            count: response.data?.communities?.length || 0,
          }
        },
      )

      // Admin should successfully retrieve communities
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
        'list communities with registrations',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCommunitiesWithRegistrations {
                communities {
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
            `) as { data?: { communities: Community[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.communities,
            hasRegistration: !!response.data?.communities?.[0]?.registration,
          }
        },
      )

      // Admin should see communities with registrations
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.hasRegistration).toBe(true)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should enforce list with community groups authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'list communities with groups',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCommunitiesWithGroups {
                communities {
                  id
                  name
                  registration {
                    id
                    label
                  }
                  communityGroups {
                    id
                    name
                  }
                }
              }
            `) as { data?: { communities: Community[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.communities,
            hasCommunityGroups: 'communityGroups' in (response.data?.communities?.[0] || {}) || false,
          }
        },
      )

      // Admin should see communities with groups
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.hasCommunityGroups).toBe(true)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should find community by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find community by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCommunity($communityId: Int) {
                community(communityID: $communityId) {
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
            `, {
              communityId: testCommunityId,
            }) as { data?: { community: Community }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            found: !!response.data?.community,
            hasRegistration: !!response.data?.community?.registration,
          }
        },
      )

      // Both roles should find the community
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.found).toBe(true)
      expect(results.admin.hasRegistration).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.found).toBe(true)
      expect(results.user.hasRegistration).toBe(true)
    })

    it('Should return error when community not found for both roles', async () => {
      const results = await testWithBothRoles(
        'find non-existent community',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCommunity($communityId: Int, $registrationId: Int) {
                community(communityID: $communityId, registrationID: $registrationId) {
                  id
                  name
                }
              }
            `, {
              communityId: 999999,
              registrationId: 999999,
            }) as { data?: { community: Community }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            found: !!response.data?.community,
          }
        },
      )

      // Both roles should get errors for non-existent community
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.found).toBe(false)

      expect(results.user.hasErrors).toBe(true)
      expect(results.user.found).toBe(false)
    })
  })

  describe('Community Mutations - Create', () => {
    let createdCommunityIds: { admin?: number, user?: number } = {}

    afterEach(async () => {
      // Clean up created communities
      if (createdCommunityIds.admin) {
        await globalThis.prisma.tbl_reg_community.deleteMany({
          where: { id: createdCommunityIds.admin },
        }).catch(() => {})
      }
      if (createdCommunityIds.user) {
        await globalThis.prisma.tbl_reg_community.deleteMany({
          where: { id: createdCommunityIds.user },
        }).catch(() => {})
      }
      createdCommunityIds = {}
    })

    it('Should create community with registrationID: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'create community',
        async (role) => {
          const regId = role === 'admin' ? adminRegId : userRegId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityCreate($registrationId: Int!) {
                communityCreate(registrationID: $registrationId) {
                  community {
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
            }) as { data?: { communityCreate: CommunityPayload }, errors?: readonly any[] }

          const communityId = response.data?.communityCreate?.community?.id
          if (communityId) {
            createdCommunityIds[role] = communityId
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            community: response.data?.communityCreate?.community,
            userErrors: response.data?.communityCreate?.userErrors,
          }
        },
      )

      // Both roles should successfully create community
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.community).toBeTruthy()
      expect(results.admin.community?.id).toBeTypeOf('number')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.community).toBeTruthy()
      expect(results.user.community?.id).toBeTypeOf('number')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should create community with communityInput: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'create community with input',
        async (role) => {
          const regId = role === 'admin' ? adminRegId : userRegId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityCreate(
                $registrationId: Int!
                $communityInput: CommunityInput
              ) {
                communityCreate(
                  registrationID: $registrationId
                  communityInput: $communityInput
                ) {
                  community {
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
              registrationId: regId,
              communityInput: {
                name: `Test ${role} Community`,
              },
            }) as { data?: { communityCreate: CommunityPayload }, errors?: readonly any[] }

          const communityId = response.data?.communityCreate?.community?.id
          if (communityId) {
            createdCommunityIds[role] = communityId
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            community: response.data?.communityCreate?.community,
            userErrors: response.data?.communityCreate?.userErrors,
          }
        },
      )

      // Both roles should successfully create community with input
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.community?.name).toBe('Test admin Community')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.community?.name).toBe('Test user Community')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for invalid registrationID: both roles', async () => {
      const results = await testWithBothRoles(
        'create with invalid registrationID',
        async (role) => {
          const invalidRegId = 999999

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityCreate(
                $registrationId: Int!
                $communityInput: CommunityInput
              ) {
                communityCreate(
                  registrationID: $registrationId
                  communityInput: $communityInput
                ) {
                  community {
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
              registrationId: invalidRegId,
              communityInput: {
                name: 'Test Community',
              },
            }) as { data?: { communityCreate: CommunityPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            community: response.data?.communityCreate?.community,
            userErrors: response.data?.communityCreate?.userErrors,
          }
        },
      )

      // Both roles should get userError for invalid registration
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.community).toBeNull()

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
      expect(results.user.community).toBeNull()
    })
  })

  describe('Community Mutations - Update', () => {
    let updateTestCommunityId: number
    let updateTestRegId: number

    beforeAll(async () => {
      // Create a separate registration for update tests
      const updateReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('admin'),
          performerType: 'COMMUNITY',
          label: 'Update Test Registration',
        },
      })
      updateTestRegId = updateReg.id

      const community = await globalThis.prisma.tbl_reg_community.create({
        data: {
          regID: updateTestRegId,
          name: 'Update Test Community',
          address: 'Original Address',
        },
      })
      updateTestCommunityId = community.id
    })

    afterAll(async () => {
      await globalThis.prisma.tbl_reg_community.deleteMany({
        where: { id: updateTestCommunityId },
      }).catch(() => {})
      await globalThis.prisma.tbl_registration.deleteMany({
        where: { id: updateTestRegId },
      }).catch(() => {})
    })

    it('Should update community: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'update community',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityUpdate(
                $communityId: Int!
                $communityInput: CommunityInput!
              ) {
                communityUpdate(
                  communityID: $communityId
                  communityInput: $communityInput
                ) {
                  community {
                    id
                    name
                    address
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `, {
              communityId: updateTestCommunityId,
              communityInput: {
                address: `Updated by ${role}`,
              },
            }) as { data?: { communityUpdate: CommunityPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            community: response.data?.communityUpdate?.community,
            userErrors: response.data?.communityUpdate?.userErrors,
          }
        },
      )

      // Both roles should successfully update
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.community?.address).toContain('Updated by')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.community?.address).toContain('Updated by')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for non-existent community: both roles', async () => {
      const results = await testWithBothRoles(
        'update non-existent community',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityUpdate(
                $communityId: Int!
                $communityInput: CommunityInput!
              ) {
                communityUpdate(
                  communityID: $communityId
                  communityInput: $communityInput
                ) {
                  community {
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
              communityId: 999999,
              communityInput: {
                address: 'Updated Address',
              },
            }) as { data?: { communityUpdate: CommunityPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            community: response.data?.communityUpdate?.community,
            userErrors: response.data?.communityUpdate?.userErrors,
          }
        },
      )

      // Both roles should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.community).toBeNull()

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
      expect(results.user.community).toBeNull()
    })

    it('Should return GraphQL error for null communityID: both roles', async () => {
      const results = await testWithBothRoles(
        'update with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityUpdate(
                $communityId: Int!
                $communityInput: CommunityInput!
              ) {
                communityUpdate(
                  communityID: $communityId
                  communityInput: $communityInput
                ) {
                  community {
                    id
                    name
                    address
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `, {
              communityId: null,
              communityInput: {
                address: 'Updated Address',
              },
            }) as { data?: { communityUpdate: CommunityPayload }, errors?: readonly any[] }

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
              mutation CommunityUpdate(
                $communityId: Int!
                $communityInput: CommunityInput!
              ) {
                communityUpdate(
                  communityID: $communityId
                  communityInput: $communityInput
                ) {
                  community {
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
              communityId: updateTestCommunityId,
              communityInput: {
                name: 'Updated Community',
                invalidField: true,
              },
            }) as { data?: { communityUpdate: CommunityPayload }, errors?: readonly any[] }

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

  describe('Community Mutations - Delete', () => {
    let deleteTestCommunityIds: { admin?: number, user?: number } = {}

    beforeEach(async () => {
      // Create communities for each role to delete
      const adminCommunity = await globalThis.prisma.tbl_reg_community.create({
        data: {
          regID: adminRegId,
          name: 'Admin Delete Test Community',
        },
      })
      deleteTestCommunityIds.admin = adminCommunity.id

      const userCommunity = await globalThis.prisma.tbl_reg_community.create({
        data: {
          regID: userRegId,
          name: 'User Delete Test Community',
        },
      })
      deleteTestCommunityIds.user = userCommunity.id
    })

    afterEach(async () => {
      // Clean up any remaining communities
      await globalThis.prisma.tbl_reg_community.deleteMany({
        where: {
          OR: [
            { id: deleteTestCommunityIds.admin },
            { id: deleteTestCommunityIds.user },
          ],
        },
      }).catch(() => {})
      deleteTestCommunityIds = {}
    })

    it('Should delete community: both roles succeed', async () => {
      const results = await testWithBothRoles(
        'delete community',
        async (role) => {
          const communityId = deleteTestCommunityIds[role]!

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityDelete($communityId: Int!) {
                communityDelete(communityID: $communityId) {
                  community {
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
              communityId,
            }) as { data?: { communityDelete: CommunityPayload }, errors?: readonly any[] }

          // Verify deletion
          const deletedCommunity = await globalThis.prisma.tbl_reg_community.findUnique({
            where: { id: communityId },
          })

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            community: response.data?.communityDelete?.community,
            userErrors: response.data?.communityDelete?.userErrors,
            isDeleted: !deletedCommunity,
          }
        },
      )

      // Both roles should successfully delete
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.community?.name).toBe('Admin Delete Test Community')
      expect(results.admin.isDeleted).toBe(true)
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.community?.name).toBe('User Delete Test Community')
      expect(results.user.isDeleted).toBe(true)
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for non-existent community: both roles', async () => {
      const results = await testWithBothRoles(
        'delete non-existent community',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityDelete($communityId: Int!) {
                communityDelete(communityID: $communityId) {
                  community {
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
              communityId: 999999,
            }) as { data?: { communityDelete: CommunityPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            community: response.data?.communityDelete?.community,
            userErrors: response.data?.communityDelete?.userErrors,
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

    it('Should return GraphQL error for null communityID: both roles', async () => {
      const results = await testWithBothRoles(
        'delete with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CommunityDelete($communityId: Int!) {
                communityDelete(communityID: $communityId) {
                  community {
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
              communityId: null,
            }) as { data?: { communityDelete: CommunityPayload }, errors?: readonly any[] }

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
          query GetCommunities {
            communities {
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
