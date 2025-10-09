import gql from 'graphql-tag'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  getUserId,
  testWithBothRoles,
} from '@/test/testHelpers'
import { User, UserPayload } from '../entities/user.entity'

describe('User E2E Tests', () => {
  let testUserId: number
  let testUserEmail: string

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test user
    await globalThis.prisma.tbl_user.deleteMany({
      where: { email: 'test_user_for_tests@test.com' },
    })

    // Create a separate test user (not admin, not the authenticated user)
    const testUser = await globalThis.prisma.tbl_user.create({
      data: {
        email: 'test_user_for_tests@test.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'password',
        privateTeacher: false,
        schoolTeacher: false,
        instrument: null,
        address: null,
        city: null,
        province: null,
        postalCode: null,
        phone: null,
        emailConfirmed: true,
        isActive: true,
        roles: ['user'],
        permissions: [],
      },
    })
    testUserId = testUser.id
    testUserEmail = testUser.email
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Clean up test user and any test data
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        OR: [
          { email: { startsWith: 'test_delete_' } },
          { email: 'test_user_for_tests@test.com' },
        ],
      },
    })
  })

  describe('User Queries', () => {
    it('Should enforce list authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'list users',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetUsers {
                users {
                  id
                  email
                  firstName
                  lastName
                  privateTeacher
                  schoolTeacher
                  instrument
                  address
                  city
                  province
                  postalCode
                  phone
                  emailConfirmed
                  isActive
                  roles
                  permissions
                }
              }
            `) as { data?: { users: User[] }, errors?: readonly any[] }

          const users = response.data?.users
          const firstUser = users?.[0]

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!users,
            isArray: Array.isArray(users),
            count: users?.length || 0,
            hasRoles: firstUser?.roles && Array.isArray(firstUser.roles),
            hasPermissions: firstUser?.permissions && Array.isArray(firstUser.permissions),
          }
        },
      )

      // Admin should successfully retrieve users
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.admin.hasRoles).toBe(true)
      expect(results.admin.hasPermissions).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)

      // User should be forbidden (admin-only query)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should enforce list with registrations authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'list users with registrations',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetUsers {
                users {
                  id
                  email
                  firstName
                  lastName
                  registrations {
                    id
                    label
                  }
                }
              }
            `) as { data?: { users: User[] }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            hasData: !!response.data?.users,
            hasRegistrations: response.data?.users?.some(u => u.registrations && u.registrations.length > 0) || false,
          }
        },
      )

      // Admin should successfully retrieve users with registrations
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.hasData).toBe(true)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should return current user details (myUser) for both roles', async () => {
      const results = await testWithBothRoles(
        'get my user details',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetMyUser {
                myUser {
                  id
                  firstName
                  lastName
                  email
                }
              }
            `)
            .expectNoErrors() as { data: { myUser: User } }

          return {
            found: !!response.data.myUser,
            data: response.data.myUser as User | undefined,
          }
        },
      )

      // Both roles should retrieve their own user details
      expect(results.admin.found).toBe(true)
      expect(results.admin.data).toBeTruthy()
      expect(results.admin.data?.id).toBeTruthy()
      expect(results.user.found).toBe(true)
      expect(results.user.data).toBeTruthy()
      expect(results.user.data?.id).toBeTruthy()

      // Each should get their own user details (different IDs)
      expect(results.admin.data?.id).not.toBe(results.user.data?.id)
    })

    it('Should enforce find by ID authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'find user by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetUser($userId: Int!) {
                user(userID: $userId) {
                  id
                  firstName
                  lastName
                }
              }
            `, {
              userId: testUserId,
            }) as { data?: { user: User }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            found: !!response.data?.user,
            data: response.data?.user,
          }
        },
      )

      // Admin should find the user
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.found).toBe(true)
      expect(results.admin.data?.id).toBe(testUserId)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should enforce find with registrations by ID authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'find user with registrations',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetUser($userId: Int!) {
                user(userID: $userId) {
                  id
                  firstName
                  lastName
                  registrations {
                    id
                    label
                  }
                }
              }
            `, {
              userId: testUserId,
            }) as { data?: { user: User }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            found: !!response.data?.user,
            hasRegistrations: !!response.data?.user?.registrations,
          }
        },
      )

      // Admin should find the user
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.found).toBe(true)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should enforce find by email authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'find user by email',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetUser($email: String!) {
                user(email: $email) {
                  id
                  firstName
                  lastName
                  email
                }
              }
            `, {
              email: testUserEmail,
            }) as { data?: { user: User }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            found: !!response.data?.user,
            data: response.data?.user,
          }
        },
      )

      // Admin should find the user by email
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.found).toBe(true)
      expect(results.admin.data?.email).toBe(testUserEmail)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
    })
  })

  describe('User Mutations', () => {
    it('Should enforce update authorization: both admin and user can update', async () => {
      const results = await testWithBothRoles(
        'update user',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UserUpdate($userId: Int!, $userInput: UserInput!) {
                userUpdate(userID: $userId, userInput: $userInput) {
                  user {
                    id
                    firstName
                    lastName
                  }
                  userErrors {
                    message
                    field
                  }
                }
              }
            `, {
              userId: testUserId,
              userInput: {
                firstName: `Updated${role}FirstName`,
                lastName: `Updated${role}LastName`,
              },
            }) as { data?: { userUpdate: UserPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            user: response.data?.userUpdate?.user as User | undefined,
            userErrors: response.data?.userUpdate?.userErrors,
          }
        },
      )

      // Both admin and user should succeed (both have Update permission on User)
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.user).toBeTruthy()
      expect(results.admin.user?.firstName).toBe('UpdatedadminFirstName')
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.user).toBeTruthy()
      expect(results.user.user?.firstName).toBe('UpdateduserFirstName')
      expect(results.user.userErrors).toHaveLength(0)
    })

    it('Should handle update of non-existent user: both roles get userError', async () => {
      const results = await testWithBothRoles(
        'update non-existent user',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UserUpdate($userId: Int!, $userInput: UserInput!) {
                userUpdate(userID: $userId, userInput: $userInput) {
                  userErrors {
                    message
                    field
                  }
                  user {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              userId: 99999,
              userInput: {
                firstName: 'UpdatedFirstName',
                lastName: 'UpdatedLastName',
              },
            }) as { data?: { userUpdate: UserPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            user: response.data?.userUpdate?.user as User | undefined,
            userErrors: response.data?.userUpdate?.userErrors,
          }
        },
      )

      // Both roles are authorized but should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.user).toBeNull()

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.userErrors).toBeDefined()
      expect(results.user.userErrors!.length).toBeGreaterThan(0)
      expect(results.user.user).toBeNull()
    })

    it('Should successfully update user fields: both roles can update their own account', async () => {
      const results = await testWithBothRoles(
        'update user successfully',
        async (role) => {
          // Each role updates their own account
          const currentUserId = getUserId(role)

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UserUpdate($userId: Int!, $userInput: UserInput!) {
                userUpdate(userID: $userId, userInput: $userInput) {
                  userErrors {
                    message
                    field
                  }
                  user {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `, {
              userId: currentUserId,
              userInput: {
                // Note: email cannot be updated via UserInput
                firstName: 'UpdatedFirstName',
                lastName: 'UpdatedLastName',
              },
            }) as { data?: { userUpdate: UserPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            user: response.data?.userUpdate?.user,
            userErrors: response.data?.userUpdate?.userErrors,
          }
        },
      )

      // Both roles should successfully update their own account
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.user).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.user).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
    })
  })

  describe('User Delete Tests', () => {
    let deleteTestUserId: number

    beforeEach(async () => {
      // Create a user for deletion
      const newUser = await globalThis.prisma.tbl_user.create({
        data: {
          email: `test_delete_${Date.now()}@test.com`,
          firstName: 'User',
          lastName: 'Delete',
          password: 'password',
          privateTeacher: false,
          schoolTeacher: false,
          roles: ['user'],
        },
      })
      deleteTestUserId = newUser.id
    })

    afterEach(async () => {
      // Clean up if deletion test failed
      if (deleteTestUserId) {
        await globalThis.prisma.tbl_user
          .delete({
            where: { id: deleteTestUserId },
          })
          .catch(() => {}) // Ignore errors if already deleted
      }
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'delete user',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UserDelete($userId: Int!) {
                userDelete(userID: $userId) {
                  user {
                    id
                    firstName
                    lastName
                  }
                  userErrors {
                    message
                    field
                  }
                }
              }
            `, {
              userId: deleteTestUserId,
            }) as { data?: { userDelete: UserPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            user: response.data?.userDelete?.user as User | undefined,
            userErrors: response.data?.userDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (no Delete permission)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.user).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.user).toBeTruthy()
      expect(results.admin.user?.id).toBe(deleteTestUserId)
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify the user was actually deleted
      const deletedUser = await globalThis.prisma.tbl_user.findUnique({
        where: { id: deleteTestUserId },
      })
      expect(deletedUser).toBeNull()

      deleteTestUserId = undefined // Prevent cleanup attempt
    })

    it('Should handle delete of non-existent user: admin gets userError, user forbidden', async () => {
      const results = await testWithBothRoles(
        'delete non-existent user',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UserDelete($userId: Int!) {
                userDelete(userID: $userId) {
                  user {
                    id
                    firstName
                    lastName
                  }
                  userErrors {
                    message
                    field
                  }
                }
              }
            `, {
              userId: 99999,
            }) as { data?: { userDelete: UserPayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            user: response.data?.userDelete?.user as User | undefined,
            userErrors: response.data?.userDelete?.userErrors,
          }
        },
      )

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)

      // Admin is authorized but should get userError
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.userErrors).toBeDefined()
      expect(results.admin.userErrors!.length).toBeGreaterThan(0)
      expect(results.admin.user).toBeNull()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetUsers {
            users {
              id
              firstName
              lastName
            }
          }
        `) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
