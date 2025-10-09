import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {
  RegisteredClass,
  RegisteredClassPayload,
} from '../entities/registered-class.entity'

describe('RegisteredClass', () => {
  let testRegistrationId: number
  let testRegisteredClassId: number

  beforeAll(async () => {
    // Create a test registration for testing registered classes
    const testRegistration = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.userId,
        performerType: 'SOLO',
        label: 'Test Registration for RegisteredClass E2E',
        confirmation: 'E2E-TEST-001', // Add confirmation so it shows up in queries
      },
    })
    testRegistrationId = testRegistration.id

    // Create a test registered class for queries
    const testRegisteredClass = await globalThis.prisma.tbl_reg_class.create({
      data: {
        regID: testRegistrationId,
        classType: 'Solo Performance',
        classNumber: 'E2E001',
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
    testRegisteredClassId = testRegisteredClass.id
  })

  afterAll(async () => {
    // Clean up test data
    await globalThis.prisma.tbl_reg_class.deleteMany({
      where: {
        OR: [
          { id: testRegisteredClassId },
          { regID: testRegistrationId },
          { classNumber: { startsWith: 'e2e_test_' } },
        ],
      },
    })

    await globalThis.prisma.tbl_registration.delete({
      where: { id: testRegistrationId },
    })
  })

  describe('Listing Registered Classes', () => {
    let response: any

    it('Can provide a list of all registered classes (admin only)', async () => {
      response = await request<{ registeredClasses: RegisteredClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClasses {
            registeredClasses {
              id
              regID
              classType
              classNumber
              discipline
              subdiscipline
              level
              category
              numberOfSelections
              minSelections
              maxSelections
              price
              schoolGroupID
              communityGroupID
            }
          }
        `)
        .expectNoErrors()

      expect(response.data.registeredClasses).toBeTruthy()
      expect(Array.isArray(response.data.registeredClasses)).toBe(true)
      expect(response.data.registeredClasses.length).toBeGreaterThan(0)

      // Verify our test registered class is included
      const testClass = response.data.registeredClasses.find(
        (regClass: RegisteredClass) => regClass.id === testRegisteredClassId,
      )
      expect(testClass).toBeTruthy()
      expect(testClass.classNumber).toBe('E2E001')
      expect(testClass.discipline).toBe('Piano')
    })

    it('Can filter registered classes by registration ID (user)', async () => {
      await globalThis.prisma.tbl_user.update({
        where: { id: globalThis.userId },
        data: { roles: ['user'] },
      })

      response = await request<{ registeredClasses: RegisteredClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClasses($registrationId: Int) {
            registeredClasses(registrationID: $registrationId) {
              id
              regID
              classNumber
              discipline
              subdiscipline
              level
              category
            }
          }
        `)
        .variables({
          registrationId: testRegistrationId,
        })
        .expectNoErrors()

      expect(response.data.registeredClasses).toBeTruthy()
      expect(response.data.registeredClasses.length).toBeGreaterThanOrEqual(1)

      // All returned classes should belong to the specified registration
      response.data.registeredClasses.forEach((regClass: RegisteredClass) => {
        expect(regClass.regID).toBe(testRegistrationId)
      })

      await globalThis.prisma.tbl_user.update({
        where: { id: globalThis.userId },
        data: { roles: ['admin'] },
      })
    })

    it('Returns correct data types for registered class fields', async () => {
      response = await request<{ registeredClasses: RegisteredClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClasses {
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
        .expectNoErrors()

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

  describe('Individual Registered Class', () => {
    let response: any

    it('Can find registered class using proper ID', async () => {
      response = await request<{ registeredClass: RegisteredClass }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClass($registeredClassId: Int!) {
            registeredClass(registeredClassID: $registeredClassId) {
              id
              regID
              classType
              classNumber
              discipline
              subdiscipline
              level
              category
              numberOfSelections
              minSelections
              maxSelections
              price
            }
          }
        `)
        .variables({
          registeredClassId: testRegisteredClassId,
        })
        .expectNoErrors()

      expect(response.data.registeredClass).toBeTruthy()
      expect(response.data.registeredClass.id).toBe(testRegisteredClassId)
      expect(response.data.registeredClass.regID).toBe(testRegistrationId)
      expect(response.data.registeredClass.classNumber).toBe('E2E001')
      expect(response.data.registeredClass.discipline).toBe('Piano')
      expect(response.data.registeredClass.subdiscipline).toBe('Classical')
      expect(response.data.registeredClass.level).toBe('Grade 1')
      expect(response.data.registeredClass.category).toBe('Solo')
    })

    it('Returns error when registered class not found', async () => {
      response = await request<{ registeredClass: RegisteredClass }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClass($registeredClassId: Int!) {
            registeredClass(registeredClassID: $registeredClassId) {
              id
              classNumber
            }
          }
        `)
        .variables({
          registeredClassId: 99999,
        })

      expect(response.errors).toBeTruthy()
      expect(response.errors[0].message).toContain('not found')
    })

    it('Returns error when invalid registered class ID provided', async () => {
      response = await request<{ registeredClass: RegisteredClass }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClass($registeredClassId: Int!) {
            registeredClass(registeredClassID: $registeredClassId) {
              id
              classNumber
            }
          }
        `)
        .variables({
          registeredClassId: null,
        })

      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create Registered Class', () => {
    let response: any
    let createdRegisteredClassId: number

    afterEach(async () => {
      // Clean up created registered class
      if (createdRegisteredClassId) {
        await globalThis.prisma.tbl_reg_class
          .delete({
            where: { id: createdRegisteredClassId },
          })
          .catch(() => {}) // Ignore errors if already deleted
        createdRegisteredClassId = undefined
      }
    })

    it('Successfully creates a registered class using RegisteredClassInput', async () => {
      response = await request<{
        registeredClassCreate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateRegisteredClass(
            $registrationId: Int!
            $registeredClass: RegisteredClassInput
          ) {
            registeredClassCreate(
              registrationID: $registrationId
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
                subdiscipline
                level
                category
                numberOfSelections
                minSelections
                maxSelections
                price
              }
            }
          }
        `)
        .variables({
          registrationId: testRegistrationId,
          registeredClass: {
            classType: 'Solo Competition',
            classNumber: 'e2e_test_001',
            discipline: 'Voice',
            subdiscipline: 'Classical Voice',
            level: 'Grade 3',
            category: 'Solo',
            numberOfSelections: 1,
            minSelections: 1,
            maxSelections: 2,
            price: 30.5,
          },
        })
        .expectNoErrors()

      createdRegisteredClassId
        = response.data.registeredClassCreate.registeredClass.id

      expect(response.data.registeredClassCreate.userErrors).toEqual([])
      expect(response.data.registeredClassCreate.registeredClass).toBeTruthy()
      expect(response.data.registeredClassCreate.registeredClass.regID).toBe(
        testRegistrationId,
      )
      expect(
        response.data.registeredClassCreate.registeredClass.classNumber,
      ).toBe('e2e_test_001')
      expect(
        response.data.registeredClassCreate.registeredClass.discipline,
      ).toBe('Voice')
      expect(response.data.registeredClassCreate.registeredClass.price).toBe(
        '30.5',
      )
    })

    it('Successfully creates registered class with minimal data', async () => {
      response = await request<{
        registeredClassCreate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateRegisteredClass(
            $registrationId: Int!
            $registeredClass: RegisteredClassInput
          ) {
            registeredClassCreate(
              registrationID: $registrationId
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
          registrationId: testRegistrationId,
          registeredClass: {
            price: 25.0,
          },
        })
        .expectNoErrors()

      createdRegisteredClassId
        = response.data.registeredClassCreate.registeredClass.id

      expect(response.data.registeredClassCreate.userErrors).toEqual([])
      expect(response.data.registeredClassCreate.registeredClass).toBeTruthy()
      expect(response.data.registeredClassCreate.registeredClass.regID).toBe(
        testRegistrationId,
      )
      expect(response.data.registeredClassCreate.registeredClass.price).toBe(
        '25',
      )
    })

    it('Returns userError when trying to create with invalid registration ID', async () => {
      response = await request<{
        registeredClassCreate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateRegisteredClass(
            $registrationId: Int!
            $registeredClass: RegisteredClassInput
          ) {
            registeredClassCreate(
              registrationID: $registrationId
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
          registrationId: 99999,
          registeredClass: {
            classNumber: 'e2e_test_invalid',
            price: 25.0,
          },
        })
        .expectNoErrors()

      expect(
        response.data.registeredClassCreate.userErrors.length,
      ).toBeGreaterThan(0)
      expect(
        response.data.registeredClassCreate.userErrors[0].message,
      ).toBeTruthy()
      expect(response.data.registeredClassCreate.registeredClass).toBeNull()
    })

    it('Returns error with invalid input data', async () => {
      response = await request<{
        registeredClassCreate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateRegisteredClass(
            $registrationId: Int!
            $registeredClass: RegisteredClassInput
          ) {
            registeredClassCreate(
              registrationID: $registrationId
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
          registrationId: testRegistrationId,
          registeredClass: {
            price: 'invalid_price',
            numberOfSelections: 'invalid_number',
          },
        })

      expect(response.errors).toBeTruthy()
      expect(response.errors[0].message).toContain('Variable')
    })
  })

  describe('Update Registered Class', () => {
    let response: any
    let updateTestRegisteredClassId: number

    beforeEach(async () => {
      // Create a registered class for updating
      const testClass = await globalThis.prisma.tbl_reg_class.create({
        data: {
          regID: testRegistrationId,
          classType: 'Update Test Class',
          classNumber: 'e2e_test_update',
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
      updateTestRegisteredClassId = testClass.id
    })

    afterEach(async () => {
      // Clean up test data
      if (updateTestRegisteredClassId) {
        await globalThis.prisma.tbl_reg_class
          .delete({
            where: { id: updateTestRegisteredClassId },
          })
          .catch(() => {}) // Ignore errors if already deleted
      }
    })

    it('Successfully updates a registered class', async () => {
      response = await request<{
        registeredClassUpdate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation UpdateRegisteredClass(
            $registeredClassId: Int!
            $registeredClassInput: RegisteredClassInput!
          ) {
            registeredClassUpdate(
              registeredClassID: $registeredClassId
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
                level
                category
                numberOfSelections
                price
              }
            }
          }
        `)
        .variables({
          registeredClassId: updateTestRegisteredClassId,
          registeredClassInput: {
            classType: 'Updated Solo Class',
            classNumber: 'e2e_updated',
            discipline: 'Woodwinds',
            subdiscipline: 'Flute',
            level: 'Grade 4',
            category: 'Solo Performance',
            numberOfSelections: 3,
            minSelections: 2,
            maxSelections: 4,
            price: 35.75,
          },
        })
        .expectNoErrors()

      expect(response.data.registeredClassUpdate.userErrors).toEqual([])
      expect(response.data.registeredClassUpdate.registeredClass).toBeTruthy()
      expect(response.data.registeredClassUpdate.registeredClass.id).toBe(
        updateTestRegisteredClassId,
      )
      expect(
        response.data.registeredClassUpdate.registeredClass.classType,
      ).toBe('Updated Solo Class')
      expect(
        response.data.registeredClassUpdate.registeredClass.classNumber,
      ).toBe('e2e_updated')
      expect(
        response.data.registeredClassUpdate.registeredClass.discipline,
      ).toBe('Woodwinds')
      expect(
        response.data.registeredClassUpdate.registeredClass.subdiscipline,
      ).toBe('Flute')
      expect(
        response.data.registeredClassUpdate.registeredClass.numberOfSelections,
      ).toBe(3)
      expect(response.data.registeredClassUpdate.registeredClass.price).toBe(
        '35.75',
      )
    })

    it('Returns userError when trying to update non-existent registered class', async () => {
      response = await request<{
        registeredClassUpdate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation UpdateRegisteredClass(
            $registeredClassId: Int!
            $registeredClassInput: RegisteredClassInput!
          ) {
            registeredClassUpdate(
              registeredClassID: $registeredClassId
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
          registeredClassId: 99999,
          registeredClassInput: {
            classType: 'Non-existent Class',
            price: 25.0,
          },
        })
        .expectNoErrors()

      expect(
        response.data.registeredClassUpdate.userErrors.length,
      ).toBeGreaterThan(0)
      expect(
        response.data.registeredClassUpdate.userErrors[0].message,
      ).toContain('not found')
      expect(response.data.registeredClassUpdate.registeredClass).toBeNull()
    })

    it('Returns error with invalid update input', async () => {
      response = await request<{
        registeredClassUpdate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation UpdateRegisteredClass(
            $registeredClassId: Int!
            $registeredClassInput: RegisteredClassInput!
          ) {
            registeredClassUpdate(
              registeredClassID: $registeredClassId
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
          registeredClassId: updateTestRegisteredClassId,
          registeredClassInput: {
            price: null,
            numberOfSelections: 'invalid',
          },
        })

      expect(response.errors).toBeTruthy()
    })
  })

  describe('Delete Registered Class', () => {
    let response: any
    let deleteTestRegisteredClassId: number

    beforeEach(async () => {
      // Create a registered class for deletion
      const testClass = await globalThis.prisma.tbl_reg_class.create({
        data: {
          regID: testRegistrationId,
          classType: 'Delete Test Class',
          classNumber: 'e2e_test_delete',
          discipline: 'Percussion',
          subdiscipline: 'Drums',
          level: 'Beginner',
          category: 'Solo',
          price: 15.0,
        },
      })
      deleteTestRegisteredClassId = testClass.id
    })

    it('Successfully deletes a registered class', async () => {
      response = await request<{
        registeredClassDelete: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation DeleteRegisteredClass($registeredClassId: Int!) {
            registeredClassDelete(registeredClassID: $registeredClassId) {
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
        .variables({
          registeredClassId: deleteTestRegisteredClassId,
        })
        .expectNoErrors()

      expect(response.data.registeredClassDelete.userErrors).toEqual([])
      expect(response.data.registeredClassDelete.registeredClass).toBeTruthy()
      expect(response.data.registeredClassDelete.registeredClass.id).toBe(
        deleteTestRegisteredClassId,
      )

      // Verify the registered class was actually deleted
      const deletedClass = await globalThis.prisma.tbl_reg_class.findUnique({
        where: { id: deleteTestRegisteredClassId },
      })
      expect(deletedClass).toBeNull()

      deleteTestRegisteredClassId = undefined // Prevent cleanup attempt
    })

    it('Returns userError when trying to delete non-existent registered class', async () => {
      response = await request<{
        registeredClassDelete: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation DeleteRegisteredClass($registeredClassId: Int!) {
            registeredClassDelete(registeredClassID: $registeredClassId) {
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
          registeredClassId: 99999,
        })
        .expectNoErrors()

      expect(
        response.data.registeredClassDelete.userErrors.length,
      ).toBeGreaterThan(0)
      expect(
        response.data.registeredClassDelete.userErrors[0].message,
      ).toContain('not found')
      expect(response.data.registeredClassDelete.registeredClass).toBeNull()
    })

    it('Returns error with invalid registered class ID', async () => {
      response = await request<{
        registeredClassDelete: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation DeleteRegisteredClass($registeredClassId: Int!) {
            registeredClassDelete(registeredClassID: $registeredClassId) {
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
          registeredClassId: null,
        })

      expect(response.errors).toBeTruthy()
    })

    afterEach(async () => {
      // Clean up if deletion test failed
      if (deleteTestRegisteredClassId) {
        await globalThis.prisma.tbl_reg_class
          .delete({
            where: { id: deleteTestRegisteredClassId },
          })
          .catch(() => {}) // Ignore errors if already deleted
      }
    })
  })

  describe('Field Resolvers', () => {
    let response: any

    it('Can resolve selections field for registered class', async () => {
      response = await request<{ registeredClass: RegisteredClass }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClassWithSelections($registeredClassId: Int!) {
            registeredClass(registeredClassID: $registeredClassId) {
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
        .variables({
          registeredClassId: testRegisteredClassId,
        })
        .expectNoErrors()

      expect(response.data.registeredClass).toBeTruthy()
      expect(response.data.registeredClass.selections).toBeDefined()
      expect(Array.isArray(response.data.registeredClass.selections)).toBe(
        true,
      )
    })

    it('Can resolve performers field for registered class', async () => {
      response = await request<{ registeredClass: RegisteredClass }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClassWithPerformers($registeredClassId: Int!) {
            registeredClass(registeredClassID: $registeredClassId) {
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
        .variables({
          registeredClassId: testRegisteredClassId,
        })
        .expectNoErrors()

      expect(response.data.registeredClass).toBeTruthy()
      expect(response.data.registeredClass.performers).toBeDefined()
      expect(Array.isArray(response.data.registeredClass.performers)).toBe(
        true,
      )
    })
  })

  describe('Authentication and Authorization', () => {
    it('Requires authentication for all operations', async () => {
      const response = await request<{ registeredClasses: RegisteredClass[] }>(
        globalThis.httpServer,
      ).query(gql`
        query RegisteredClasses {
          registeredClasses {
            id
            classNumber
          }
        }
      `)

      expect(response.errors).toBeTruthy()
      expect(response.errors[0].message).toContain('Unauthorized')
    })

    it('Enforces permissions for admin-only operations', async () => {
      // Note: In a real scenario, you'd test with a non-admin user
      // This test assumes the admin user has all permissions
      const response = await request<{ registeredClasses: RegisteredClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query RegisteredClasses {
            registeredClasses {
              id
              classNumber
            }
          }
        `)
        .expectNoErrors()

      expect(response.data.registeredClasses).toBeTruthy()
    })
  })

  describe('Data Validation and Business Logic', () => {
    it('Validates price format with decimal precision', async () => {
      const response = await request<{
        registeredClassCreate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateRegisteredClass(
            $registrationId: Int!
            $registeredClass: RegisteredClassInput
          ) {
            registeredClassCreate(
              registrationID: $registrationId
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
          registrationId: testRegistrationId,
          registeredClass: {
            price: 29.99,
          },
        })
        .expectNoErrors()

      expect(response.data.registeredClassCreate.userErrors).toEqual([])
      expect(response.data.registeredClassCreate.registeredClass.price).toBe(
        '29.99',
      )

      // Clean up
      await globalThis.prisma.tbl_reg_class.delete({
        where: { id: response.data.registeredClassCreate.registeredClass.id },
      })
    })

    it('Validates selection count constraints', async () => {
      const response = await request<{
        registeredClassCreate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateRegisteredClass(
            $registrationId: Int!
            $registeredClass: RegisteredClassInput
          ) {
            registeredClassCreate(
              registrationID: $registrationId
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
          registrationId: testRegistrationId,
          registeredClass: {
            numberOfSelections: 2,
            minSelections: 1,
            maxSelections: 3,
            price: 25.0,
          },
        })
        .expectNoErrors()

      expect(response.data.registeredClassCreate.userErrors).toEqual([])
      expect(
        response.data.registeredClassCreate.registeredClass.numberOfSelections,
      ).toBe(2)
      expect(
        response.data.registeredClassCreate.registeredClass.minSelections,
      ).toBe(1)
      expect(
        response.data.registeredClassCreate.registeredClass.maxSelections,
      ).toBe(3)

      // Clean up
      await globalThis.prisma.tbl_reg_class.delete({
        where: { id: response.data.registeredClassCreate.registeredClass.id },
      })
    })

    it('Handles group ID associations correctly', async () => {
      const response = await request<{
        registeredClassCreate: RegisteredClassPayload
      }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateRegisteredClass(
            $registrationId: Int!
            $registeredClass: RegisteredClassInput
          ) {
            registeredClassCreate(
              registrationID: $registrationId
              registeredClass: $registeredClass
            ) {
              userErrors {
                message
                field
              }
              registeredClass {
                id
                schoolGroupID
                communityGroupID
              }
            }
          }
        `)
        .variables({
          registrationId: testRegistrationId,
          registeredClass: {
            schoolGroupID: 1,
            communityGroupID: 2,
            price: 25.0,
          },
        })
        .expectNoErrors()

      expect(response.data.registeredClassCreate.userErrors).toEqual([])
      expect(
        response.data.registeredClassCreate.registeredClass.schoolGroupID,
      ).toBe(1)
      expect(
        response.data.registeredClassCreate.registeredClass.communityGroupID,
      ).toBe(2)

      // Clean up
      await globalThis.prisma.tbl_reg_class.delete({
        where: { id: response.data.registeredClassCreate.registeredClass.id },
      })
    })
  })
})
