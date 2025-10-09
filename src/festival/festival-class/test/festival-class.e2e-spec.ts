import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  FestivalClass,
  FestivalClassPayload,
} from '../entities/festival-class.entity'

describe('FestivalClass E2E Tests', () => {
  let queryTestFestivalClassId: number

  // Mock data for testing
  const mockFestivalClass = {
    classNumber: 'E2E-001', // Max 15 chars
    categoryID: 23,
    levelID: 40,
    subdisciplineID: 152,
    classTypeID: 1,
    description: 'E2E Test Festival Class',
    maxSelections: 3,
    minSelections: 2,
    performerType: 'SOLO',
    price: 100.0,
    requiredSelection: 'Test Selection',
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_classlist.deleteMany({
      where: { classNumber: { startsWith: 'E2E-' } },
    })

    // Create a persistent festival class for query tests
    const testFestivalClass = await globalThis.prisma.tbl_classlist.create({
      data: mockFestivalClass,
    })
    queryTestFestivalClassId = testFestivalClass.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_classlist.deleteMany({
      where: { classNumber: { startsWith: 'E2E-' } },
    })
  })

  describe('FestivalClass Queries (Both Roles)', () => {
    it('Should list all festival classes for both roles', async () => {
      const results = await testWithBothRoles(
        'list festival classes',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses {
                festivalClasses {
                  id
                  classNumber
                  description
                  maxSelections
                  minSelections
                  performerType
                  price
                  requiredSelection
                }
              }
            `)
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          const festivalClasses = response.data.festivalClasses
          const firstClass = festivalClasses[0]

          return {
            hasData: !!festivalClasses,
            isArray: Array.isArray(festivalClasses),
            count: festivalClasses?.length || 0,
            hasValidTypes: typeof firstClass?.id === 'number'
              && typeof firstClass?.classNumber === 'string'
              && typeof firstClass?.performerType === 'string'
              && typeof firstClass?.price === 'number',
          }
        },
      )

      // Both roles should successfully retrieve festival classes
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)
    })

    it('Should filter festival classes by performerType for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by performerType',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses($performerType: PerformerType) {
                festivalClasses(performerType: $performerType) {
                  id
                  classNumber
                  performerType
                }
              }
            `)
            .variables({ performerType: 'COMMUNITY' })
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          return {
            hasData: !!response.data.festivalClasses,
            count: response.data.festivalClasses?.length || 0,
            allMatchType: response.data.festivalClasses?.every(
              fc => fc.performerType === 'COMMUNITY',
            ),
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.allMatchType).toBe(true)
      expect(results.user.allMatchType).toBe(true)
    })

    it('Should filter festival classes by subdisciplineID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by subdisciplineID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
                festivalClasses(festivalClassSearch: $festivalClassSearch) {
                  id
                  classNumber
                  subdiscipline {
                    id
                    name
                  }
                }
              }
            `)
            .variables({
              festivalClassSearch: { subdisciplineID: 160 },
            })
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          return {
            hasData: !!response.data.festivalClasses,
            count: response.data.festivalClasses?.length || 0,
            hasSubdiscipline: !!response.data.festivalClasses?.[0]?.subdiscipline?.name,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter festival classes by levelID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by levelID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
                festivalClasses(festivalClassSearch: $festivalClassSearch) {
                  id
                  classNumber
                  level {
                    id
                    name
                  }
                }
              }
            `)
            .variables({
              festivalClassSearch: { levelID: 1 },
            })
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          return {
            hasData: !!response.data.festivalClasses,
            count: response.data.festivalClasses?.length || 0,
            hasLevel: !!response.data.festivalClasses?.[0]?.level?.name,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter festival classes by categoryID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by categoryID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
                festivalClasses(festivalClassSearch: $festivalClassSearch) {
                  id
                  classNumber
                  category {
                    id
                    name
                  }
                }
              }
            `)
            .variables({
              festivalClassSearch: { categoryID: 1 },
            })
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          return {
            hasData: !!response.data.festivalClasses,
            count: response.data.festivalClasses?.length || 0,
            hasCategory: !!response.data.festivalClasses?.[0]?.category?.name,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter by multiple criteria for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by multiple criteria',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
                festivalClasses(festivalClassSearch: $festivalClassSearch) {
                  id
                  classNumber
                  category {
                    name
                  }
                  level {
                    name
                  }
                }
              }
            `)
            .variables({
              festivalClassSearch: {
                categoryID: 23,
                levelID: 49,
              },
            })
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          return {
            hasData: !!response.data.festivalClasses,
            count: response.data.festivalClasses?.length || 0,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should return empty array when no matches found for both roles', async () => {
      const results = await testWithBothRoles(
        'return empty array for no matches',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
                festivalClasses(festivalClassSearch: $festivalClassSearch) {
                  id
                  classNumber
                }
              }
            `)
            .variables({
              festivalClassSearch: {
                subdisciplineID: 999999,
              },
            })
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          return {
            count: response.data.festivalClasses?.length || 0,
          }
        },
      )

      // Both roles should get empty results
      expect(results.admin.count).toBe(0)
      expect(results.user.count).toBe(0)
    })

    it('Should return associated trophies in list for both roles', async () => {
      const results = await testWithBothRoles(
        'list with trophies',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClasses {
                festivalClasses {
                  id
                  classNumber
                  trophies {
                    id
                    name
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { festivalClasses: FestivalClass[] } }

          const classWithTrophies = response.data.festivalClasses.find(
            fc => fc.trophies && fc.trophies.length > 0,
          )

          return {
            hasData: !!response.data.festivalClasses,
            hasTrophies: !!classWithTrophies,
            firstTrophyName: classWithTrophies?.trophies?.[0]?.name,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      if (results.admin.hasTrophies) {
        expect(results.user.hasTrophies).toBe(true)
      }
    })

    it('Should find festival class by classNumber for both roles', async () => {
      const results = await testWithBothRoles(
        'find by classNumber',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClassByNumber($festivalClassNumber: String!) {
                festivalClassByNumber(festivalClassNumber: $festivalClassNumber) {
                  id
                  classNumber
                  description
                  performerType
                }
              }
            `)
            .variables({ festivalClassNumber: mockFestivalClass.classNumber })
            .expectNoErrors() as { data: { festivalClassByNumber: FestivalClass } }

          return {
            hasData: !!response.data.festivalClassByNumber,
            festivalClass: response.data.festivalClassByNumber,
          }
        },
      )

      // Both roles should find the festival class
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.festivalClass.classNumber).toBe(mockFestivalClass.classNumber)
      expect(results.user.festivalClass.classNumber).toBe(mockFestivalClass.classNumber)
    })

    it('Should return error when festival class number not found for both roles', async () => {
      const results = await testWithBothRoles(
        'classNumber not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClassByNumber($festivalClassNumber: String!) {
                festivalClassByNumber(festivalClassNumber: $festivalClassNumber) {
                  id
                  classNumber
                }
              }
            `)
            .variables({ festivalClassNumber: 'NONEXISTENT' }) as { errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should find festival class by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClass($festivalClassId: Int!) {
                festivalClass(id: $festivalClassId) {
                  id
                  classNumber
                  description
                }
              }
            `)
            .variables({ festivalClassId: queryTestFestivalClassId })
            .expectNoErrors() as { data: { festivalClass: FestivalClass } }

          return {
            hasData: !!response.data.festivalClass,
            festivalClass: response.data.festivalClass,
          }
        },
      )

      // Both roles should find the festival class
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.festivalClass.classNumber).toBe(mockFestivalClass.classNumber)
      expect(results.user.festivalClass.classNumber).toBe(mockFestivalClass.classNumber)
    })

    it('Should return error when festival class ID not found for both roles', async () => {
      const results = await testWithBothRoles(
        'ID not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetFestivalClass($festivalClassId: Int!) {
                festivalClass(id: $festivalClassId) {
                  id
                  classNumber
                }
              }
            `)
            .variables({ festivalClassId: 999999 }) as { errors?: readonly any[] }

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

  describe('FestivalClass Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create festival class',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
                festivalClassCreate(festivalClassInput: $festivalClassInput) {
                  userErrors {
                    message
                    field
                  }
                  festivalClass {
                    id
                    classNumber
                    description
                    performerType
                    price
                  }
                }
              }
            `, {
              festivalClassInput: {
                classNumber: `E2E-${role === 'admin' ? 'ADM' : 'USR'}-CRT`,
                categoryID: role === 'admin' ? 1 : 2,
                levelID: role === 'admin' ? 1 : 2,
                subdisciplineID: 152,
                classTypeID: 1,
                description: `E2E ${role} create`,
                maxSelections: 3,
                minSelections: 2,
                performerType: 'SOLO',
                price: 110.0,
                requiredSelection: 'Test Selection',
              },
            }) as { data?: { festivalClassCreate: FestivalClassPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            festivalClass: response.data?.festivalClassCreate?.festivalClass as FestivalClass | undefined,
            userErrors: response.data?.festivalClassCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.festivalClass).toBeTruthy()
      expect(results.admin.festivalClass?.classNumber).toBe('E2E-ADM-CRT')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.festivalClass).toBeUndefined()

      // Cleanup admin's created festival class
      if (results.admin.festivalClass?.id) {
        await globalThis.prisma.tbl_classlist.delete({
          where: { id: results.admin.festivalClass.id },
        })
      }
    })

    it('Should return validation error for duplicate classNumber', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
              }
            }
          }
        `, {
          festivalClassInput: {
            classNumber: mockFestivalClass.classNumber, // Duplicate
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 152,
            classTypeID: 1,
            description: 'Attempting duplicate',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 100.0,
          },
        }) as { data: { festivalClassCreate: FestivalClassPayload } }

      expect(response.data.festivalClassCreate.userErrors).toHaveLength(1)
      expect(response.data.festivalClassCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.festivalClassCreate.festivalClass).toBeNull()
    })

    it('Should return validation error for duplicate category/level/subdiscipline combination', async () => {
      // Create first festival class
      const firstClass = await globalThis.prisma.tbl_classlist.create({
        data: {
          classNumber: 'E2E-UNQ-1',
          categoryID: 50,
          levelID: 50,
          subdisciplineID: 160,
          classTypeID: 1,
          description: 'First unique',
          maxSelections: 3,
          minSelections: 2,
          performerType: 'SOLO',
          price: 100.0,
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
              }
            }
          }
        `, {
          festivalClassInput: {
            classNumber: 'E2E-UNQ-2',
            categoryID: 50, // Same combo
            levelID: 50,
            subdisciplineID: 160,
            classTypeID: 1,
            description: 'Duplicate combo',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 100.0,
          },
        }) as { data: { festivalClassCreate: FestivalClassPayload } }

      expect(response.data.festivalClassCreate.userErrors).toHaveLength(1)
      expect(response.data.festivalClassCreate.userErrors[0].message).toContain('already exists')
      expect(response.data.festivalClassCreate.festivalClass).toBeNull()

      // Cleanup
      await globalThis.prisma.tbl_classlist.delete({
        where: { id: firstClass.id },
      })
    })

    it('Should return error for null classNumber in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
              }
            }
          }
        `, {
          festivalClassInput: {
            classNumber: null,
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 152,
            classTypeID: 1,
            description: 'Testing null classNumber',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 100.0,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create festival classes for both roles to attempt deletion
      const adminFestivalClass = await globalThis.prisma.tbl_classlist.create({
        data: {
          classNumber: 'E2E-DEL-ADM',
          categoryID: 1,
          levelID: 3,
          subdisciplineID: 152,
          classTypeID: 1,
          description: 'Admin delete test',
          maxSelections: 3,
          minSelections: 2,
          performerType: 'SOLO',
          price: 100.0,
        },
      })

      const userFestivalClass = await globalThis.prisma.tbl_classlist.create({
        data: {
          classNumber: 'E2E-DEL-USR',
          categoryID: 2,
          levelID: 3,
          subdisciplineID: 152,
          classTypeID: 1,
          description: 'User delete test',
          maxSelections: 3,
          minSelections: 2,
          performerType: 'SOLO',
          price: 100.0,
        },
      })

      const results = await testWithBothRoles(
        'delete festival class',
        async (role) => {
          const festivalClassId = role === 'admin' ? adminFestivalClass.id : userFestivalClass.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteFestivalClass($festivalClassId: Int!) {
                festivalClassDelete(festivalClassID: $festivalClassId) {
                  userErrors {
                    message
                    field
                  }
                  festivalClass {
                    id
                    classNumber
                  }
                }
              }
            `, {
              festivalClassId,
            }) as { data?: { festivalClassDelete: FestivalClassPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            festivalClass: response.data?.festivalClassDelete?.festivalClass as FestivalClass | undefined,
            userErrors: response.data?.festivalClassDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.festivalClass).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.festivalClass).toBeTruthy()
      expect(results.admin.festivalClass?.classNumber).toBe('E2E-DEL-ADM')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's festival class was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_classlist.findUnique({
        where: { id: adminFestivalClass.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's festival class (wasn't deleted)
      await globalThis.prisma.tbl_classlist.delete({
        where: { id: userFestivalClass.id },
      })
    })

    it('Should return error when deleting non-existent festival class', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteFestivalClass($festivalClassId: Int!) {
            festivalClassDelete(festivalClassID: $festivalClassId) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
              }
            }
          }
        `, {
          festivalClassId: 999999,
        }) as { data: { festivalClassDelete: FestivalClassPayload } }

      expect(response.data.festivalClassDelete.festivalClass).toBeNull()
      expect(response.data.festivalClassDelete.userErrors).toHaveLength(1)
      expect(response.data.festivalClassDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetFestivalClasses {
            festivalClasses {
              id
              classNumber
            }
          }
        `) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
