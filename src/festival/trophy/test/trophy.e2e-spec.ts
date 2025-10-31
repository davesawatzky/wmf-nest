import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import { Trophy, TrophyPayload } from '../entities/trophy.entity'

describe('Trophy E2E Tests', () => {
  let queryTestTrophyId: number

  // Mock data for testing
  const mockTrophy = {
    name: 'E2E Test Trophy',
    description: 'E2E Test Trophy Description',
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_trophy.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })

    // Create a persistent trophy for query tests
    const testTrophy = await globalThis.prisma.tbl_trophy.create({
      data: mockTrophy,
    })
    queryTestTrophyId = testTrophy.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_trophy.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })
  })

  describe('Trophy Queries (Both Roles)', () => {
    it('Should list all trophies for both roles', async () => {
      const results = await testWithBothRoles(
        'list trophies',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTrophies {
                trophies {
                  id
                  name
                  description
                }
              }
            `)
            .expectNoErrors() as { data: { trophies: Trophy[] } }

          const trophies = response.data.trophies
          const firstTrophy = trophies[0]

          return {
            hasData: !!trophies,
            isArray: Array.isArray(trophies),
            count: trophies?.length || 0,
            hasValidTypes: typeof firstTrophy?.id === 'number'
              && typeof firstTrophy?.name === 'string',
          }
        },
      )

      // Both roles should successfully retrieve trophies
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)
    })

    it('Should list trophies with associated festivalClasses for both roles', async () => {
      const results = await testWithBothRoles(
        'list with festivalClasses',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTrophies {
                trophies {
                  id
                  name
                  description
                  festivalClasses {
                    id
                    classNumber
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { trophies: Trophy[] } }

          const trophyWithClasses = response.data.trophies.find(
            t => t.festivalClasses && t.festivalClasses.length > 0,
          )

          return {
            hasData: !!response.data.trophies,
            count: response.data.trophies?.length || 0,
            hasClasses: !!trophyWithClasses,
            classNumber: trophyWithClasses?.festivalClasses?.[0]?.classNumber,
          }
        },
      )

      // Both roles should get festivalClasses
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      if (results.admin.hasClasses) {
        expect(results.user.hasClasses).toBe(true)
        expect(results.admin.classNumber).toBeTruthy()
        expect(results.user.classNumber).toBe(results.admin.classNumber)
      }
    })

    it('Should find specific trophy by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find trophy by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTrophy($trophyId: Int!) {
                trophy(id: $trophyId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({ trophyId: queryTestTrophyId })
            .expectNoErrors() as { data: { trophy: Trophy } }

          return {
            hasData: !!response.data.trophy,
            trophy: response.data.trophy,
          }
        },
      )

      // Both roles should find the trophy
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.trophy.name).toBe(mockTrophy.name)
      expect(results.user.trophy.name).toBe(mockTrophy.name)
      expect(results.admin.trophy.description).toBe(mockTrophy.description)
      expect(results.user.trophy.description).toBe(mockTrophy.description)
    })

    it('Should return error when trophy not found for both roles', async () => {
      const results = await testWithBothRoles(
        'trophy not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTrophy($trophyId: Int!) {
                trophy(id: $trophyId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({ trophyId: 999999 }) as { errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Trophy Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create trophy',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateTrophy($trophyInput: TrophyInput!) {
                trophyCreate(trophyInput: $trophyInput) {
                  userErrors {
                    message
                    field
                  }
                  trophy {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              trophyInput: {
                name: `E2E Test ${role} Trophy Create`,
                description: `E2E Test ${role} Description`,
              },
            }) as { data?: { trophyCreate: TrophyPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            trophy: response.data?.trophyCreate?.trophy as Trophy | undefined,
            userErrors: response.data?.trophyCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.trophy).toBeTruthy()
      expect(results.admin.trophy?.name).toBe('E2E Test admin Trophy Create')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.trophy).toBeUndefined()

      // Cleanup admin's created trophy
      if (results.admin.trophy?.id) {
        await globalThis.prisma.tbl_trophy.delete({
          where: { id: results.admin.trophy.id },
        })
      }
    })

    it('Should return validation error for duplicate trophy name', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
            trophyCreate(trophyInput: $trophyInput) {
              userErrors {
                message
                field
              }
              trophy {
                id
                name
              }
            }
          }
        `, {
          trophyInput: {
            name: mockTrophy.name, // Duplicate
            description: 'Duplicate Test',
          },
        }) as { data: { trophyCreate: TrophyPayload } }

      expect(response.data.trophyCreate.userErrors).toHaveLength(1)
      expect(response.data.trophyCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.trophyCreate.trophy).toBeNull()
    })

    it('Should return error for null name in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
            trophyCreate(trophyInput: $trophyInput) {
              userErrors {
                message
                field
              }
              trophy {
                id
                name
              }
            }
          }
        `, {
          trophyInput: {
            name: null,
            description: 'Test Description',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      // Create trophy for testing
      const testTrophy = await globalThis.prisma.tbl_trophy.create({
        data: {
          name: 'E2E Test Update Trophy',
          description: 'Original Description',
        },
      })

      const results = await testWithBothRoles(
        'update trophy',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateTrophy(
                $trophyId: Int!
                $trophyInput: TrophyInput!
              ) {
                trophyUpdate(
                  trophyID: $trophyId
                  trophyInput: $trophyInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  trophy {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              trophyId: testTrophy.id,
              trophyInput: {
                name: 'E2E Test Updated Trophy',
                description: 'Updated Description',
              },
            }) as { data?: { trophyUpdate: TrophyPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            trophy: response.data?.trophyUpdate?.trophy as Trophy | undefined,
            userErrors: response.data?.trophyUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.trophy).toBeTruthy()
      expect(results.admin.trophy?.name).toBe('E2E Test Updated Trophy')
      expect(results.admin.trophy?.description).toBe('Updated Description')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.trophy).toBeUndefined()

      // Cleanup
      await globalThis.prisma.tbl_trophy.delete({
        where: { id: testTrophy.id },
      })
    })

    it('Should return error when updating non-existent trophy', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateTrophy(
            $trophyId: Int!
            $trophyInput: TrophyInput!
          ) {
            trophyUpdate(
              trophyID: $trophyId
              trophyInput: $trophyInput
            ) {
              userErrors {
                message
                field
              }
              trophy {
                id
                name
              }
            }
          }
        `, {
          trophyId: 999999,
          trophyInput: {
            name: 'Non-existent Trophy',
            description: 'Test',
          },
        }) as { data: { trophyUpdate: TrophyPayload } }

      expect(response.data.trophyUpdate.trophy).toBeNull()
      expect(response.data.trophyUpdate.userErrors).toHaveLength(1)
      expect(response.data.trophyUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Should return error for null name in update', async () => {
      // Create trophy for testing
      const testTrophy = await globalThis.prisma.tbl_trophy.create({
        data: {
          name: 'E2E Test Null Update Trophy',
          description: 'Test',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateTrophy(
            $trophyId: Int!
            $trophyInput: TrophyInput!
          ) {
            trophyUpdate(
              trophyID: $trophyId
              trophyInput: $trophyInput
            ) {
              userErrors {
                message
                field
              }
              trophy {
                id
                name
              }
            }
          }
        `, {
          trophyId: testTrophy.id,
          trophyInput: {
            name: null,
            description: 'Updated',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()

      // Cleanup
      await globalThis.prisma.tbl_trophy.delete({
        where: { id: testTrophy.id },
      })
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create trophies for both roles to attempt deletion
      const adminTrophy = await globalThis.prisma.tbl_trophy.create({
        data: {
          name: 'E2E Test Delete Admin Trophy',
          description: 'Admin Delete Test',
        },
      })

      const userTrophy = await globalThis.prisma.tbl_trophy.create({
        data: {
          name: 'E2E Test Delete User Trophy',
          description: 'User Delete Test',
        },
      })

      const results = await testWithBothRoles(
        'delete trophy',
        async (role) => {
          const trophyId = role === 'admin' ? adminTrophy.id : userTrophy.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteTrophy($trophyDeleteId: Int!) {
                trophyDelete(trophyID: $trophyDeleteId) {
                  userErrors {
                    message
                    field
                  }
                  trophy {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              trophyDeleteId: trophyId,
            }) as { data?: { trophyDelete: TrophyPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            trophy: response.data?.trophyDelete?.trophy as Trophy | undefined,
            userErrors: response.data?.trophyDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.trophy).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.trophy).toBeTruthy()
      expect(results.admin.trophy?.name).toBe('E2E Test Delete Admin Trophy')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's trophy was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_trophy.findUnique({
        where: { id: adminTrophy.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's trophy (wasn't deleted)
      await globalThis.prisma.tbl_trophy.delete({
        where: { id: userTrophy.id },
      })
    })

    it('Should return error when deleting non-existent trophy', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteTrophy($trophyDeleteId: Int!) {
            trophyDelete(trophyID: $trophyDeleteId) {
              userErrors {
                message
                field
              }
              trophy {
                id
                name
              }
            }
          }
        `, {
          trophyDeleteId: 999999,
        }) as { data: { trophyDelete: TrophyPayload } }

      expect(response.data.trophyDelete.trophy).toBeNull()
      expect(response.data.trophyDelete.userErrors).toHaveLength(1)
      expect(response.data.trophyDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for mutations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
            trophyCreate(trophyInput: $trophyInput) {
              userErrors {
                message
                field
              }
              trophy {
                id
                name
              }
            }
          }
        `, {
          trophyInput: {
            name: 'Test',
            description: 'Test',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
