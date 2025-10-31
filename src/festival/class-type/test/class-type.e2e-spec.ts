import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import { ClassType, ClassTypePayload } from '../entities/class-type.entity'

describe('ClassType E2E Tests', () => {
  let testClassTypeId: number
  let queryTestClassTypeId: number

  // Mock data for testing
  const mockClassType = {
    name: 'E2E Test ClassType',
    description: 'ClassType created for E2E testing',
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_class_type.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })

    // Create a persistent classType for query tests
    const testClassType = await globalThis.prisma.tbl_class_type.create({
      data: mockClassType,
    })
    queryTestClassTypeId = testClassType.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_class_type.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })
  })

  describe('ClassType Queries (Both Roles)', () => {
    it('Should list all classTypes for both roles', async () => {
      const results = await testWithBothRoles(
        'list classTypes',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetClassTypes {
                classTypes {
                  id
                  name
                  description
                }
              }
            `)
            .expectNoErrors() as { data: { classTypes: ClassType[] } }

          const classTypes = response.data.classTypes
          const firstClassType = classTypes[0]

          return {
            hasData: !!classTypes,
            isArray: Array.isArray(classTypes),
            count: classTypes?.length || 0,
            hasValidTypes: typeof firstClassType?.id === 'number'
              && typeof firstClassType?.name === 'string',
          }
        },
      )

      // Both roles should successfully retrieve classTypes
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)
    })

    it('Should list classTypes with associated festival classes for both roles', async () => {
      const results = await testWithBothRoles(
        'list classTypes with festivalClasses',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetClassTypes {
                classTypes {
                  id
                  name
                  description
                  festivalClasses {
                    classNumber
                    id
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { classTypes: ClassType[] } }

          const classTypes = response.data.classTypes
          const classTypeWithClasses = classTypes.find(ct => ct.festivalClasses && ct.festivalClasses.length > 0)

          return {
            hasData: !!classTypes,
            count: classTypes?.length || 0,
            hasRelations: !!classTypeWithClasses,
            firstClassNumber: classTypeWithClasses?.festivalClasses?.[0]?.classNumber,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)

      // Check that at least one classType has festival classes
      if (results.admin.hasRelations) {
        expect(results.user.hasRelations).toBe(true)
        expect(results.admin.firstClassNumber).toBeTruthy()
        expect(results.user.firstClassNumber).toBe(results.admin.firstClassNumber)
      }
    })

    it('Should find specific classType by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find classType by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetClassType($classTypeId: Int!) {
                classType(id: $classTypeId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({ classTypeId: queryTestClassTypeId })
            .expectNoErrors() as { data: { classType: ClassType } }

          return {
            hasData: !!response.data.classType,
            classType: response.data.classType,
          }
        },
      )

      // Both roles should find the classType
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.classType.name).toBe(mockClassType.name)
      expect(results.user.classType.name).toBe(mockClassType.name)
    })

    it('Should return error when classType not found for both roles', async () => {
      const results = await testWithBothRoles(
        'classType not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetClassType($classTypeId: Int!) {
                classType(id: $classTypeId) {
                  id
                  name
                  description
                }
              }
            `)
            .variables({ classTypeId: 999999 }) as { errors?: readonly any[] }

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

  describe('ClassType Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create classType',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateClassType($classTypeInput: ClassTypeInput!) {
                classTypeCreate(classTypeInput: $classTypeInput) {
                  userErrors {
                    message
                    field
                  }
                  classType {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              classTypeInput: {
                name: `E2E Test ${role} ClassType Create`,
                description: 'Test classType creation',
              },
            }) as { data?: { classTypeCreate: ClassTypePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            classType: response.data?.classTypeCreate?.classType as ClassType | undefined,
            userErrors: response.data?.classTypeCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.classType).toBeTruthy()
      expect(results.admin.classType?.name).toBe('E2E Test admin ClassType Create')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.classType).toBeUndefined()

      // Cleanup admin's created classType
      if (results.admin.classType?.id) {
        await globalThis.prisma.tbl_class_type.delete({
          where: { id: results.admin.classType.id },
        })
      }
    })

    it('Should return validation error for duplicate classType name', async () => {
      // Create initial classType
      const initialClassType = await globalThis.prisma.tbl_class_type.create({
        data: {
          name: 'E2E Test Duplicate',
          description: 'Test duplicate validation',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateClassType($classTypeInput: ClassTypeInput!) {
            classTypeCreate(classTypeInput: $classTypeInput) {
              userErrors {
                message
                field
              }
              classType {
                id
                name
              }
            }
          }
        `, {
          classTypeInput: {
            name: 'E2E Test Duplicate',
            description: 'Attempting duplicate',
          },
        }) as { data: { classTypeCreate: ClassTypePayload } }

      expect(response.data.classTypeCreate.userErrors).toHaveLength(1)
      expect(response.data.classTypeCreate.userErrors[0].message).toContain('already exists')
      expect(response.data.classTypeCreate.classType).toBeNull()

      // Cleanup
      await globalThis.prisma.tbl_class_type.delete({
        where: { id: initialClassType.id },
      })
    })

    it('Should return error for null name in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateClassType($classTypeInput: ClassTypeInput!) {
            classTypeCreate(classTypeInput: $classTypeInput) {
              userErrors {
                message
                field
              }
              classType {
                id
                name
              }
            }
          }
        `, {
          classTypeInput: {
            name: null,
            description: 'Testing null name',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toBeTruthy()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      // Create classType for testing
      const testClassType = await globalThis.prisma.tbl_class_type.create({
        data: {
          name: 'E2E Test Update ClassType',
          description: 'Original description',
        },
      })

      const results = await testWithBothRoles(
        'update classType',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateClassType($classTypeId: Int!, $classTypeInput: ClassTypeInput!) {
                classTypeUpdate(classTypeID: $classTypeId, classTypeInput: $classTypeInput) {
                  userErrors {
                    message
                    field
                  }
                  classType {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              classTypeId: testClassType.id,
              classTypeInput: {
                name: 'E2E Test Updated ClassType',
                description: `Updated by ${role}`,
              },
            }) as { data?: { classTypeUpdate: ClassTypePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            classType: response.data?.classTypeUpdate?.classType as ClassType | undefined,
            userErrors: response.data?.classTypeUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.classType).toBeTruthy()
      expect(results.admin.classType?.name).toBe('E2E Test Updated ClassType')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.classType).toBeUndefined()

      // Cleanup
      await globalThis.prisma.tbl_class_type.delete({
        where: { id: testClassType.id },
      })
    })

    it('Should return error when updating non-existent classType', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateClassType($classTypeId: Int!, $classTypeInput: ClassTypeInput!) {
            classTypeUpdate(classTypeID: $classTypeId, classTypeInput: $classTypeInput) {
              userErrors {
                message
                field
              }
              classType {
                id
                name
              }
            }
          }
        `, {
          classTypeId: 999999,
          classTypeInput: {
            name: 'Non-existent ClassType',
          },
        }) as { data: { classTypeUpdate: ClassTypePayload } }

      expect(response.data.classTypeUpdate.classType).toBeNull()
      expect(response.data.classTypeUpdate.userErrors).toHaveLength(1)
      expect(response.data.classTypeUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Should return error for null name in update', async () => {
      // Create classType for testing
      const testClassType = await globalThis.prisma.tbl_class_type.create({
        data: {
          name: 'E2E Test Null Update',
          description: 'Testing null update',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateClassType($classTypeId: Int!, $classTypeInput: ClassTypeInput!) {
            classTypeUpdate(classTypeID: $classTypeId, classTypeInput: $classTypeInput) {
              userErrors {
                message
                field
              }
              classType {
                id
                name
              }
            }
          }
        `, {
          classTypeId: testClassType.id,
          classTypeInput: {
            name: null,
            description: 'Trying null name',
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()

      // Cleanup
      await globalThis.prisma.tbl_class_type.delete({
        where: { id: testClassType.id },
      })
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create classTypes for both roles to attempt deletion
      const adminClassType = await globalThis.prisma.tbl_class_type.create({
        data: {
          name: 'E2E Test Delete Admin',
          description: 'For admin deletion test',
        },
      })

      const userClassType = await globalThis.prisma.tbl_class_type.create({
        data: {
          name: 'E2E Test Delete User',
          description: 'For user deletion test',
        },
      })

      const results = await testWithBothRoles(
        'delete classType',
        async (role) => {
          const classTypeId = role === 'admin' ? adminClassType.id : userClassType.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteClassType($classTypeId: Int!) {
                classTypeDelete(classTypeID: $classTypeId) {
                  userErrors {
                    message
                    field
                  }
                  classType {
                    id
                    name
                    description
                  }
                }
              }
            `, {
              classTypeId,
            }) as { data?: { classTypeDelete: ClassTypePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            classType: response.data?.classTypeDelete?.classType as ClassType | undefined,
            userErrors: response.data?.classTypeDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.classType).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.classType).toBeTruthy()
      expect(results.admin.classType?.name).toBe('E2E Test Delete Admin')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's classType was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_class_type.findUnique({
        where: { id: adminClassType.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's classType (wasn't deleted)
      await globalThis.prisma.tbl_class_type.delete({
        where: { id: userClassType.id },
      })
    })

    it('Should return error when deleting non-existent classType', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteClassType($classTypeId: Int!) {
            classTypeDelete(classTypeID: $classTypeId) {
              userErrors {
                message
                field
              }
              classType {
                id
                name
              }
            }
          }
        `, {
          classTypeId: 999999,
        }) as { data: { classTypeDelete: ClassTypePayload } }

      expect(response.data.classTypeDelete.classType).toBeNull()
      expect(response.data.classTypeDelete.userErrors).toHaveLength(1)
      expect(response.data.classTypeDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetClassTypes {
            classTypes {
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
