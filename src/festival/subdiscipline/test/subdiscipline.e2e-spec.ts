import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  Subdiscipline,
  SubdisciplinePayload,
} from '../entities/subdiscipline.entity'

describe('Subdiscipline E2E Tests', () => {
  let queryTestSubdisciplineId: number

  // Mock data for testing
  const mockSubdiscipline = {
    name: 'E2E Test Subdiscipline',
    performerType: 'SOLO' as const,
    disciplineID: 1,
    minPerformers: 1,
    maxPerformers: 1,
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_subdiscipline.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })

    // Create a persistent subdiscipline for query tests
    const testSubdiscipline = await globalThis.prisma.tbl_subdiscipline.create({
      data: mockSubdiscipline,
    })
    queryTestSubdisciplineId = testSubdiscipline.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_subdiscipline.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })
  })

  describe('Subdiscipline Queries (Both Roles)', () => {
    it('Should list all subdisciplines for both roles', async () => {
      const results = await testWithBothRoles(
        'list subdisciplines',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines(
                $performerType: PerformerType
                $disciplineId: Int
              ) {
                subdisciplines(
                  performerType: $performerType
                  disciplineID: $disciplineId
                ) {
                  id
                  name
                  performerType
                  minPerformers
                  maxPerformers
                }
              }
            `)
            .variables({
              disciplineId: null,
              performerType: null,
            })
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          const subdisciplines = response.data.subdisciplines
          const firstSubdiscipline = subdisciplines[0]

          return {
            hasData: !!subdisciplines,
            isArray: Array.isArray(subdisciplines),
            count: subdisciplines?.length || 0,
            hasValidTypes: typeof firstSubdiscipline?.id === 'number'
              && typeof firstSubdiscipline?.name === 'string',
          }
        },
      )

      // Both roles should successfully retrieve subdisciplines
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)
    })

    it('Should filter subdisciplines by disciplineID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by disciplineID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines(
                $performerType: PerformerType
                $disciplineId: Int
              ) {
                subdisciplines(
                  performerType: $performerType
                  disciplineID: $disciplineId
                ) {
                  id
                  name
                }
              }
            `)
            .variables({
              disciplineId: 2,
            })
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          return {
            hasData: !!response.data.subdisciplines,
            count: response.data.subdisciplines?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(1)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter subdisciplines by performerType for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by performerType',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines(
                $performerType: PerformerType
                $disciplineId: Int
              ) {
                subdisciplines(
                  performerType: $performerType
                  disciplineID: $disciplineId
                ) {
                  id
                  name
                  performerType
                }
              }
            `)
            .variables({
              performerType: 'GROUP',
            })
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          return {
            hasData: !!response.data.subdisciplines,
            count: response.data.subdisciplines?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter subdisciplines by both performerType and disciplineID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by both parameters',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines(
                $performerType: PerformerType
                $disciplineId: Int
              ) {
                subdisciplines(
                  performerType: $performerType
                  disciplineID: $disciplineId
                ) {
                  id
                  name
                  performerType
                }
              }
            `)
            .variables({
              performerType: 'SOLO',
              disciplineId: 3,
            })
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          return {
            hasData: !!response.data.subdisciplines,
            count: response.data.subdisciplines?.length || 0,
            hasGuitarSubdiscipline: response.data.subdisciplines.some(
              s => s.name.includes('GUITAR')
            ),
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasGuitarSubdiscipline).toBe(true)
      expect(results.user.hasGuitarSubdiscipline).toBe(true)
    })

    it('Should list subdisciplines with associated categories for both roles', async () => {
      const results = await testWithBothRoles(
        'list with categories',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines {
                subdisciplines {
                  id
                  name
                  categories {
                    id
                    name
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          const subdisciplineWithCategories = response.data.subdisciplines.find(
            s => s.categories && s.categories.length > 0
          )

          return {
            hasData: !!response.data.subdisciplines,
            hasCategories: !!subdisciplineWithCategories,
            categoryName: subdisciplineWithCategories?.categories?.[0]?.name,
          }
        },
      )

      // Both roles should get categories
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.hasCategories).toBe(true)
      expect(results.user.hasCategories).toBe(true)
      expect(results.admin.categoryName).toBeTruthy()
      expect(results.user.categoryName).toBe(results.admin.categoryName)
    })

    it('Should list subdisciplines with associated levels for both roles', async () => {
      const results = await testWithBothRoles(
        'list with levels',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines {
                subdisciplines {
                  id
                  name
                  levels {
                    id
                    name
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          const subdisciplineWithLevels = response.data.subdisciplines.find(
            s => s.levels && s.levels.length > 0
          )

          return {
            hasData: !!response.data.subdisciplines,
            hasLevels: !!subdisciplineWithLevels,
            levelName: subdisciplineWithLevels?.levels?.[0]?.name,
          }
        },
      )

      // Both roles should get levels
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.hasLevels).toBe(true)
      expect(results.user.hasLevels).toBe(true)
      expect(results.admin.levelName).toBeTruthy()
      expect(results.user.levelName).toBe(results.admin.levelName)
    })

    it('Should list subdisciplines with associated festivalClasses for both roles', async () => {
      const results = await testWithBothRoles(
        'list with festivalClasses',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines {
                subdisciplines {
                  id
                  name
                  festivalClasses {
                    classNumber
                    description
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          const subdisciplineWithClasses = response.data.subdisciplines.find(
            s => s.festivalClasses && s.festivalClasses.length > 0
          )

          return {
            hasData: !!response.data.subdisciplines,
            hasClasses: !!subdisciplineWithClasses,
            classNumber: subdisciplineWithClasses?.festivalClasses?.[0]?.classNumber,
          }
        },
      )

      // Both roles should get festivalClasses
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.hasClasses).toBe(true)
      expect(results.user.hasClasses).toBe(true)
      expect(results.admin.classNumber).toBeTruthy()
      expect(results.user.classNumber).toBe(results.admin.classNumber)
    })

    it('Should list subdisciplines with associated discipline for both roles', async () => {
      const results = await testWithBothRoles(
        'list with discipline',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdisciplines($disciplineId: Int) {
                subdisciplines(disciplineID: $disciplineId) {
                  id
                  name
                  discipline {
                    id
                    name
                  }
                }
              }
            `)
            .variables({
              disciplineId: 1,
            })
            .expectNoErrors() as { data: { subdisciplines: Subdiscipline[] } }

          return {
            hasData: !!response.data.subdisciplines,
            count: response.data.subdisciplines?.length || 0,
            disciplineName: response.data.subdisciplines[0]?.discipline?.name,
          }
        },
      )

      // Both roles should get discipline
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.disciplineName).toBeTruthy()
      expect(results.user.disciplineName).toBe(results.admin.disciplineName)
    })

    it('Should find specific subdiscipline by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find subdiscipline by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdiscipline($subdisciplineId: Int!) {
                subdiscipline(subdisciplineID: $subdisciplineId) {
                  id
                  name
                  performerType
                  minPerformers
                  maxPerformers
                }
              }
            `)
            .variables({ subdisciplineId: queryTestSubdisciplineId })
            .expectNoErrors() as { data: { subdiscipline: Subdiscipline } }

          return {
            hasData: !!response.data.subdiscipline,
            subdiscipline: response.data.subdiscipline,
          }
        },
      )

      // Both roles should find the subdiscipline
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.subdiscipline.name).toBe(mockSubdiscipline.name)
      expect(results.user.subdiscipline.name).toBe(mockSubdiscipline.name)
      expect(results.admin.subdiscipline.performerType).toBe(mockSubdiscipline.performerType)
      expect(results.user.subdiscipline.performerType).toBe(mockSubdiscipline.performerType)
    })

    it('Should return error when subdiscipline not found for both roles', async () => {
      const results = await testWithBothRoles(
        'subdiscipline not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSubdiscipline($subdisciplineId: Int!) {
                subdiscipline(subdisciplineID: $subdisciplineId) {
                  id
                  name
                }
              }
            `)
            .variables({ subdisciplineId: 999999 }) as { errors?: readonly any[] }

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

  describe('Subdiscipline Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create subdiscipline',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSubdiscipline(
                $subdisciplineInput: SubdisciplineInput!
              ) {
                subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
                  userErrors {
                    message
                    field
                  }
                  subdiscipline {
                    id
                    name
                    performerType
                  }
                }
              }
            `, {
              subdisciplineInput: {
                name: `E2E Test ${role} Subdiscipline Create`,
                performerType: 'SOLO',
                disciplineID: 1,
                minPerformers: 1,
                maxPerformers: 1,
              },
            }) as { data?: { subdisciplineCreate: SubdisciplinePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            subdiscipline: response.data?.subdisciplineCreate?.subdiscipline as Subdiscipline | undefined,
            userErrors: response.data?.subdisciplineCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.subdiscipline).toBeTruthy()
      expect(results.admin.subdiscipline?.name).toBe('E2E Test admin Subdiscipline Create')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.subdiscipline).toBeUndefined()

      // Cleanup admin's created subdiscipline
      if (results.admin.subdiscipline?.id) {
        await globalThis.prisma.tbl_subdiscipline.delete({
          where: { id: results.admin.subdiscipline.id },
        })
      }
    })

    it('Should return validation error for duplicate subdiscipline name', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateSubdiscipline(
            $subdisciplineInput: SubdisciplineInput!
          ) {
            subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
              userErrors {
                message
                field
              }
              subdiscipline {
                id
                name
              }
            }
          }
        `, {
          subdisciplineInput: {
            name: mockSubdiscipline.name, // Duplicate
            performerType: 'GROUP',
            disciplineID: 2,
          },
        }) as { data: { subdisciplineCreate: SubdisciplinePayload } }

      expect(response.data.subdisciplineCreate.userErrors).toHaveLength(1)
      expect(response.data.subdisciplineCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.subdisciplineCreate.subdiscipline).toBeNull()
    })

    it('Should return error for null name in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateSubdiscipline(
            $subdisciplineInput: SubdisciplineInput!
          ) {
            subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
              userErrors {
                message
                field
              }
              subdiscipline {
                id
                name
              }
            }
          }
        `, {
          subdisciplineInput: {
            name: null,
            performerType: 'SOLO',
            disciplineID: 1,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      // Create subdiscipline for testing
      const testSubdiscipline = await globalThis.prisma.tbl_subdiscipline.create({
        data: {
          name: 'E2E Test Update Subdiscipline',
          performerType: 'SOLO',
          disciplineID: 1,
          minPerformers: 1,
          maxPerformers: 1,
        },
      })

      const results = await testWithBothRoles(
        'update subdiscipline',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSubdiscipline(
                $subdisciplineId: Int!
                $subdisciplineInput: SubdisciplineInput!
              ) {
                subdisciplineUpdate(
                  subdisciplineID: $subdisciplineId
                  subdisciplineInput: $subdisciplineInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  subdiscipline {
                    id
                    name
                    performerType
                  }
                }
              }
            `, {
              subdisciplineId: testSubdiscipline.id,
              subdisciplineInput: {
                name: 'E2E Test Updated Subdiscipline',
                performerType: 'GROUP',
                disciplineID: 1,
              },
            }) as { data?: { subdisciplineUpdate: SubdisciplinePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            subdiscipline: response.data?.subdisciplineUpdate?.subdiscipline as Subdiscipline | undefined,
            userErrors: response.data?.subdisciplineUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.subdiscipline).toBeTruthy()
      expect(results.admin.subdiscipline?.name).toBe('E2E Test Updated Subdiscipline')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.subdiscipline).toBeUndefined()

      // Cleanup
      await globalThis.prisma.tbl_subdiscipline.delete({
        where: { id: testSubdiscipline.id },
      })
    })

    it('Should return error when updating non-existent subdiscipline', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateSubdiscipline(
            $subdisciplineId: Int!
            $subdisciplineInput: SubdisciplineInput!
          ) {
            subdisciplineUpdate(
              subdisciplineID: $subdisciplineId
              subdisciplineInput: $subdisciplineInput
            ) {
              userErrors {
                message
                field
              }
              subdiscipline {
                id
                name
              }
            }
          }
        `, {
          subdisciplineId: 999999,
          subdisciplineInput: {
            name: 'Non-existent Subdiscipline',
            performerType: 'SOLO',
            disciplineID: 1,
          },
        }) as { data: { subdisciplineUpdate: SubdisciplinePayload } }

      expect(response.data.subdisciplineUpdate.subdiscipline).toBeNull()
      expect(response.data.subdisciplineUpdate.userErrors).toHaveLength(1)
      expect(response.data.subdisciplineUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Should return error for null name in update', async () => {
      // Create subdiscipline for testing
      const testSubdiscipline = await globalThis.prisma.tbl_subdiscipline.create({
        data: {
          name: 'E2E Test Null Update Subdiscipline',
          performerType: 'SOLO',
          disciplineID: 1,
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateSubdiscipline(
            $subdisciplineId: Int!
            $subdisciplineInput: SubdisciplineInput!
          ) {
            subdisciplineUpdate(
              subdisciplineID: $subdisciplineId
              subdisciplineInput: $subdisciplineInput
            ) {
              userErrors {
                message
                field
              }
              subdiscipline {
                id
                name
              }
            }
          }
        `, {
          subdisciplineId: testSubdiscipline.id,
          subdisciplineInput: {
            name: null,
            performerType: 'SOLO',
            disciplineID: 1,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()

      // Cleanup
      await globalThis.prisma.tbl_subdiscipline.delete({
        where: { id: testSubdiscipline.id },
      })
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create subdisciplines for both roles to attempt deletion
      const adminSubdiscipline = await globalThis.prisma.tbl_subdiscipline.create({
        data: {
          name: 'E2E Test Delete Admin Subdiscipline',
          performerType: 'SOLO',
          disciplineID: 1,
        },
      })

      const userSubdiscipline = await globalThis.prisma.tbl_subdiscipline.create({
        data: {
          name: 'E2E Test Delete User Subdiscipline',
          performerType: 'SOLO',
          disciplineID: 1,
        },
      })

      const results = await testWithBothRoles(
        'delete subdiscipline',
        async (role) => {
          const subdisciplineId = role === 'admin' ? adminSubdiscipline.id : userSubdiscipline.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSubdiscipline($subdisciplineId: Int!) {
                subdisciplineDelete(subdisciplineID: $subdisciplineId) {
                  userErrors {
                    message
                    field
                  }
                  subdiscipline {
                    id
                    name
                  }
                }
              }
            `, {
              subdisciplineId,
            }) as { data?: { subdisciplineDelete: SubdisciplinePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            subdiscipline: response.data?.subdisciplineDelete?.subdiscipline as Subdiscipline | undefined,
            userErrors: response.data?.subdisciplineDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.subdiscipline).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.subdiscipline).toBeTruthy()
      expect(results.admin.subdiscipline?.name).toBe('E2E Test Delete Admin Subdiscipline')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's subdiscipline was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_subdiscipline.findUnique({
        where: { id: adminSubdiscipline.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's subdiscipline (wasn't deleted)
      await globalThis.prisma.tbl_subdiscipline.delete({
        where: { id: userSubdiscipline.id },
      })
    })

    it('Should return error when deleting non-existent subdiscipline', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteSubdiscipline($subdisciplineId: Int!) {
            subdisciplineDelete(subdisciplineID: $subdisciplineId) {
              userErrors {
                message
                field
              }
              subdiscipline {
                id
                name
              }
            }
          }
        `, {
          subdisciplineId: 999999,
        }) as { data: { subdisciplineDelete: SubdisciplinePayload } }

      expect(response.data.subdisciplineDelete.subdiscipline).toBeNull()
      expect(response.data.subdisciplineDelete.userErrors).toHaveLength(1)
      expect(response.data.subdisciplineDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for mutations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .mutate(gql`
          mutation CreateSubdiscipline(
            $subdisciplineInput: SubdisciplineInput!
          ) {
            subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
              userErrors {
                message
                field
              }
              subdiscipline {
                id
                name
              }
            }
          }
        `, {
          subdisciplineInput: {
            name: 'Test',
            performerType: 'SOLO',
            disciplineID: 1,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
