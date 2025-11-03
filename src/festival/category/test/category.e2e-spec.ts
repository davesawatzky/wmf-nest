import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import { Category, CategoryPayload } from '../entities/category.entity'

describe('Category E2E Tests', () => {
  let queryTestCategoryId: number

  // Mock data for testing
  const mockCategory = {
    name: 'E2E Test Category',
    description: 'Category created for E2E testing',
    requiredComposer: 'Test Composer',
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_category.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })

    // Create a persistent category for query tests
    const testCategory = await globalThis.prisma.tbl_category.create({
      data: mockCategory,
    })
    queryTestCategoryId = testCategory.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_category.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })
  })

  describe('Category Queries (Both Roles)', () => {
    it('Should list all categories without level or subdiscipline', async () => {
      const results = await testWithBothRoles(
        'list categories',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCategories {
                categories {
                  id
                  name
                  description
                  requiredComposer
                }
              }
            `)

          return {
            hasData: !response.errors,
          }
        },
      )
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
    })

    it('Should filter categories by subdisciplineID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by subdiscipline',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCategories($levelId: Int, $subdisciplineId: Int) {
                categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                  requiredComposer
                }
              }
            `)
            .variables({ subdisciplineId: 194 })
            .expectNoErrors() as { data: { categories: Category[] } }

          return {
            hasData: !!response.data.categories,
            count: response.data.categories?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter categories by levelID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by level',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCategories($levelId: Int, $subdisciplineId: Int) {
                categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                  requiredComposer
                }
              }
            `)
            .variables({ levelId: 49 })
            .expectNoErrors() as { data: { categories: Category[] } }

          return {
            hasData: !!response.data.categories,
            count: response.data.categories?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter categories by both levelID and subdisciplineID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by level and subdiscipline',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCategories($levelId: Int, $subdisciplineId: Int) {
                categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                  requiredComposer
                }
              }
            `)
            .variables({ levelId: 49, subdisciplineId: 194 })
            .expectNoErrors() as { data: { categories: Category[] } }

          return {
            hasData: !!response.data.categories,
            count: response.data.categories?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should return empty array when no categories match filter for both roles', async () => {
      const results = await testWithBothRoles(
        'no matching categories',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCategories($levelId: Int, $subdisciplineId: Int) {
                categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
                  id
                  name
                  description
                  requiredComposer
                }
              }
            `)
            .variables({ levelId: 100, subdisciplineId: 194 })
            .expectNoErrors() as { data: { categories: Category[] } }

          return {
            count: response.data.categories?.length || 0,
          }
        },
      )

      // Both roles should get empty results
      expect(results.admin.count).toBe(0)
      expect(results.user.count).toBe(0)
    })

    it('Should find specific category by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find category by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCategory($categoryId: Int!) {
                category(id: $categoryId) {
                  id
                  name
                  description
                  requiredComposer
                }
              }
            `)
            .variables({ categoryId: queryTestCategoryId })
            .expectNoErrors() as { data: { category: Category } }

          return {
            hasData: !!response.data.category,
            category: response.data.category,
          }
        },
      )

      // Both roles should find the category
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.category.name).toBe(mockCategory.name)
      expect(results.user.category.name).toBe(mockCategory.name)
    })

    it('Should return error when category not found for both roles', async () => {
      const results = await testWithBothRoles(
        'category not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetCategory($categoryId: Int!) {
                category(id: $categoryId) {
                  id
                  name
                  description
                  requiredComposer
                }
              }
            `)
            .variables({ categoryId: 999999 }) as { errors?: readonly any[] }

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

  describe('Category Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create category',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateCategory($categoryInput: CategoryInput!) {
                categoryCreate(categoryInput: $categoryInput) {
                  userErrors {
                    message
                    field
                  }
                  category {
                    id
                    name
                    description
                    requiredComposer
                  }
                }
              }
            `, {
              categoryInput: {
                name: `E2E Test ${role} Category Create`,
                description: 'Test category creation',
                requiredComposer: 'Test Composer',
              },
            }) as { data?: { categoryCreate: CategoryPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            category: response.data?.categoryCreate?.category as Category | undefined,
            userErrors: response.data?.categoryCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.category).toBeTruthy()
      expect(results.admin.category?.name).toBe('E2E Test admin Category Create')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.category).toBeUndefined()

      // Cleanup admin's created category
      if (results.admin.category?.id) {
        await globalThis.prisma.tbl_category.delete({
          where: { id: results.admin.category.id },
        })
      }
    })

    it('Should return validation error for duplicate category name', async () => {
      // Create initial category
      const initialCategory = await globalThis.prisma.tbl_category.create({
        data: {
          name: 'E2E Test Duplicate',
          description: 'Test duplicate validation',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateCategory($categoryInput: CategoryInput!) {
            categoryCreate(categoryInput: $categoryInput) {
              userErrors {
                message
                field
              }
              category {
                id
                name
              }
            }
          }
        `, {
          categoryInput: {
            name: 'E2E Test Duplicate',
            description: 'Attempting duplicate',
          },
        }) as { data: { categoryCreate: CategoryPayload } }

      expect(response.data.categoryCreate.userErrors).toHaveLength(1)
      expect(response.data.categoryCreate.userErrors[0].message).toContain('already exists')
      expect(response.data.categoryCreate.category).toBeNull()

      // Cleanup
      await globalThis.prisma.tbl_category.delete({
        where: { id: initialCategory.id },
      })
    })

    it('Should return error for null name in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateCategory($categoryInput: CategoryInput!) {
            categoryCreate(categoryInput: $categoryInput) {
              userErrors {
                message
                field
              }
              category {
                id
                name
              }
            }
          }
        `, {
          categoryInput: {
            name: null,
            description: 'Testing null name',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toBeTruthy()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      // Create category for testing
      const testCategory = await globalThis.prisma.tbl_category.create({
        data: {
          name: 'E2E Test Update Category',
          description: 'Original description',
        },
      })

      const results = await testWithBothRoles(
        'update category',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateCategory($categoryId: Int!, $categoryInput: CategoryInput!) {
                categoryUpdate(categoryID: $categoryId, categoryInput: $categoryInput) {
                  userErrors {
                    message
                    field
                  }
                  category {
                    id
                    name
                    description
                    requiredComposer
                  }
                }
              }
            `, {
              categoryId: testCategory.id,
              categoryInput: {
                name: 'E2E Test Update Category',
                description: `Updated by ${role}`,
                requiredComposer: 'Updated Composer',
              },
            }) as { data?: { categoryUpdate: CategoryPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            category: response.data?.categoryUpdate?.category as Category | undefined,
            userErrors: response.data?.categoryUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.category).toBeTruthy()
      expect(results.admin.category?.requiredComposer).toBe('Updated Composer')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.category).toBeUndefined()

      // Cleanup
      await globalThis.prisma.tbl_category.delete({
        where: { id: testCategory.id },
      })
    })

    it('Should return error when updating non-existent category', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateCategory($categoryId: Int!, $categoryInput: CategoryInput!) {
            categoryUpdate(categoryID: $categoryId, categoryInput: $categoryInput) {
              userErrors {
                message
                field
              }
              category {
                id
                name
              }
            }
          }
        `, {
          categoryId: 999999,
          categoryInput: {
            name: 'Non-existent Category',
          },
        }) as { data: { categoryUpdate: CategoryPayload } }

      expect(response.data.categoryUpdate.category).toBeNull()
      expect(response.data.categoryUpdate.userErrors).toHaveLength(1)
      expect(response.data.categoryUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Should return error for null name in update', async () => {
      // Create category for testing
      const testCategory = await globalThis.prisma.tbl_category.create({
        data: {
          name: 'E2E Test Null Update',
          description: 'Testing null update',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateCategory($categoryId: Int!, $categoryInput: CategoryInput!) {
            categoryUpdate(categoryID: $categoryId, categoryInput: $categoryInput) {
              userErrors {
                message
                field
              }
              category {
                id
                name
              }
            }
          }
        `, {
          categoryId: testCategory.id,
          categoryInput: {
            name: null,
            description: 'Trying null name',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()

      // Cleanup
      await globalThis.prisma.tbl_category.delete({
        where: { id: testCategory.id },
      })
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create categories for both roles to attempt deletion
      const adminCategory = await globalThis.prisma.tbl_category.create({
        data: {
          name: 'E2E Test Delete Admin',
          description: 'For admin deletion test',
        },
      })

      const userCategory = await globalThis.prisma.tbl_category.create({
        data: {
          name: 'E2E Test Delete User',
          description: 'For user deletion test',
        },
      })

      const results = await testWithBothRoles(
        'delete category',
        async (role) => {
          const categoryId = role === 'admin' ? adminCategory.id : userCategory.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteCategory($categoryId: Int!) {
                categoryDelete(categoryID: $categoryId) {
                  userErrors {
                    message
                    field
                  }
                  category {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              categoryId,
            }) as { data?: { categoryDelete: CategoryPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            category: response.data?.categoryDelete?.category as Category | undefined,
            userErrors: response.data?.categoryDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.category).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.category).toBeTruthy()
      expect(results.admin.category?.name).toBe('E2E Test Delete Admin')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's category was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_category.findUnique({
        where: { id: adminCategory.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's category (wasn't deleted)
      await globalThis.prisma.tbl_category.delete({
        where: { id: userCategory.id },
      })
    })

    it('Should return error when deleting non-existent category', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteCategory($categoryId: Int!) {
            categoryDelete(categoryID: $categoryId) {
              userErrors {
                message
                field
              }
              category {
                id
                name
              }
            }
          }
        `, {
          categoryId: 999999,
        }) as { data: { categoryDelete: CategoryPayload } }

      expect(response.data.categoryDelete.category).toBeNull()
      expect(response.data.categoryDelete.userErrors).toHaveLength(1)
      expect(response.data.categoryDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetCategories {
            categories {
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
