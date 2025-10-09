import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  Selection,
  SelectionPayload,
} from '../entities/selection.entity'

describe('Selection E2E Tests', () => {
  let testAdminRegistrationId: number
  let testUserRegistrationId: number
  let testAdminRegisteredClassId: number
  let testUserRegisteredClassId: number
  let testAdminSelectionId: number
  let testUserSelectionId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_reg_selection.deleteMany({
      where: {
        OR: [
          { title: { startsWith: 'test_' } },
          { composer: { startsWith: 'test_' } },
        ],
      },
    })

    await globalThis.prisma.tbl_reg_class.deleteMany({
      where: { classNumber: { startsWith: 'sel_' } },
    })

    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_sel_' } },
    })

    // Create test registrations for both roles
    const adminReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        performerType: 'SOLO',
        label: 'test_sel_admin_reg',
        confirmation: 'TEST-SEL-ADMIN',
      },
    })
    testAdminRegistrationId = adminReg.id

    const userReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        performerType: 'SOLO',
        label: 'test_sel_user_reg',
        confirmation: 'TEST-SEL-USER',
      },
    })
    testUserRegistrationId = userReg.id

    // Create test registered classes for both roles
    const adminClass = await globalThis.prisma.tbl_reg_class.create({
      data: {
        regID: testAdminRegistrationId,
        classNumber: 'sel_adm_01',
        classType: 'Solo',
        discipline: 'Piano',
        price: 25.0,
      },
    })
    testAdminRegisteredClassId = adminClass.id

    const userClass = await globalThis.prisma.tbl_reg_class.create({
      data: {
        regID: testUserRegistrationId,
        classNumber: 'sel_usr_01',
        classType: 'Solo',
        discipline: 'Voice',
        price: 30.0,
      },
    })
    testUserRegisteredClassId = userClass.id

    // Create test selections for both roles
    const adminSelection = await globalThis.prisma.tbl_reg_selection.create({
      data: {
        classpickID: testAdminRegisteredClassId,
        title: 'test_admin_piece',
        composer: 'test_Bach',
        largerWork: 'Well-Tempered Clavier',
        movement: 'Prelude No. 1',
        duration: '2:30',
      },
    })
    testAdminSelectionId = adminSelection.id

    const userSelection = await globalThis.prisma.tbl_reg_selection.create({
      data: {
        classpickID: testUserRegisteredClassId,
        title: 'test_user_song',
        composer: 'test_Mozart',
        largerWork: 'The Magic Flute',
        movement: 'Queen of the Night',
        duration: '3:00',
      },
    })
    testUserSelectionId = userSelection.id
  }, 30000)

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_reg_selection.deleteMany({
      where: {
        OR: [
          { title: { startsWith: 'test_' } },
          { composer: { startsWith: 'test_' } },
        ],
      },
    })

    await globalThis.prisma.tbl_reg_class.deleteMany({
      where: { classNumber: { startsWith: 'sel_' } },
    })

    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_sel_' } },
    })
  })

  describe('Selection Queries', () => {
    it('Should list all selections for both roles', async () => {
      const results = await testWithBothRoles(
        'list all selections',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSelections {
                selections {
                  id
                  title
                  composer
                  largerWork
                  movement
                  duration
                }
              }
            `)
            .expectNoErrors() as { data: { selections: Selection[] } }

          return {
            hasData: !!response.data.selections,
            count: response.data.selections?.length || 0,
            containsTestSelection: response.data.selections?.some(
              (sel: Selection) =>
                sel.title?.startsWith('test_') || sel.composer?.startsWith('test_'),
            ),
          }
        },
      )

      // Both roles should successfully retrieve selections
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(2)
      expect(results.admin.containsTestSelection).toBe(true)

      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBeGreaterThanOrEqual(2)
      expect(results.user.containsTestSelection).toBe(true)
    })

    it('Should filter selections by registered class ID for both roles', async () => {
      const results = await testWithBothRoles(
        'filter by registeredClassID',
        async (role) => {
          const classId = role === 'admin' ? testAdminRegisteredClassId : testUserRegisteredClassId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSelections($registeredClassID: Int) {
                selections(registeredClassID: $registeredClassID) {
                  id
                  title
                  composer
                }
              }
            `)
            .variables({ registeredClassID: classId })
            .expectNoErrors() as { data: { selections: Selection[] } }

          return {
            hasData: !!response.data.selections,
            count: response.data.selections?.length || 0,
            firstSelection: response.data.selections?.[0],
          }
        },
      )

      // Both roles should get filtered selections
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(1)
      expect(results.admin.firstSelection?.title).toBe('test_admin_piece')

      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBeGreaterThanOrEqual(1)
      expect(results.user.firstSelection?.title).toBe('test_user_song')
    })

    it('Should find specific selection by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find selection by ID',
        async (role) => {
          const selectionId = role === 'admin' ? testAdminSelectionId : testUserSelectionId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSelection($selectionID: Int!) {
                selection(selectionID: $selectionID) {
                  id
                  title
                  composer
                  largerWork
                  movement
                  duration
                }
              }
            `)
            .variables({ selectionID: selectionId })
            .expectNoErrors() as { data: { selection: Selection } }

          return {
            hasData: !!response.data.selection,
            selection: response.data.selection,
            correctId: response.data.selection?.id === selectionId,
          }
        },
      )

      // Both roles should successfully retrieve their selection
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.correctId).toBe(true)
      expect(results.admin.selection?.title).toBe('test_admin_piece')
      expect(results.admin.selection?.composer).toBe('test_Bach')

      expect(results.user.hasData).toBe(true)
      expect(results.user.correctId).toBe(true)
      expect(results.user.selection?.title).toBe('test_user_song')
      expect(results.user.selection?.composer).toBe('test_Mozart')
    })

    it('Should handle not found error for non-existent selection', async () => {
      const results = await testWithBothRoles(
        'find non-existent selection',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetSelection($selectionID: Int!) {
                selection(selectionID: $selectionID) {
                  id
                  title
                }
              }
            `)
            .variables({ selectionID: 999999 }) as {
            data?: { selection: Selection }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            selection: response.data?.selection,
          }
        },
      )

      // Both roles should get null or undefined for non-existent selection
      expect(results.admin.selection).toBeFalsy()
      expect(results.user.selection).toBeFalsy()
    })

    it('Should return correct data types for selection fields', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetSelections {
            selections {
              id
              title
              composer
              largerWork
              movement
              duration
            }
          }
        `)
        .expectNoErrors() as { data: { selections: Selection[] } }

      const firstSelection = response.data.selections[0]
      expect(typeof firstSelection.id).toBe('number')

      // Optional string fields
      if (firstSelection.title !== null) {
        expect(typeof firstSelection.title).toBe('string')
      }
      if (firstSelection.composer !== null) {
        expect(typeof firstSelection.composer).toBe('string')
      }
    })
  })

  describe('Selection Create Tests', () => {
    it('Should enforce create authorization: both roles can create', async () => {
      const results = await testWithBothRoles(
        'create selection',
        async (role) => {
          const classId = role === 'admin' ? testAdminRegisteredClassId : testUserRegisteredClassId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSelection($registeredClassID: Int!) {
                selectionCreate(registeredClassID: $registeredClassID) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                    title
                    composer
                  }
                }
              }
            `)
            .variables({ registeredClassID: classId }) as {
            data?: { selectionCreate: SelectionPayload }
            errors?: readonly any[]
          }

          // Clean up created selection
          if (response.data?.selectionCreate?.selection?.id) {
            await globalThis.prisma.tbl_reg_selection.delete({
              where: { id: response.data.selectionCreate.selection.id },
            })
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            selection: response.data?.selectionCreate?.selection as Selection | undefined,
            userErrors: response.data?.selectionCreate?.userErrors || [],
          }
        },
      )

      // Both roles should successfully create selections
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.selection).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.selection).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should create selection with minimal data for both roles', async () => {
      const results = await testWithBothRoles(
        'create with minimal data',
        async (role) => {
          const classId = role === 'admin' ? testAdminRegisteredClassId : testUserRegisteredClassId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSelection($registeredClassID: Int!) {
                selectionCreate(registeredClassID: $registeredClassID) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({ registeredClassID: classId }) as {
            data?: { selectionCreate: SelectionPayload }
          }

          // Clean up
          if (response.data?.selectionCreate?.selection?.id) {
            await globalThis.prisma.tbl_reg_selection.delete({
              where: { id: response.data.selectionCreate.selection.id },
            })
          }

          return {
            selection: response.data?.selectionCreate?.selection as Selection | undefined,
            userErrors: response.data?.selectionCreate?.userErrors || [],
          }
        },
      )

      // Both roles should create with minimal data
      expect(results.admin.selection).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.selection).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should handle validation errors for invalid registered class ID', async () => {
      const results = await testWithBothRoles(
        'create with invalid registered class ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSelection($registeredClassID: Int!) {
                selectionCreate(registeredClassID: $registeredClassID) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({ registeredClassID: 999999 }) as {
            data?: { selectionCreate: SelectionPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get database errors for invalid foreign key
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Selection Update Tests', () => {
    let updateTestAdminSelectionId: number
    let updateTestUserSelectionId: number

    beforeAll(async () => {
      // Create selections for update tests
      const adminSelection = await globalThis.prisma.tbl_reg_selection.create({
        data: {
          classpickID: testAdminRegisteredClassId,
          title: 'test_update_admin',
          composer: 'test_Beethoven',
        },
      })
      updateTestAdminSelectionId = adminSelection.id

      const userSelection = await globalThis.prisma.tbl_reg_selection.create({
        data: {
          classpickID: testUserRegisteredClassId,
          title: 'test_update_user',
          composer: 'test_Chopin',
        },
      })
      updateTestUserSelectionId = userSelection.id
    })

    afterAll(async () => {
      // Clean up update test selections
      const idsToDelete = [updateTestAdminSelectionId, updateTestUserSelectionId].filter(
        id => id !== undefined,
      )
      if (idsToDelete.length > 0) {
        await globalThis.prisma.tbl_reg_selection.deleteMany({
          where: { id: { in: idsToDelete } },
        })
      }
    })

    it('Should successfully update selection for both roles', async () => {
      const results = await testWithBothRoles(
        'update selection',
        async (role) => {
          const selectionId = role === 'admin' ? updateTestAdminSelectionId : updateTestUserSelectionId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSelection(
                $selectionID: Int!
                $selectionInput: SelectionInput!
              ) {
                selectionUpdate(
                  selectionID: $selectionID
                  selectionInput: $selectionInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                    title
                    composer
                    largerWork
                    movement
                    duration
                  }
                }
              }
            `)
            .variables({
              selectionID: selectionId,
              selectionInput: {
                title: `test_updated_${role}`,
                composer: 'test_Brahms',
                largerWork: 'Symphony No. 1',
                movement: 'First Movement',
                duration: '12:30',
              },
            }) as {
            data?: { selectionUpdate: SelectionPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            selection: response.data?.selectionUpdate?.selection as Selection | undefined,
            userErrors: response.data?.selectionUpdate?.userErrors || [],
            hasCorrectUpdates:
              response.data?.selectionUpdate?.selection?.title === `test_updated_${role}`
              && response.data?.selectionUpdate?.selection?.composer === 'test_Brahms',
          }
        },
      )

      // Both roles should successfully update
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.selection).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.hasCorrectUpdates).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.selection).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.hasCorrectUpdates).toBe(true)
    })

    it('Should update partial fields for both roles', async () => {
      const results = await testWithBothRoles(
        'update partial fields',
        async (role) => {
          const selectionId = role === 'admin' ? updateTestAdminSelectionId : updateTestUserSelectionId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSelection(
                $selectionID: Int!
                $selectionInput: SelectionInput!
              ) {
                selectionUpdate(
                  selectionID: $selectionID
                  selectionInput: $selectionInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                    duration
                  }
                }
              }
            `)
            .variables({
              selectionID: selectionId,
              selectionInput: {
                duration: '5:45',
              },
            }) as { data?: { selectionUpdate: SelectionPayload } }

          return {
            userErrors: response.data?.selectionUpdate?.userErrors || [],
            duration: response.data?.selectionUpdate?.selection?.duration,
          }
        },
      )

      // Both roles should update partial fields
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.duration).toBe('5:45')

      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.duration).toBe('5:45')
    })

    it('Should handle update with invalid selection ID', async () => {
      const results = await testWithBothRoles(
        'update non-existent selection',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSelection(
                $selectionID: Int!
                $selectionInput: SelectionInput!
              ) {
                selectionUpdate(
                  selectionID: $selectionID
                  selectionInput: $selectionInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({
              selectionID: 999999,
              selectionInput: {
                title: 'Non-existent',
              },
            }) as {
            data?: { selectionUpdate: SelectionPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get database errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should handle update with null ID error', async () => {
      const results = await testWithBothRoles(
        'update with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSelection(
                $selectionID: Int!
                $selectionInput: SelectionInput!
              ) {
                selectionUpdate(
                  selectionID: $selectionID
                  selectionInput: $selectionInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({
              selectionID: null,
              selectionInput: { title: 'Test' },
            }) as {
            data?: { selectionUpdate: SelectionPayload }
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

  describe('Selection Delete Tests', () => {
    it('Should enforce delete authorization: both roles can delete', async () => {
      const results = await testWithBothRoles(
        'delete selection',
        async (role) => {
          const classId = role === 'admin' ? testAdminRegisteredClassId : testUserRegisteredClassId

          // Create a selection to delete
          const testSelection = await globalThis.prisma.tbl_reg_selection.create({
            data: {
              classpickID: classId,
              title: `test_${role}_delete`,
              composer: 'test_DeleteComposer',
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSelection($selectionID: Int!) {
                selectionDelete(selectionID: $selectionID) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                    title
                    composer
                  }
                }
              }
            `)
            .variables({ selectionID: testSelection.id }) as {
            data?: { selectionDelete: SelectionPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            selection: response.data?.selectionDelete?.selection as Selection | undefined,
            userErrors: response.data?.selectionDelete?.userErrors || [],
          }
        },
      )

      // Both roles should successfully delete
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.selection).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.selection?.title).toBe('test_admin_delete')

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.selection).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.selection?.title).toBe('test_user_delete')
    })

    it('Should handle delete of non-existent selection', async () => {
      const results = await testWithBothRoles(
        'delete non-existent selection',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSelection($selectionID: Int!) {
                selectionDelete(selectionID: $selectionID) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({ selectionID: 999999 }) as {
            data?: { selectionDelete: SelectionPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get database errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should handle delete with null ID error', async () => {
      const results = await testWithBothRoles(
        'delete with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteSelection($selectionID: Int!) {
                selectionDelete(selectionID: $selectionID) {
                  userErrors {
                    message
                    field
                  }
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({ selectionID: null }) as {
            data?: { selectionDelete: SelectionPayload }
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

  describe('Selection Field Validation', () => {
    it('Should handle all optional fields correctly for both roles', async () => {
      const results = await testWithBothRoles(
        'create and update with all fields',
        async (role) => {
          const classId = role === 'admin' ? testAdminRegisteredClassId : testUserRegisteredClassId

          // Create with all fields
          const createResponse = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSelection($registeredClassID: Int!) {
                selectionCreate(registeredClassID: $registeredClassID) {
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({ registeredClassID: classId }) as {
            data?: { selectionCreate: SelectionPayload }
          }

          const selectionId = createResponse.data?.selectionCreate?.selection?.id

          if (!selectionId) {
            throw new Error('Failed to create selection')
          }

          // Update with all fields
          const updateResponse = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSelection(
                $selectionID: Int!
                $selectionInput: SelectionInput!
              ) {
                selectionUpdate(
                  selectionID: $selectionID
                  selectionInput: $selectionInput
                ) {
                  selection {
                    id
                    title
                    composer
                    largerWork
                    movement
                    duration
                  }
                }
              }
            `)
            .variables({
              selectionID: selectionId,
              selectionInput: {
                title: 'Complete Test Piece',
                composer: 'Test Composer',
                largerWork: 'Test Suite',
                movement: 'Test Movement',
                duration: '10:00',
              },
            }) as { data?: { selectionUpdate: SelectionPayload } }

          // Clean up
          await globalThis.prisma.tbl_reg_selection.delete({
            where: { id: selectionId },
          })

          return {
            selection: updateResponse.data?.selectionUpdate?.selection,
            hasAllFields:
              !!updateResponse.data?.selectionUpdate?.selection?.title
              && !!updateResponse.data?.selectionUpdate?.selection?.composer
              && !!updateResponse.data?.selectionUpdate?.selection?.largerWork
              && !!updateResponse.data?.selectionUpdate?.selection?.movement
              && !!updateResponse.data?.selectionUpdate?.selection?.duration,
          }
        },
      )

      // Both roles should handle all fields
      expect(results.admin.hasAllFields).toBe(true)
      expect(results.admin.selection?.title).toBe('Complete Test Piece')
      expect(results.admin.selection?.composer).toBe('Test Composer')

      expect(results.user.hasAllFields).toBe(true)
      expect(results.user.selection?.title).toBe('Complete Test Piece')
      expect(results.user.selection?.composer).toBe('Test Composer')
    })

    it('Should allow empty strings for optional fields', async () => {
      const results = await testWithBothRoles(
        'update with empty strings',
        async (role) => {
          const classId = role === 'admin' ? testAdminRegisteredClassId : testUserRegisteredClassId

          // Create selection
          const createResponse = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateSelection($registeredClassID: Int!) {
                selectionCreate(registeredClassID: $registeredClassID) {
                  selection {
                    id
                  }
                }
              }
            `)
            .variables({ registeredClassID: classId }) as {
            data?: { selectionCreate: SelectionPayload }
          }

          const selectionId = createResponse.data?.selectionCreate?.selection?.id

          if (!selectionId) {
            throw new Error('Failed to create selection')
          }

          // Update with empty strings
          const updateResponse = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateSelection(
                $selectionID: Int!
                $selectionInput: SelectionInput!
              ) {
                selectionUpdate(
                  selectionID: $selectionID
                  selectionInput: $selectionInput
                ) {
                  userErrors {
                    message
                  }
                  selection {
                    id
                    title
                  }
                }
              }
            `)
            .variables({
              selectionID: selectionId,
              selectionInput: {
                title: '',
              },
            }) as { data?: { selectionUpdate: SelectionPayload } }

          // Clean up
          await globalThis.prisma.tbl_reg_selection.delete({
            where: { id: selectionId },
          })

          return {
            userErrors: updateResponse.data?.selectionUpdate?.userErrors || [],
            title: updateResponse.data?.selectionUpdate?.selection?.title,
          }
        },
      )

      // Both roles should allow empty strings
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.title).toBe('')

      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.title).toBe('')
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetSelections {
            selections {
              id
              title
            }
          }
        `) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
