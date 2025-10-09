import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import { Level, LevelPayload } from '../entities/level.entity'

describe('Level E2E Tests', () => {
  let queryTestLevelId: number

  // Mock data for testing
  const mockLevel = {
    name: 'E2E Test Level',
    description: 'E2E Test Level Description',
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_level.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })

    // Create a persistent level for query tests
    const testLevel = await globalThis.prisma.tbl_level.create({
      data: mockLevel,
    })
    queryTestLevelId = testLevel.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_level.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })
  })

  describe('Level Queries (Both Roles)', () => {
    it('Should list all levels for both roles', async () => {
      const results = await testWithBothRoles(
        'list levels',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetLevels {
                levels {
                  id
                  name
                  description
                }
              }
            `)
            .expectNoErrors() as { data: { levels: Level[] } }

          const levels = response.data.levels
          const firstLevel = levels[0]

          return {
            hasData: !!levels,
            isArray: Array.isArray(levels),
            count: levels?.length || 0,
            hasValidTypes: typeof firstLevel?.id === 'number'
              && typeof firstLevel?.name === 'string',
          }
        },
      )

      // Both roles should successfully retrieve levels
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)
    })

    it('Should filter levels by subdisciplineID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by subdisciplineID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetLevels($categoryId: Int, $subdisciplineId: Int) {
                levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({
              subdisciplineId: 194,
            })
            .expectNoErrors() as { data: { levels: Level[] } }

          return {
            hasData: !!response.data.levels,
            count: response.data.levels?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(1)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter levels by categoryID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by categoryID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetLevels($categoryId: Int, $subdisciplineId: Int) {
                levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({
              categoryId: 43,
            })
            .expectNoErrors() as { data: { levels: Level[] } }

          return {
            hasData: !!response.data.levels,
            count: response.data.levels?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(1)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter levels by both categoryID and subdisciplineID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by both IDs',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetLevels($categoryId: Int, $subdisciplineId: Int) {
                levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({
              categoryId: 40,
              subdisciplineId: 219,
            })
            .expectNoErrors() as { data: { levels: Level[] } }

          return {
            hasData: !!response.data.levels,
            count: response.data.levels?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(1)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should return empty array when no levels match filter for both roles', async () => {
      const results = await testWithBothRoles(
        'empty result set',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetLevels($categoryId: Int, $subdisciplineId: Int) {
                levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({
              categoryId: 999999,
              subdisciplineId: 999999,
            })
            .expectNoErrors() as { data: { levels: Level[] } }

          return {
            hasData: !!response.data.levels,
            count: response.data.levels?.length || 0,
          }
        },
      )

      // Both roles should get empty results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBe(0)
      expect(results.user.count).toBe(0)
    })

    it('Should find specific level by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find level by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetLevel($levelId: Int!) {
                level(id: $levelId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({ levelId: queryTestLevelId })
            .expectNoErrors() as { data: { level: Level } }

          return {
            hasData: !!response.data.level,
            level: response.data.level,
          }
        },
      )

      // Both roles should find the level
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.level.name).toBe(mockLevel.name)
      expect(results.user.level.name).toBe(mockLevel.name)
      expect(results.admin.level.description).toBe(mockLevel.description)
      expect(results.user.level.description).toBe(mockLevel.description)
    })

    it('Should return error when level not found for both roles', async () => {
      const results = await testWithBothRoles(
        'level not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetLevel($levelId: Int!) {
                level(id: $levelId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({ levelId: 999999 }) as { errors?: readonly any[] }

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

  describe('Level Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create level',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateLevel($levelInput: LevelInput!) {
                levelCreate(levelInput: $levelInput) {
                  userErrors {
                    message
                    field
                  }
                  level {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              levelInput: {
                name: `E2E Test ${role} Level Create`,
                description: `E2E Test ${role} Description`,
              },
            }) as { data?: { levelCreate: LevelPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            level: response.data?.levelCreate?.level as Level | undefined,
            userErrors: response.data?.levelCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.level).toBeTruthy()
      expect(results.admin.level?.name).toBe('E2E Test admin Level Create')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.level).toBeUndefined()

      // Cleanup admin's created level
      if (results.admin.level?.id) {
        await globalThis.prisma.tbl_level.delete({
          where: { id: results.admin.level.id },
        })
      }
    })

    it('Should return validation error for duplicate level name', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
            levelCreate(levelInput: $levelInput) {
              userErrors {
                message
                field
              }
              level {
                id
                name
              }
            }
          }
        `, {
          levelInput: {
            name: mockLevel.name, // Duplicate
            description: 'Duplicate Test',
          },
        }) as { data: { levelCreate: LevelPayload } }

      expect(response.data.levelCreate.userErrors).toHaveLength(1)
      expect(response.data.levelCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.levelCreate.level).toBeNull()
    })

    it('Should return error for null name in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
            levelCreate(levelInput: $levelInput) {
              userErrors {
                message
                field
              }
              level {
                id
                name
              }
            }
          }
        `, {
          levelInput: {
            name: null,
            description: 'Test Description',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      // Create level for testing
      const testLevel = await globalThis.prisma.tbl_level.create({
        data: {
          name: 'E2E Test Update Level',
          description: 'Original Description',
        },
      })

      const results = await testWithBothRoles(
        'update level',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateLevel(
                $levelId: Int!
                $levelInput: LevelInput!
              ) {
                levelUpdate(
                  levelID: $levelId
                  levelInput: $levelInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  level {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              levelId: testLevel.id,
              levelInput: {
                name: 'E2E Test Updated Level',
                description: 'Updated Description',
              },
            }) as { data?: { levelUpdate: LevelPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            level: response.data?.levelUpdate?.level as Level | undefined,
            userErrors: response.data?.levelUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.level).toBeTruthy()
      expect(results.admin.level?.name).toBe('E2E Test Updated Level')
      expect(results.admin.level?.description).toBe('Updated Description')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.level).toBeUndefined()

      // Cleanup
      await globalThis.prisma.tbl_level.delete({
        where: { id: testLevel.id },
      })
    })

    it('Should return error when updating non-existent level', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateLevel(
            $levelId: Int!
            $levelInput: LevelInput!
          ) {
            levelUpdate(
              levelID: $levelId
              levelInput: $levelInput
            ) {
              userErrors {
                message
                field
              }
              level {
                id
                name
              }
            }
          }
        `, {
          levelId: 999999,
          levelInput: {
            name: 'Non-existent Level',
            description: 'Test',
          },
        }) as { data: { levelUpdate: LevelPayload } }

      expect(response.data.levelUpdate.level).toBeNull()
      expect(response.data.levelUpdate.userErrors).toHaveLength(1)
      expect(response.data.levelUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Should return error for null name in update', async () => {
      // Create level for testing
      const testLevel = await globalThis.prisma.tbl_level.create({
        data: {
          name: 'E2E Test Null Update Level',
          description: 'Test',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateLevel(
            $levelId: Int!
            $levelInput: LevelInput!
          ) {
            levelUpdate(
              levelID: $levelId
              levelInput: $levelInput
            ) {
              userErrors {
                message
                field
              }
              level {
                id
                name
              }
            }
          }
        `, {
          levelId: testLevel.id,
          levelInput: {
            name: null,
            description: 'Updated',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()

      // Cleanup
      await globalThis.prisma.tbl_level.delete({
        where: { id: testLevel.id },
      })
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create levels for both roles to attempt deletion
      const adminLevel = await globalThis.prisma.tbl_level.create({
        data: {
          name: 'E2E Test Delete Admin Level',
          description: 'Admin Delete Test',
        },
      })

      const userLevel = await globalThis.prisma.tbl_level.create({
        data: {
          name: 'E2E Test Delete User Level',
          description: 'User Delete Test',
        },
      })

      const results = await testWithBothRoles(
        'delete level',
        async (role) => {
          const levelId = role === 'admin' ? adminLevel.id : userLevel.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteLevel($levelDeleteId: Int!) {
                levelDelete(levelID: $levelDeleteId) {
                  userErrors {
                    message
                    field
                  }
                  level {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              levelDeleteId: levelId,
            }) as { data?: { levelDelete: LevelPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            level: response.data?.levelDelete?.level as Level | undefined,
            userErrors: response.data?.levelDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.level).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.level).toBeTruthy()
      expect(results.admin.level?.name).toBe('E2E Test Delete Admin Level')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's level was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_level.findUnique({
        where: { id: adminLevel.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's level (wasn't deleted)
      await globalThis.prisma.tbl_level.delete({
        where: { id: userLevel.id },
      })
    })

    it('Should return error when deleting non-existent level', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteLevel($levelDeleteId: Int!) {
            levelDelete(levelID: $levelDeleteId) {
              userErrors {
                message
                field
              }
              level {
                id
                name
              }
            }
          }
        `, {
          levelDeleteId: 999999,
        }) as { data: { levelDelete: LevelPayload } }

      expect(response.data.levelDelete.level).toBeNull()
      expect(response.data.levelDelete.userErrors).toHaveLength(1)
      expect(response.data.levelDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for mutations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
            levelCreate(levelInput: $levelInput) {
              userErrors {
                message
                field
              }
              level {
                id
                name
              }
            }
          }
        `, {
          levelInput: {
            name: 'Test',
            description: 'Test',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
