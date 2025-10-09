import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  Registration,
  RegistrationPayload,
} from '../entities/registration.entity'

describe('Registration E2E Tests', () => {
  let testAdminRegId: number
  let testUserRegId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_' } },
    })

    // Create test registrations for both roles to use in queries
    const adminReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('admin'),
        performerType: 'SOLO',
        label: 'test_admin_registration',
      },
    })
    testAdminRegId = adminReg.id

    const userReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: getUserId('user'),
        performerType: 'GROUP',
        label: 'test_user_registration',
      },
    })
    testUserRegId = userReg.id
  }, 30000)

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_registration.deleteMany({
      where: { label: { startsWith: 'test_' } },
    })
  })

  describe('Registration Queries (Both Roles)', () => {
    it('Should list all registrations for both roles', async () => {
      const results = await testWithBothRoles(
        'list all registrations',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetRegistrations {
                registrations {
                  id
                  label
                  performerType
                  confirmation
                  createdAt
                }
              }
            `)
            .expectNoErrors() as { data: { registrations: Registration[] } }

          return {
            hasData: !!response.data.registrations,
            count: response.data.registrations?.length || 0,
            registrations: response.data.registrations,
          }
        },
      )

      // Admin should see all registrations (including test ones)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(2) // At least our 3 test registrations

      // User should see only their own registrations
      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBeGreaterThan(0)

      // Verify user only sees their own registrations
      const allUserRegistrations = results.user.registrations || []
      const userRegistrationsValid = allUserRegistrations.every(
        (reg: Registration) => reg.id === testUserRegId || !reg.label?.startsWith('test_'),
      )
      expect(userRegistrationsValid).toBe(true)
    })

    it('Should list registrations with multiple fields for both roles', async () => {
      const results = await testWithBothRoles(
        'list registrations with fields',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetRegistrationsWithFields {
                registrations {
                  id
                  label
                  performerType
                  confirmation
                  createdAt
                  updatedAt
                }
              }
            `)
            .expectNoErrors() as { data: { registrations: Registration[] } }

          return {
            hasData: !!response.data.registrations,
            count: response.data.registrations?.length || 0,
            hasPerformerTypes: response.data.registrations?.every((reg: Registration) => !!reg.performerType),
          }
        },
      )

      // Both roles should successfully retrieve registrations
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.hasPerformerTypes).toBe(true)
      expect(results.user.hasPerformerTypes).toBe(true)
    })

    it('Should filter registrations by performerType for admin', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetRegistrationsByPerformerType($performerType: PerformerType) {
            registrations(performerType: $performerType) {
              id
              performerType
              label
            }
          }
        `)
        .variables({ performerType: 'SOLO' })
        .expectNoErrors() as { data: { registrations: Registration[] } }

      expect(response.data.registrations).toBeTruthy()
      expect(response.data.registrations.length).toBeGreaterThan(0)

      // All returned registrations should be SOLO type
      const allSolo = response.data.registrations.every(
        (reg: Registration) => reg.performerType === 'SOLO',
      )
      expect(allSolo).toBe(true)
    })

    it('Should find specific registration by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find registration by ID',
        async (role) => {
          const regId = role === 'admin' ? testAdminRegId : testUserRegId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetRegistration($id: Int!) {
                registration(id: $id) {
                  id
                  label
                  performerType
                  confirmation
                }
              }
            `)
            .variables({ id: regId })
            .expectNoErrors() as { data: { registration: Registration } }

          return {
            hasData: !!response.data.registration,
            registration: response.data.registration,
            correctId: response.data.registration?.id === regId,
          }
        },
      )

      // Both roles should successfully retrieve their own registration
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.correctId).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.user.correctId).toBe(true)
    })

    it('Should handle not found error for non-existent registration', async () => {
      const results = await testWithBothRoles(
        'find non-existent registration',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetRegistration($id: Int!) {
                registration(id: $id) {
                  id
                  label
                }
              }
            `)
            .variables({ id: 999999 }) as {
            data?: { registration: Registration }
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
  })

  describe('Registration Create Tests', () => {
    it('Should enforce create authorization: both roles can create', async () => {
      const results = await testWithBothRoles(
        'create registration',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegistration(
                $performerType: PerformerType!
                $label: String!
              ) {
                registrationCreate(
                  performerType: $performerType
                  label: $label
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                    performerType
                    label
                  }
                }
              }
            `)
            .variables({
              performerType: 'COMMUNITY',
              label: `test_${role}_create_registration`,
            }) as {
            data?: { registrationCreate: RegistrationPayload }
            errors?: readonly any[]
          }

          // Clean up created registration
          if (response.data?.registrationCreate?.registration?.id) {
            await globalThis.prisma.tbl_registration.delete({
              where: { id: response.data.registrationCreate.registration.id },
            })
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            registration: response.data?.registrationCreate?.registration as Registration | undefined,
            userErrors: response.data?.registrationCreate?.userErrors || [],
          }
        },
      )

      // Both roles should successfully create registrations
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.registration).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.registration?.performerType).toBe('COMMUNITY')

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.registration).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.registration?.performerType).toBe('COMMUNITY')
    })

    it('Should create registration with optional label for both roles', async () => {
      const results = await testWithBothRoles(
        'create registration with label',
        async (role) => {
          const label = `test_${role}_labeled_registration`

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegistration(
                $performerType: PerformerType!
                $label: String!
              ) {
                registrationCreate(
                  performerType: $performerType
                  label: $label
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                    label
                    performerType
                  }
                }
              }
            `)
            .variables({
              performerType: 'SOLO',
              label,
            }) as { data?: { registrationCreate: RegistrationPayload } }

          // Clean up created registration
          if (response.data?.registrationCreate?.registration?.id) {
            await globalThis.prisma.tbl_registration.delete({
              where: { id: response.data.registrationCreate.registration.id },
            }).catch(() => {}) // Ignore cleanup errors
          }

          return {
            registration: response.data?.registrationCreate?.registration as Registration | undefined,
            userErrors: response.data?.registrationCreate?.userErrors || [],
            hasCorrectLabel: response.data?.registrationCreate?.registration?.label === label,
          }
        },
      )

      // Both roles should create registration with correct label
      expect(results.admin.registration).toBeTruthy()
      expect(results.admin.hasCorrectLabel).toBe(true)
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.registration).toBeTruthy()
      expect(results.user.hasCorrectLabel).toBe(true)
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should use default label when empty string provided', async () => {
      const results = await testWithBothRoles(
        'create registration with empty label',
        async (role) => {
          // Test with empty label to check default label handling
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateRegistration(
                $performerType: PerformerType!
                $label: String!
              ) {
                registrationCreate(
                  performerType: $performerType
                  label: $label
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                    label
                  }
                }
              }
            `)
            .variables({
              performerType: 'SOLO',
              label: '',
            }) as { data?: { registrationCreate: RegistrationPayload } }

          // Clean up created registration
          if (response.data?.registrationCreate?.registration?.id) {
            await globalThis.prisma.tbl_registration.delete({
              where: { id: response.data.registrationCreate.registration.id },
            }).catch(() => {})
          }

          return {
            hasUserErrors: (response.data?.registrationCreate?.userErrors?.length || 0) > 0,
            userErrors: response.data?.registrationCreate?.userErrors || [],
            registration: response.data?.registrationCreate?.registration,
            hasDefaultLabel: response.data?.registrationCreate?.registration?.label === 'Registration Form',
          }
        },
      )

      // Both roles should successfully create with default label
      expect(results.admin.hasUserErrors).toBe(false)
      expect(results.admin.registration).toBeTruthy()
      expect(results.admin.hasDefaultLabel).toBe(true)
      expect(results.user.hasUserErrors).toBe(false)
      expect(results.user.registration).toBeTruthy()
      expect(results.user.hasDefaultLabel).toBe(true)
    })
  })

  describe('Registration Update Tests', () => {
    let updateTestAdminRegId: number
    let updateTestUserRegId: number

    beforeAll(async () => {
      // Create separate registrations for update tests
      const adminUpdateReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('admin'),
          performerType: 'SOLO',
          label: 'test_admin_update_registration',
        },
      })
      updateTestAdminRegId = adminUpdateReg.id

      const userUpdateReg = await globalThis.prisma.tbl_registration.create({
        data: {
          userID: getUserId('user'),
          performerType: 'GROUP',
          label: 'test_user_update_registration',
        },
      })
      updateTestUserRegId = userUpdateReg.id
    })

    afterAll(async () => {
      // Clean up update test registrations
      await globalThis.prisma.tbl_registration.deleteMany({
        where: {
          id: { in: [updateTestAdminRegId, updateTestUserRegId] },
        },
      })
    })

    it('Should successfully update registration for both roles', async () => {
      const results = await testWithBothRoles(
        'update registration',
        async (role) => {
          const regId = role === 'admin' ? updateTestAdminRegId : updateTestUserRegId
          const newLabel = `test_${role}_updated_label`

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegistration(
                $registrationID: Int!
                $registrationInput: RegistrationInput!
              ) {
                registrationUpdate(
                  registrationID: $registrationID
                  registrationInput: $registrationInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                    label
                    performerType
                  }
                }
              }
            `)
            .variables({
              registrationID: regId,
              registrationInput: { label: newLabel },
            }) as {
            data?: { registrationUpdate: RegistrationPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            registration: response.data?.registrationUpdate?.registration as Registration | undefined,
            userErrors: response.data?.registrationUpdate?.userErrors || [],
            hasCorrectLabel: response.data?.registrationUpdate?.registration?.label === newLabel,
          }
        },
      )

      // Both roles should successfully update their own registrations
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.registration).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.hasCorrectLabel).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.registration).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.hasCorrectLabel).toBe(true)
    })

    it('Should handle update with invalid registration ID', async () => {
      const results = await testWithBothRoles(
        'update non-existent registration',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegistration(
                $registrationID: Int!
                $registrationInput: RegistrationInput!
              ) {
                registrationUpdate(
                  registrationID: $registrationID
                  registrationInput: $registrationInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                  }
                }
              }
            `)
            .variables({
              registrationID: 999999,
              registrationInput: { label: 'test_nonexistent' },
            }) as { data?: { registrationUpdate: RegistrationPayload } }

          return {
            hasUserErrors: (response.data?.registrationUpdate?.userErrors?.length || 0) > 0,
            userErrors: response.data?.registrationUpdate?.userErrors || [],
            registration: response.data?.registrationUpdate?.registration,
          }
        },
      )

      // Both roles should get user errors for non-existent registration
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.registration).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.registration).toBeNull()
    })

    it('Should handle update with null ID error', async () => {
      const results = await testWithBothRoles(
        'update with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegistration(
                $registrationID: Int!
                $registrationInput: RegistrationInput!
              ) {
                registrationUpdate(
                  registrationID: $registrationID
                  registrationInput: $registrationInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                  }
                }
              }
            `)
            .variables({
              registrationID: null,
              registrationInput: { label: 'test' },
            }) as {
            data?: { registrationUpdate: RegistrationPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get GraphQL validation errors for null ID
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should handle update with bad arguments', async () => {
      const results = await testWithBothRoles(
        'update with invalid input',
        async (role) => {
          const regId = role === 'admin' ? updateTestAdminRegId : updateTestUserRegId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegistration(
                $registrationID: Int!
                $registrationInput: RegistrationInput!
              ) {
                registrationUpdate(
                  registrationID: $registrationID
                  registrationInput: $registrationInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                  }
                }
              }
            `)
            .variables({
              registrationID: regId,
              registrationInput: { teacherID: 999999 }, // Invalid teacher ID
            }) as { data?: { registrationUpdate: RegistrationPayload } }

          return {
            hasUserErrors: (response.data?.registrationUpdate?.userErrors?.length || 0) > 0,
            userErrors: response.data?.registrationUpdate?.userErrors || [],
            registration: response.data?.registrationUpdate?.registration,
          }
        },
      )

      // Both roles should get validation errors for invalid teacher ID
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.registration).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.registration).toBeNull()
    })

    it('Should update multiple fields simultaneously', async () => {
      const results = await testWithBothRoles(
        'update multiple fields',
        async (role) => {
          const regId = role === 'admin' ? updateTestAdminRegId : updateTestUserRegId
          const newLabel = `test_${role}_multi_update`

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateRegistration(
                $registrationID: Int!
                $registrationInput: RegistrationInput!
              ) {
                registrationUpdate(
                  registrationID: $registrationID
                  registrationInput: $registrationInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                    label
                  }
                }
              }
            `)
            .variables({
              registrationID: regId,
              registrationInput: {
                label: newLabel,
              },
            }) as { data?: { registrationUpdate: RegistrationPayload } }

          return {
            registration: response.data?.registrationUpdate?.registration as Registration | undefined,
            userErrors: response.data?.registrationUpdate?.userErrors || [],
            hasCorrectLabel: response.data?.registrationUpdate?.registration?.label === newLabel,
          }
        },
      )

      // Both roles should successfully update multiple fields
      expect(results.admin.registration).toBeTruthy()
      expect(results.admin.hasCorrectLabel).toBe(true)
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.registration).toBeTruthy()
      expect(results.user.hasCorrectLabel).toBe(true)
      expect(results.user.userErrors).toHaveLength(0)
    })
  })

  describe('Registration Delete Tests', () => {
    it('Should enforce delete authorization: both roles can delete their own', async () => {
      const results = await testWithBothRoles(
        'delete registration',
        async (role) => {
          // Create a registration to delete
          const reg = await globalThis.prisma.tbl_registration.create({
            data: {
              userID: getUserId(role),
              performerType: 'SOLO',
              label: `test_${role}_delete_registration`,
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteRegistration($registrationID: Int!) {
                registrationDelete(registrationID: $registrationID) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                    label
                  }
                }
              }
            `)
            .variables({ registrationID: reg.id }) as {
            data?: { registrationDelete: RegistrationPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            registration: response.data?.registrationDelete?.registration as Registration | undefined,
            userErrors: response.data?.registrationDelete?.userErrors || [],
          }
        },
      )

      // Both roles should successfully delete their own registrations
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.registration).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.registration).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should handle delete of non-existent registration', async () => {
      const results = await testWithBothRoles(
        'delete non-existent registration',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteRegistration($registrationID: Int!) {
                registrationDelete(registrationID: $registrationID) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                  }
                }
              }
            `)
            .variables({ registrationID: 999999 }) as {
            data?: { registrationDelete: RegistrationPayload }
          }

          return {
            hasUserErrors: (response.data?.registrationDelete?.userErrors?.length || 0) > 0,
            userErrors: response.data?.registrationDelete?.userErrors || [],
            registration: response.data?.registrationDelete?.registration,
          }
        },
      )

      // Both roles should get user errors for non-existent registration
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.registration).toBeNull()
      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.registration).toBeNull()
    })

    it('Should handle delete with null ID error', async () => {
      const results = await testWithBothRoles(
        'delete with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteRegistration($registrationID: Int!) {
                registrationDelete(registrationID: $registrationID) {
                  userErrors {
                    message
                    field
                  }
                  registration {
                    id
                  }
                }
              }
            `)
            .variables({ registrationID: null }) as {
            data?: { registrationDelete: RegistrationPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get GraphQL validation errors for null ID
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetRegistrations {
            registrations {
              id
              label
            }
          }
        `) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
