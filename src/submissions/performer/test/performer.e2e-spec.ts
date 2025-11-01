import gql from 'graphql-tag'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  Performer,
  PerformerPayload,
} from '../entities/performer.entity'

describe('Performer E2E Tests', () => {
  let adminRegId: number
  let userRegId: number
  let queryPerformerId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error(
        'Test context not initialized. Check integrationTestSetup.',
      )
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_reg_performer.deleteMany({
      where: {
        OR: [
          { firstName: { startsWith: 'test_' } },
          { lastName: { startsWith: 'test_' } },
        ],
      },
    })

    // Create admin registration
    const adminReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.testContext.admin.userId,
        label: 'test_admin_performer_reg',
        performerType: 'SOLO',
      },
    })
    adminRegId = adminReg.id

    // Create user registration
    const userReg = await globalThis.prisma.tbl_registration.create({
      data: {
        userID: globalThis.testContext.user.userId,
        label: 'test_user_performer_reg',
        performerType: 'SOLO',
      },
    })
    userRegId = userReg.id

    // Create a test performer for query tests
    const performer = await globalThis.prisma.tbl_reg_performer.create({
      data: {
        regID: adminRegId,
        firstName: 'test_query',
        lastName: 'performer',
        address: 'Test Address',
      },
    })
    queryPerformerId = performer.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Clean up performers
    await globalThis.prisma.tbl_reg_performer.deleteMany({
      where: {
        OR: [
          { firstName: { startsWith: 'test_' } },
          { lastName: { startsWith: 'test_' } },
        ],
      },
    })

    // Clean up registrations
    if (adminRegId) {
      await globalThis.prisma.tbl_registration.delete({
        where: { id: adminRegId },
      })
    }
    if (userRegId) {
      await globalThis.prisma.tbl_registration.delete({
        where: { id: userRegId },
      })
    }
  })

  describe('Performer Queries', () => {
    it('Should return all performers for admin without registrationID parameter', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetPerformers {
            performers {
              id
              firstName
              lastName
            }
          }
        `)
        .expectNoErrors() as { data: { performers: Performer[] } }

      expect(response.data.performers).toBeDefined()
      expect(Array.isArray(response.data.performers)).toBe(true)
      expect(response.data.performers.length).toBeGreaterThan(0)
    })

    it('Should not return performers for user without registrationID', async () => {
      const response = await createAuthenticatedRequest('user')
        .query(gql`
          query GetPerformers {
            performers {
              id
              firstName
              lastName
            }
          }
        `)

      // Without registrationID, user may not look up performers
      // This is the default behavior when no registrationID is provided
      expect(response.data).toBeFalsy()
    })

    it('Should return filtered performers when user provides registrationID', async () => {
      // First create a performer for the user's registration
      const userPerformer = await globalThis.prisma.tbl_reg_performer.create({
        data: {
          regID: userRegId,
          firstName: 'test_user',
          lastName: 'filtered',
        },
      })

      const response = await createAuthenticatedRequest('user')
        .query(gql`
          query GetPerformers($registrationID: Int!) {
            performers(registrationID: $registrationID) {
              id
              firstName
              lastName
            }
          }
        `, {
          registrationID: userRegId,
        })
        .expectNoErrors() as { data: { performers: Performer[] } }

      expect(response.data.performers).toBeDefined()
      expect(Array.isArray(response.data.performers)).toBe(true)
      expect(
        response.data.performers.some(p => p.id === userPerformer.id),
      ).toBe(true)

      // Clean up
      await globalThis.prisma.tbl_reg_performer.delete({
        where: { id: userPerformer.id },
      })
    })

    it('Should find specific performer by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find performer by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetPerformer($performerId: Int!) {
                performer(performerID: $performerId) {
                  id
                  firstName
                  lastName
                  address
                  registration {
                    id
                    label
                  }
                }
              }
            `, {
              performerId: queryPerformerId,
            })
            .expectNoErrors() as { data: { performer: Performer } }

          return {
            hasData: !!response.data.performer,
            performerId: response.data.performer?.id,
            firstName: response.data.performer?.firstName,
          }
        },
      )

      // Both roles should successfully retrieve the performer
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.performerId).toBe(queryPerformerId)
      expect(results.user.performerId).toBe(queryPerformerId)
      expect(results.admin.firstName).toBe('test_query')
      expect(results.user.firstName).toBe('test_query')
    })

    it('Should return error for non-existent performer for both roles', async () => {
      const results = await testWithBothRoles(
        'query non-existent performer',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetPerformer($performerId: Int!) {
                performer(performerID: $performerId) {
                  id
                  firstName
                  lastName
                }
              }
            `, {
              performerId: 999999,
            }) as { data?: { performer: Performer | null }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            performer: response.data?.performer,
          }
        },
      )

      // Both roles should get errors for non-existent performer
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Performer Create Tests', () => {
    it('Should create performer successfully for both roles', async () => {
      const results = await testWithBothRoles(
        'create performer',
        async (role) => {
          const regId = role === 'admin' ? adminRegId : userRegId
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerCreate($registrationId: Int!) {
                performerCreate(registrationID: $registrationId) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    registration {
                      id
                    }
                  }
                }
              }
            `, {
              registrationId: regId,
            }) as { data?: { performerCreate: PerformerPayload }, errors?: readonly any[] }

          const performerId = response.data?.performerCreate?.performer?.id

          // Clean up
          if (performerId) {
            await globalThis.prisma.tbl_reg_performer.delete({
              where: { id: performerId },
            }).catch(() => {})
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            performer: response.data?.performerCreate?.performer as Performer | undefined,
            userErrors: response.data?.performerCreate?.userErrors,
            performerId,
          }
        },
      )

      // Both roles should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.performer).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.performerId).toBeTypeOf('number')

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.performer).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.performerId).toBeTypeOf('number')
    })

    it('Should create performer with performer input for both roles', async () => {
      const results = await testWithBothRoles(
        'create performer with input',
        async (role) => {
          const regId = role === 'admin' ? adminRegId : userRegId
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerCreate(
                $registrationId: Int!
                $performerInput: PerformerInput
              ) {
                performerCreate(
                  registrationID: $registrationId
                  performerInput: $performerInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              registrationId: regId,
              performerInput: {
                firstName: `test_${role}`,
                lastName: 'performer',
              },
            }) as { data?: { performerCreate: PerformerPayload }, errors?: readonly any[] }

          const performerId = response.data?.performerCreate?.performer?.id

          // Clean up
          if (performerId) {
            await globalThis.prisma.tbl_reg_performer.delete({
              where: { id: performerId },
            }).catch(() => {})
          }

          return {
            hasErrors: !!response.errors,
            performer: response.data?.performerCreate?.performer as Performer | undefined,
            userErrors: response.data?.performerCreate?.userErrors,
            firstName: response.data?.performerCreate?.performer?.firstName,
            lastName: response.data?.performerCreate?.performer?.lastName,
          }
        },
      )

      // Both roles should succeed with correct data
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.firstName).toBe('test_admin')
      expect(results.admin.lastName).toBe('performer')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.firstName).toBe('test_user')
      expect(results.user.lastName).toBe('performer')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return error for invalid registrationID for both roles', async () => {
      const results = await testWithBothRoles(
        'create with invalid registrationID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerCreate(
                $registrationId: Int!
                $performerInput: PerformerInput
              ) {
                performerCreate(
                  registrationID: $registrationId
                  performerInput: $performerInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              registrationId: 999999,
              performerInput: {
                firstName: `test_${role}`,
                lastName: 'invalid',
              },
            }) as { data?: { performerCreate: PerformerPayload }, errors?: readonly any[] }

          return {
            hasUserErrors: (response.data?.performerCreate?.userErrors?.length ?? 0) > 0,
            performer: response.data?.performerCreate?.performer,
            userErrors: response.data?.performerCreate?.userErrors,
          }
        },
      )

      // Both roles should get validation errors
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.performer).toBeNull()

      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.performer).toBeNull()
    })
  })

  describe('Performer Update Tests', () => {
    let updatePerformerId: number

    beforeEach(async () => {
      // Create performer for update tests
      const performer = await globalThis.prisma.tbl_reg_performer.create({
        data: {
          regID: adminRegId,
          firstName: 'test_update',
          lastName: 'performer',
          address: 'Original Address',
        },
      })
      updatePerformerId = performer.id
    })

    afterEach(async () => {
      // Clean up
      if (updatePerformerId) {
        await globalThis.prisma.tbl_reg_performer.delete({
          where: { id: updatePerformerId },
        }).catch(() => {})
      }
    })

    it('Should update performer successfully for both roles', async () => {
      const results = await testWithBothRoles(
        'update performer',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerUpdate(
                $performerId: Int!
                $performerInput: PerformerInput!
              ) {
                performerUpdate(
                  performerID: $performerId
                  performerInput: $performerInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    address
                    firstName
                  }
                }
              }
            `, {
              performerId: updatePerformerId,
              performerInput: {
                address: `Updated by ${role}`,
              },
            }) as { data?: { performerUpdate: PerformerPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            performer: response.data?.performerUpdate?.performer as Performer | undefined,
            userErrors: response.data?.performerUpdate?.userErrors,
            address: response.data?.performerUpdate?.performer?.address,
          }
        },
      )

      // Both roles should succeed (user runs second, so user's update wins)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.address).toBe('Updated by admin')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.address).toBe('Updated by user')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for incorrect performer ID for both roles', async () => {
      const results = await testWithBothRoles(
        'update with invalid ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerUpdate(
                $performerId: Int!
                $performerInput: PerformerInput!
              ) {
                performerUpdate(
                  performerID: $performerId
                  performerInput: $performerInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              performerId: 999999,
              performerInput: {
                lastName: 'Invalid',
              },
            }) as { data?: { performerUpdate: PerformerPayload }, errors?: readonly any[] }

          return {
            hasUserErrors: (response.data?.performerUpdate?.userErrors?.length ?? 0) > 0,
            performer: response.data?.performerUpdate?.performer,
          }
        },
      )

      // Both roles should get validation errors
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.admin.performer).toBeNull()

      expect(results.user.hasUserErrors).toBe(true)
      expect(results.user.performer).toBeNull()
    })

    it('Should return error for missing performer ID for both roles', async () => {
      const results = await testWithBothRoles(
        'update with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerUpdate(
                $performerId: Int!
                $performerInput: PerformerInput!
              ) {
                performerUpdate(
                  performerID: $performerId
                  performerInput: $performerInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              performerId: null,
              performerInput: {
                lastName: 'Test',
              },
            }) as { data?: { performerUpdate: PerformerPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get GraphQL errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should return error for invalid input fields for both roles', async () => {
      const results = await testWithBothRoles(
        'update with invalid fields',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerUpdate(
                $performerId: Int!
                $performerInput: PerformerInput!
              ) {
                performerUpdate(
                  performerID: $performerId
                  performerInput: $performerInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              performerId: updatePerformerId,
              performerInput: {
                invalidField: 'value',
              },
            }) as { data?: { performerUpdate: PerformerPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get GraphQL errors for invalid schema
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Performer Delete Tests', () => {
    let deletePerformerId: number

    beforeEach(async () => {
      // Create performer for delete tests
      const performer = await globalThis.prisma.tbl_reg_performer.create({
        data: {
          regID: adminRegId,
          firstName: 'test_delete',
          lastName: 'performer',
        },
      })
      deletePerformerId = performer.id
    })

    afterEach(async () => {
      // Clean up if delete failed
      if (deletePerformerId) {
        await globalThis.prisma.tbl_reg_performer.delete({
          where: { id: deletePerformerId },
        }).catch(() => {})
      }
    })

    it('Should delete performer successfully: both roles succeed but user runs second', async () => {
      const results = await testWithBothRoles(
        'delete performer',
        async (role) => {
          // User test runs second, need fresh performer
          if (role === 'user') {
            const newPerformer = await globalThis.prisma.tbl_reg_performer.create({
              data: {
                regID: userRegId,
                firstName: 'test_delete_user',
                lastName: 'performer',
              },
            })
            deletePerformerId = newPerformer.id
          }

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerDelete($performerId: Int!) {
                performerDelete(performerID: $performerId) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              performerId: deletePerformerId,
            }) as { data?: { performerDelete: PerformerPayload }, errors?: readonly any[] }

          // Verify deletion
          const deleteCheck = await globalThis.prisma.tbl_reg_performer.findUnique({
            where: { id: deletePerformerId },
          })

          return {
            hasErrors: !!response.errors,
            performer: response.data?.performerDelete?.performer as Performer | undefined,
            userErrors: response.data?.performerDelete?.userErrors,
            wasDeleted: deleteCheck === null,
            lastName: response.data?.performerDelete?.performer?.lastName,
          }
        },
      )

      // Both roles should successfully delete
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.wasDeleted).toBe(true)
      expect(results.admin.lastName).toBe('performer')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.wasDeleted).toBe(true)
      expect(results.user.lastName).toBe('performer')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should return userError for non-existent performer for both roles', async () => {
      const results = await testWithBothRoles(
        'delete non-existent performer',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerDelete($performerId: Int!) {
                performerDelete(performerID: $performerId) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              performerId: 999999,
            })
            .expectNoErrors() as { data: { performerDelete: PerformerPayload } }

          return {
            hasUserErrors: (response.data?.performerDelete?.userErrors?.length ?? 0) > 0,
            performer: response.data?.performerDelete?.performer,
          }
        },
      )

      // Both roles should get validation errors
      expect(results.admin.hasUserErrors).toBe(true)
      expect(results.user.hasUserErrors).toBe(true)
    })

    it('Should return error for missing performer ID for both roles', async () => {
      const results = await testWithBothRoles(
        'delete with null ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation PerformerDelete($performerId: Int!) {
                performerDelete(performerID: $performerId) {
                  userErrors {
                    message
                    field
                  }
                  performer {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              performerId: null,
            }) as { data?: { performerDelete: PerformerPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get GraphQL errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for performer queries', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetPerformers {
            performers {
              id
              firstName
            }
          }
        `) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
