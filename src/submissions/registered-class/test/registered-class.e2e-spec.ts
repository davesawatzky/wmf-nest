import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  RegisteredClass,
  RegisteredClassPayload,
} from '../entities/registered-class.entity'

describe('RegisteredClass E2E Tests', () => {
  let testAdminRegistrationId: number
  let testUserRegistrationId: number
  let testAdminRegisteredClassId: number
  let testUserRegisteredClassId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_reg_class.deleteMany({
      where: { classNumber: { startsWith: 'test_' } },
    })

    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_regclass_' } },
    })

    // Create test registrations for both roles
    const adminReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        performerType: 'SOLO',
        label: 'test_regclass_admin_registration',
        confirmation: 'TEST-ADMIN-REGCLASS',
      },
    })
    testAdminRegistrationId = adminReg.id

    const userReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        performerType: 'GROUP',
        label: 'test_regclass_user_registration',
        confirmation: 'TEST-USER-REGCLASS',
      },
    })
    testUserRegistrationId = userReg.id

    // Create test registered classes for both roles
    const adminClass = await globalThis.prisma.tbl_reg_class.create({
      data: {
        regID: testAdminRegistrationId,
        classType: 'Solo Performance',
        classNumber: 'ta_001',
        discipline: 'Piano',
        subdiscipline: 'Classical',
        level: 'Grade 1',
        category: 'Solo',
        numberOfSelections: 2,
        minSelections: 1,
        maxSelections: 3,
        price: 25.0,
      },
    })
    testAdminRegisteredClassId = adminClass.id

    const userClass = await globalThis.prisma.tbl_reg_class.create({
      data: {
        regID: testUserRegistrationId,
        classType: 'Group Performance',
        classNumber: 'tu_001',
        discipline: 'Voice',
        subdiscipline: 'Choir',
        level: 'Grade 2',
        category: 'Group',
        numberOfSelections: 1,
        minSelections: 1,
        maxSelections: 2,
        price: 30.0,
      },
    })
    testUserRegisteredClassId = userClass.id
  }, 30000)

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_reg_class.deleteMany({
      where: { classNumber: { startsWith: 'test_' } },
    })

    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_regclass_' } },
    })
  })

  describe('RegisteredClass Queries', () => {
    it('Should list all registered classes for admin only', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetRegisteredClasses {
            registeredClasses {
              id
              regID
              classType
              classNumber
              discipline
              subdiscipline
              level
              category
            }
          }
        `)
        .expectNoErrors() as { data: { registeredClasses: RegisteredClass[] } }

      expect(response.data.registeredClasses).toBeTruthy()
      expect(Array.isArray(response.data.registeredClasses)).toBe(true)
      expect(response.data.registeredClasses.length).toBeGreaterThan(0)

      // Verify our test registered classes are included
      const adminClass = response.data.registeredClasses.find(
        (regClass: RegisteredClass) => regClass.id === testAdminRegisteredClassId,
      )
      expect(adminClass).toBeTruthy()
      expect(adminClass?.classNumber).toBe('ta_001')
    })

    it('Should filter registered classes by registration ID; admin gets all, user gets filtered', async () => {
      const results = await testWithBothRoles(
        'filter by registrationID',
        async (role) => {
          const regId = role === 'admin' ? testAdminRegistrationId : testUserRegistrationId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetRegisteredClasses($registrationID: Int) {
                registeredClasses(registrationID: $registrationID) {
                  id
                  regID
                  classNumber
                  discipline
                }
              }
            `)
            .variables({ registrationID: regId })
            .expectNoErrors() as { data: { registeredClasses: RegisteredClass[] } }

          return {
            hasData: !!response.data.registeredClasses,
            count: response.data.registeredClasses?.length || 0,
            // Admin ignores filter and gets all; user gets filtered by registrationID
            containsTestClass: response.data.registeredClasses?.some(
              (regClass: RegisteredClass) => regClass.regID === regId,
            ),
          }
        },
      )

      // Admin gets all confirmed registered classes (ignores filter)
      // The resolver overrides registrationID to null for admin users
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(1)
      expect(results.admin.containsTestClass).toBe(true)

      // User gets filtered by registrationID (their own registrations)
      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBeGreaterThanOrEqual(1)
      expect(results.user.containsTestClass).toBe(true)
    })

    it('Should find specific registered class by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find registered class by ID',
        async (role) => {
          const classId = role === 'admin' ? testAdminRegisteredClassId : testUserRegisteredClassId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetRegisteredClass($registeredClassID: Int!) {
                registeredClass(registeredClassID: $registeredClassID) {
                  id
                  regID
                  classType
                  classNumber
                  discipline
                  subdiscipline
                  level
                  category
                }
              }
            `)
            .variables({ registeredClassID: classId })
            .expectNoErrors() as { data: { registeredClass: RegisteredClass } }

          return {
            hasData: !!response.data.registeredClass,
            registeredClass: response.data.registeredClass,
            correctId: response.data.registeredClass?.id === classId,
          }
        },
      )

      // Both roles should successfully retrieve their registered class
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.correctId).toBe(true)
      expect(results.admin.registeredClass?.classNumber).toBe('ta_001')

      expect(results.user.hasData).toBe(true)
      expect(results.user.correctId).toBe(true)
      expect(results.user.registeredClass?.classNumber).toBe('tu_001')
    })

    it('Should handle not found error for non-existent registered class', async () => {
      const results = await testWithBothRoles(
        'find non-existent registered class',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetRegisteredClass($registeredClassID: Int!) {
                registeredClass(registeredClassID: $registeredClassID) {
                  id
                  classNumber
                }
              }
            `)
            .variables({ registeredClassID: 999999 }) as {
            data?: { registeredClass: RegisteredClass }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get the same not found error
      expect(results.admin.hasErrors).toBe(true)
      expect(results.admin.errorMessage).toContain('not found')
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.errorMessage).toContain('not found')
    })

    it('Should return correct data types for registered class fields', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetRegisteredClasses {
            registeredClasses {
              id
              regID
              numberOfSelections
              minSelections
              maxSelections
              price
            }
          }
        `)
        .expectNoErrors() as { data: { registeredClasses: RegisteredClass[] } }

      const firstClass = response.data.registeredClasses[0]
      expect(typeof firstClass.id).toBe('number')
      expect(typeof firstClass.regID).toBe('number')

      if (firstClass.numberOfSelections !== null) {
        expect(typeof firstClass.numberOfSelections).toBe('number')
      }

      if (firstClass.price !== null) {
        expect(typeof firstClass.price).toBe('string') // GraphQLDecimal comes through as string
      }
    })
  })

  describe('RegisteredClass Create Tests', () => {
    it('Should enforce create authorization: both roles can create', async () => {
      const results = await testWithBothRoles(
        'create registered class',
        async (role) => {
          const regId = role === 'admin' ? testAdminRegistrationId : testUserRegistrationId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegisteredClass(
                $registrationID: Int!
                $registeredClass: RegisteredClassInput
              ) {
                registeredClassCreate(
                  registrationID: $registrationID
                  registeredClass: $registeredClass
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                    regID
                    classType
                    classNumber
                    discipline
                    price
                  }
                }
              }
            `)
            .variables({
              registrationID: regId,
              registeredClass: {
                classType: 'Solo Competition',
                classNumber: `t${role[0]}_c1`,
                discipline: 'Strings',
                subdiscipline: 'Violin',
                level: 'Grade 3',
                category: 'Solo',
                numberOfSelections: 1,
                minSelections: 1,
                maxSelections: 2,
                price: 30.5,
              },
            }) as {
            data?: { registeredClassCreate: RegisteredClassPayload }
            errors?: readonly any[]
          }

          // Clean up created registered class
          if (response.data?.registeredClassCreate?.registeredClass?.id) {
            await globalThis.prisma.tbl_reg_class.delete({
              where: { id: response.data.registeredClassCreate.registeredClass.id },
            })
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            registeredClass: response.data?.registeredClassCreate?.registeredClass as RegisteredClass | undefined,
            userErrors: response.data?.registeredClassCreate?.userErrors || [],
          }
        },
      )

      // Both roles should successfully create registered classes
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.registeredClass).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.registeredClass?.classNumber).toBe('ta_c1')

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.registeredClass).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.registeredClass?.classNumber).toBe('tu_c1')
    })

    it('Should create registered class with minimal data for both roles', async () => {
      const results = await testWithBothRoles(
        'create with minimal data',
        async (role) => {
          const regId = role === 'admin' ? testAdminRegistrationId : testUserRegistrationId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegisteredClass(
                $registrationID: Int!
                $registeredClass: RegisteredClassInput
              ) {
                registeredClassCreate(
                  registrationID: $registrationID
                  registeredClass: $registeredClass
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                    regID
                    price
                  }
                }
              }
            `)
            .variables({
              registrationID: regId,
              registeredClass: {
                price: 25.0,
              },
            }) as { data?: { registeredClassCreate: RegisteredClassPayload } }

          // Clean up
          if (response.data?.registeredClassCreate?.registeredClass?.id) {
            await globalThis.prisma.tbl_reg_class.delete({
              where: { id: response.data.registeredClassCreate.registeredClass.id },
            })
          }

          return {
            registeredClass: response.data?.registeredClassCreate?.registeredClass as RegisteredClass | undefined,
            userErrors: response.data?.registeredClassCreate?.userErrors || [],
            correctRegId: response.data?.registeredClassCreate?.registeredClass?.regID === regId,
          }
        },
      )

      // Both roles should create with minimal data
      expect(results.admin.registeredClass).toBeTruthy()
      expect(results.admin.correctRegId).toBe(true)
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.registeredClass).toBeTruthy()
      expect(results.user.correctRegId).toBe(true)
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should handle validation errors for invalid registration ID', async () => {
      const results = await testWithBothRoles(
        'create with invalid registration ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegisteredClass(
                $registrationID: Int!
                $registeredClass: RegisteredClassInput
              ) {
                registeredClassCreate(
                  registrationID: $registrationID
                  registeredClass: $registeredClass
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                  }
                }
              }
            `)
            .variables({
              registrationID: 999999,
              registeredClass: {
                classNumber: `t${role[0]}_i`,
                price: 25.0,
              },
            }) as { data?: { registeredClassCreate: RegisteredClassPayload } }

          return {
            hasUserErrors: (response.data?.registeredClassCreate?.userErrors?.length || 0) > 0,
            userErrors: response.data?.registeredClassCreate?.userErrors || [],
            registeredClass: response.data?.registeredClassCreate?.registeredClass,
          }
        },
      )

      // Both roles should get validation errors
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.registeredClass).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.registeredClass).toBeNull()
    })
  })

  describe('RegisteredClass Update Tests', () => {
    let updateTestAdminClassId: number
    let updateTestUserClassId: number

    beforeAll(async () => {
      // Create registered classes for update tests
      const adminClass = await globalThis.prisma.tbl_reg_class.create({
        data: {
          regID: testAdminRegistrationId,
          classType: 'Update Test Class',
          classNumber: 'ta_upd',
          discipline: 'Strings',
          subdiscipline: 'Violin',
          level: 'Grade 2',
          category: 'Solo',
          numberOfSelections: 1,
          minSelections: 1,
          maxSelections: 2,
          price: 20.0,
        },
      })
      updateTestAdminClassId = adminClass.id

      const userClass = await globalThis.prisma.tbl_reg_class.create({
        data: {
          regID: testUserRegistrationId,
          classType: 'Update Test Class',
          classNumber: 'tu_upd',
          discipline: 'Woodwinds',
          subdiscipline: 'Flute',
          level: 'Grade 3',
          category: 'Solo',
          numberOfSelections: 2,
          minSelections: 1,
          maxSelections: 3,
          price: 22.5,
        },
      })
      updateTestUserClassId = userClass.id
    })

    afterAll(async () => {
      // Clean up update test registered classes
      const idsToDelete = [updateTestAdminClassId, updateTestUserClassId].filter(
        id => id !== undefined,
      )
      if (idsToDelete.length > 0) {
        await globalThis.prisma.tbl_reg_class.deleteMany({
          where: {
            id: { in: idsToDelete },
          },
        })
      }
    })

    it('Should successfully update registered class for both roles', async () => {
      const results = await testWithBothRoles(
        'update registered class',
        async (role) => {
          const classId = role === 'admin' ? updateTestAdminClassId : updateTestUserClassId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegisteredClass(
                $registeredClassID: Int!
                $registeredClassInput: RegisteredClassInput!
              ) {
                registeredClassUpdate(
                  registeredClassID: $registeredClassID
                  registeredClassInput: $registeredClassInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                    classType
                    classNumber
                    discipline
                    subdiscipline
                    numberOfSelections
                    price
                  }
                }
              }
            `)
            .variables({
              registeredClassID: classId,
              registeredClassInput: {
                classType: 'Updated Solo Class',
                classNumber: `t${role[0]}_up`,
                discipline: 'Brass',
                subdiscipline: 'Trumpet',
                numberOfSelections: 3,
                price: 35.75,
              },
            }) as {
            data?: { registeredClassUpdate: RegisteredClassPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            registeredClass: response.data?.registeredClassUpdate?.registeredClass as RegisteredClass | undefined,
            userErrors: response.data?.registeredClassUpdate?.userErrors || [],
            hasCorrectUpdates:
              response.data?.registeredClassUpdate?.registeredClass?.classType === 'Updated Solo Class'
              && response.data?.registeredClassUpdate?.registeredClass?.discipline === 'Brass',
          }
        },
      )

      // Both roles should successfully update
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.registeredClass).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.hasCorrectUpdates).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.registeredClass).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.hasCorrectUpdates).toBe(true)
    })

    it('Should handle update with invalid registered class ID', async () => {
      const results = await testWithBothRoles(
        'update non-existent registered class',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegisteredClass(
                $registeredClassID: Int!
                $registeredClassInput: RegisteredClassInput!
              ) {
                registeredClassUpdate(
                  registeredClassID: $registeredClassID
                  registeredClassInput: $registeredClassInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                  }
                }
              }
            `)
            .variables({
              registeredClassID: 999999,
              registeredClassInput: {
                classType: 'Non-existent Class',
                price: 25.0,
              },
            }) as { data?: { registeredClassUpdate: RegisteredClassPayload } }

          return {
            hasUserErrors: (response.data?.registeredClassUpdate?.userErrors?.length || 0) > 0,
            userErrors: response.data?.registeredClassUpdate?.userErrors || [],
            registeredClass: response.data?.registeredClassUpdate?.registeredClass,
          }
        },
      )

      // Both roles should get user errors
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.registeredClass).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.registeredClass).toBeNull()
    })

    it('Should handle update with null ID error', async () => {
      const results = await testWithBothRoles(
        'update with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegisteredClass(
                $registeredClassID: Int!
                $registeredClassInput: RegisteredClassInput!
              ) {
                registeredClassUpdate(
                  registeredClassID: $registeredClassID
                  registeredClassInput: $registeredClassInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                  }
                }
              }
            `)
            .variables({
              registeredClassID: null,
              registeredClassInput: { price: 25.0 },
            }) as {
            data?: { registeredClassUpdate: RegisteredClassPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('RegisteredClass Delete Tests', () => {
    it('Should enforce delete authorization: both roles can delete', async () => {
      const results = await testWithBothRoles(
        'delete registered class',
        async (role) => {
          const regId = role === 'admin' ? testAdminRegistrationId : testUserRegistrationId

          // Create a registered class to delete
          const testClass = await globalThis.prisma.tbl_reg_class.create({
            data: {
              regID: regId,
              classType: 'Delete Test Class',
              classNumber: `t${role[0]}_d`,
              discipline: 'Percussion',
              subdiscipline: 'Drums',
              level: 'Beginner',
              category: 'Solo',
              price: 15.0,
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteRegisteredClass($registeredClassID: Int!) {
                registeredClassDelete(registeredClassID: $registeredClassID) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                    classNumber
                    discipline
                  }
                }
              }
            `)
            .variables({ registeredClassID: testClass.id }) as {
            data?: { registeredClassDelete: RegisteredClassPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            registeredClass: response.data?.registeredClassDelete?.registeredClass as RegisteredClass | undefined,
            userErrors: response.data?.registeredClassDelete?.userErrors || [],
          }
        },
      )

      // Both roles should successfully delete
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.registeredClass).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.registeredClass).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should handle delete of non-existent registered class', async () => {
      const results = await testWithBothRoles(
        'delete non-existent registered class',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteRegisteredClass($registeredClassID: Int!) {
                registeredClassDelete(registeredClassID: $registeredClassID) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                  }
                }
              }
            `)
            .variables({ registeredClassID: 999999 }) as {
            data?: { registeredClassDelete: RegisteredClassPayload }
          }

          return {
            hasUserErrors: (response.data?.registeredClassDelete?.userErrors?.length || 0) > 0,
            userErrors: response.data?.registeredClassDelete?.userErrors || [],
            registeredClass: response.data?.registeredClassDelete?.registeredClass,
          }
        },
      )

      // Both roles should get user errors
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.registeredClass).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.registeredClass).toBeNull()
    })

    it('Should handle delete with null ID error', async () => {
      const results = await testWithBothRoles(
        'delete with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteRegisteredClass($registeredClassID: Int!) {
                registeredClassDelete(registeredClassID: $registeredClassID) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                  }
                }
              }
            `)
            .variables({ registeredClassID: null }) as {
            data?: { registeredClassDelete: RegisteredClassPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get GraphQL validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Field Resolvers', () => {
    it('Should resolve selections field for registered class', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetRegisteredClassWithSelections($registeredClassID: Int!) {
            registeredClass(registeredClassID: $registeredClassID) {
              id
              classNumber
              selections {
                id
                title
                composer
              }
            }
          }
        `)
        .variables({ registeredClassID: testAdminRegisteredClassId })
        .expectNoErrors() as { data: { registeredClass: RegisteredClass } }

      expect(response.data.registeredClass).toBeTruthy()
      expect(response.data.registeredClass.selections).toBeDefined()
      expect(Array.isArray(response.data.registeredClass.selections)).toBe(true)
    })

    it('Should resolve performers field for registered class', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetRegisteredClassWithPerformers($registeredClassID: Int!) {
            registeredClass(registeredClassID: $registeredClassID) {
              id
              classNumber
              performers {
                id
                firstName
                lastName
              }
            }
          }
        `)
        .variables({ registeredClassID: testAdminRegisteredClassId })
        .expectNoErrors() as { data: { registeredClass: RegisteredClass } }

      expect(response.data.registeredClass).toBeTruthy()
      expect(response.data.registeredClass.performers).toBeDefined()
      expect(Array.isArray(response.data.registeredClass.performers)).toBe(true)
    })
  })

  describe('Data Validation and Business Logic', () => {
    it('Should validate price format with decimal precision', async () => {
      const results = await testWithBothRoles(
        'validate price precision',
        async (role) => {
          const regId = role === 'admin' ? testAdminRegistrationId : testUserRegistrationId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegisteredClass(
                $registrationID: Int!
                $registeredClass: RegisteredClassInput
              ) {
                registeredClassCreate(
                  registrationID: $registrationID
                  registeredClass: $registeredClass
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                    price
                  }
                }
              }
            `)
            .variables({
              registrationID: regId,
              registeredClass: {
                price: 29.99,
              },
            }) as { data?: { registeredClassCreate: RegisteredClassPayload } }

          // Clean up
          if (response.data?.registeredClassCreate?.registeredClass?.id) {
            await globalThis.prisma.tbl_reg_class.delete({
              where: { id: response.data.registeredClassCreate.registeredClass.id },
            })
          }

          return {
            userErrors: response.data?.registeredClassCreate?.userErrors || [],
            price: response.data?.registeredClassCreate?.registeredClass?.price,
          }
        },
      )

      // Both roles should create with correct price
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.price).toBe('29.99')
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.price).toBe('29.99')
    })

    it('Should validate selection count constraints', async () => {
      const results = await testWithBothRoles(
        'validate selection constraints',
        async (role) => {
          const regId = role === 'admin' ? testAdminRegistrationId : testUserRegistrationId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegisteredClass(
                $registrationID: Int!
                $registeredClass: RegisteredClassInput
              ) {
                registeredClassCreate(
                  registrationID: $registrationID
                  registeredClass: $registeredClass
                ) {
                  userErrors {
                    message
                    field
                  }
                  registeredClass {
                    id
                    numberOfSelections
                    minSelections
                    maxSelections
                  }
                }
              }
            `)
            .variables({
              registrationID: regId,
              registeredClass: {
                numberOfSelections: 2,
                minSelections: 1,
                maxSelections: 3,
                price: 25.0,
              },
            }) as { data?: { registeredClassCreate: RegisteredClassPayload } }

          // Clean up
          if (response.data?.registeredClassCreate?.registeredClass?.id) {
            await globalThis.prisma.tbl_reg_class.delete({
              where: { id: response.data.registeredClassCreate.registeredClass.id },
            })
          }

          return {
            userErrors: response.data?.registeredClassCreate?.userErrors || [],
            registeredClass: response.data?.registeredClassCreate?.registeredClass,
          }
        },
      )

      // Both roles should create with correct selection counts
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.registeredClass?.numberOfSelections).toBe(2)
      expect(results.admin.registeredClass?.minSelections).toBe(1)
      expect(results.admin.registeredClass?.maxSelections).toBe(3)

      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.registeredClass?.numberOfSelections).toBe(2)
      expect(results.user.registeredClass?.minSelections).toBe(1)
      expect(results.user.registeredClass?.maxSelections).toBe(3)
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetRegisteredClasses {
            registeredClasses {
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
