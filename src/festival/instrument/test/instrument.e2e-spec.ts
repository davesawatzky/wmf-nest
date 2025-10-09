import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import { Instrument, InstrumentPayload } from '../entities/instrument.entity'

describe('Instrument E2E Tests', () => {
  let queryTestInstrumentId: number

  // Mock data for testing
  const mockInstrument = {
    name: 'E2E Test Instrument',
    mozart: true,
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_instrument.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })

    // Create a persistent instrument for query tests
    const testInstrument = await globalThis.prisma.tbl_instrument.create({
      data: mockInstrument,
    })
    queryTestInstrumentId = testInstrument.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_instrument.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })
  })

  describe('Instrument Queries (Both Roles)', () => {
    it('Should list all instruments for both roles', async () => {
      const results = await testWithBothRoles(
        'list instruments',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetInstruments {
                instruments {
                  id
                  name
                  mozart
                }
              }
            `)
            .expectNoErrors() as { data: { instruments: Instrument[] } }

          const instruments = response.data.instruments
          const firstInstrument = instruments[0]

          return {
            hasData: !!instruments,
            isArray: Array.isArray(instruments),
            count: instruments?.length || 0,
            hasValidTypes: typeof firstInstrument?.id === 'number'
              && typeof firstInstrument?.name === 'string'
              && typeof firstInstrument?.mozart === 'boolean',
          }
        },
      )

      // Both roles should successfully retrieve instruments
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)
    })

    it('Should validate return types for both roles', async () => {
      const results = await testWithBothRoles(
        'validate types',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetInstruments {
                instruments {
                  id
                  name
                  mozart
                }
              }
            `)
            .expectNoErrors() as { data: { instruments: Instrument[] } }

          const instrument = response.data.instruments[0]

          return {
            hasValidId: typeof instrument.id === 'number',
            hasValidName: typeof instrument.name === 'string',
            hasValidMozart: typeof instrument.mozart === 'boolean',
          }
        },
      )

      // Both roles should get valid types
      expect(results.admin.hasValidId).toBe(true)
      expect(results.admin.hasValidName).toBe(true)
      expect(results.admin.hasValidMozart).toBe(true)
      expect(results.user.hasValidId).toBe(true)
      expect(results.user.hasValidName).toBe(true)
      expect(results.user.hasValidMozart).toBe(true)
    })

    it('Should find specific instrument by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find instrument by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetInstrument($instrumentId: Int!) {
                instrument(id: $instrumentId) {
                  id
                  name
                  mozart
                }
              }
            `)
            .variables({ instrumentId: queryTestInstrumentId })
            .expectNoErrors() as { data: { instrument: Instrument } }

          return {
            hasData: !!response.data.instrument,
            instrument: response.data.instrument,
          }
        },
      )

      // Both roles should find the instrument
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.instrument.name).toBe(mockInstrument.name)
      expect(results.user.instrument.name).toBe(mockInstrument.name)
    })

    it('Should return error when instrument not found for both roles', async () => {
      const results = await testWithBothRoles(
        'instrument not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetInstrument($instrumentId: Int!) {
                instrument(id: $instrumentId) {
                  id
                  name
                  mozart
                }
              }
            `)
            .variables({ instrumentId: 999999 }) as { errors?: readonly any[] }

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

  describe('Instrument Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create instrument',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateInstrument($instrumentInput: InstrumentInput!) {
                instrumentCreate(instrumentInput: $instrumentInput) {
                  userErrors {
                    message
                    field
                  }
                  instrument {
                    id
                    name
                    mozart
                  }
                }
              }
            `, {
              instrumentInput: {
                name: `E2E Test ${role} Instrument Create`,
                mozart: true,
              },
            }) as { data?: { instrumentCreate: InstrumentPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            instrument: response.data?.instrumentCreate?.instrument as Instrument | undefined,
            userErrors: response.data?.instrumentCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.instrument).toBeTruthy()
      expect(results.admin.instrument?.name).toBe('E2E Test admin Instrument Create')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.instrument).toBeUndefined()

      // Cleanup admin's created instrument
      if (results.admin.instrument?.id) {
        await globalThis.prisma.tbl_instrument.delete({
          where: { id: results.admin.instrument.id },
        })
      }
    })

    it('Should return validation error for duplicate instrument name', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
            instrumentCreate(instrumentInput: $instrumentInput) {
              userErrors {
                message
                field
              }
              instrument {
                id
                name
              }
            }
          }
        `, {
          instrumentInput: {
            name: mockInstrument.name, // Duplicate
            mozart: true,
          },
        }) as { data: { instrumentCreate: InstrumentPayload } }

      expect(response.data.instrumentCreate.userErrors).toHaveLength(1)
      expect(response.data.instrumentCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.instrumentCreate.instrument).toBeNull()
    })

    it('Should return error for null name in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
            instrumentCreate(instrumentInput: $instrumentInput) {
              userErrors {
                message
                field
              }
              instrument {
                id
                name
              }
            }
          }
        `, {
          instrumentInput: {
            name: null,
            mozart: true,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      // Create instrument for testing
      const testInstrument = await globalThis.prisma.tbl_instrument.create({
        data: {
          name: 'E2E Test Update Instrument',
          mozart: true,
        },
      })

      const results = await testWithBothRoles(
        'update instrument',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateInstrument(
                $instrumentId: Int!
                $instrumentInput: InstrumentInput!
              ) {
                instrumentUpdate(
                  instrumentID: $instrumentId
                  instrumentInput: $instrumentInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  instrument {
                    id
                    name
                    mozart
                  }
                }
              }
            `, {
              instrumentId: testInstrument.id,
              instrumentInput: {
                name: 'E2E Test Updated Instrument',
                mozart: false,
              },
            }) as { data?: { instrumentUpdate: InstrumentPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            instrument: response.data?.instrumentUpdate?.instrument as Instrument | undefined,
            userErrors: response.data?.instrumentUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.instrument).toBeTruthy()
      expect(results.admin.instrument?.name).toBe('E2E Test Updated Instrument')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.instrument).toBeUndefined()

      // Cleanup
      await globalThis.prisma.tbl_instrument.delete({
        where: { id: testInstrument.id },
      })
    })

    it('Should return error when updating non-existent instrument', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateInstrument(
            $instrumentId: Int!
            $instrumentInput: InstrumentInput!
          ) {
            instrumentUpdate(
              instrumentID: $instrumentId
              instrumentInput: $instrumentInput
            ) {
              userErrors {
                message
                field
              }
              instrument {
                id
                name
              }
            }
          }
        `, {
          instrumentId: 999999,
          instrumentInput: {
            name: 'Non-existent Instrument',
            mozart: true,
          },
        }) as { data: { instrumentUpdate: InstrumentPayload } }

      expect(response.data.instrumentUpdate.instrument).toBeNull()
      expect(response.data.instrumentUpdate.userErrors).toHaveLength(1)
      expect(response.data.instrumentUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Should return error for null name in update', async () => {
      // Create instrument for testing
      const testInstrument = await globalThis.prisma.tbl_instrument.create({
        data: {
          name: 'E2E Test Null Update Instrument',
          mozart: true,
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateInstrument(
            $instrumentId: Int!
            $instrumentInput: InstrumentInput!
          ) {
            instrumentUpdate(
              instrumentID: $instrumentId
              instrumentInput: $instrumentInput
            ) {
              userErrors {
                message
                field
              }
              instrument {
                id
                name
              }
            }
          }
        `, {
          instrumentId: testInstrument.id,
          instrumentInput: {
            name: null,
            mozart: true,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()

      // Cleanup
      await globalThis.prisma.tbl_instrument.delete({
        where: { id: testInstrument.id },
      })
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create instruments for both roles to attempt deletion
      const adminInstrument = await globalThis.prisma.tbl_instrument.create({
        data: {
          name: 'E2E Test Delete Admin Instrument',
          mozart: true,
        },
      })

      const userInstrument = await globalThis.prisma.tbl_instrument.create({
        data: {
          name: 'E2E Test Delete User Instrument',
          mozart: true,
        },
      })

      const results = await testWithBothRoles(
        'delete instrument',
        async (role) => {
          const instrumentId = role === 'admin' ? adminInstrument.id : userInstrument.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteInstrument($instrumentDeleteId: Int!) {
                instrumentDelete(instrumentID: $instrumentDeleteId) {
                  userErrors {
                    message
                    field
                  }
                  instrument {
                    id
                    name
                    mozart
                  }
                }
              }
            `, {
              instrumentDeleteId: instrumentId,
            }) as { data?: { instrumentDelete: InstrumentPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            instrument: response.data?.instrumentDelete?.instrument as Instrument | undefined,
            userErrors: response.data?.instrumentDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.instrument).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.instrument).toBeTruthy()
      expect(results.admin.instrument?.name).toBe('E2E Test Delete Admin Instrument')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's instrument was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_instrument.findUnique({
        where: { id: adminInstrument.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's instrument (wasn't deleted)
      await globalThis.prisma.tbl_instrument.delete({
        where: { id: userInstrument.id },
      })
    })

    it('Should return error when deleting non-existent instrument', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteInstrument($instrumentDeleteId: Int!) {
            instrumentDelete(instrumentID: $instrumentDeleteId) {
              userErrors {
                message
                field
              }
              instrument {
                id
                name
              }
            }
          }
        `, {
          instrumentDeleteId: 999999,
        }) as { data: { instrumentDelete: InstrumentPayload } }

      expect(response.data.instrumentDelete.instrument).toBeNull()
      expect(response.data.instrumentDelete.userErrors).toHaveLength(1)
      expect(response.data.instrumentDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for mutations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
            instrumentCreate(instrumentInput: $instrumentInput) {
              userErrors {
                message
                field
              }
              instrument {
                id
                name
              }
            }
          }
        `, {
          instrumentInput: {
            name: 'Test',
            mozart: true,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
