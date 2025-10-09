import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import {
  Teacher,
  TeacherPayload,
} from '../entities/teacher.entity'

describe('Teacher E2E Tests', () => {
  let testAdminPrivateTeacherId: number
  let testUserPrivateTeacherId: number

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test teacher data
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        OR: [
          { email: { startsWith: 'test_teacher_' } },
          { firstName: 'TestTeacher' },
        ],
      },
    })

    // Create test private teachers for both roles
    const adminPrivateTeacher = await globalThis.prisma.tbl_user.create({
      data: {
        email: 'test_teacher_admin_private@test.com',
        firstName: 'TestTeacher',
        lastName: 'AdminPrivate',
        privateTeacher: true,
        schoolTeacher: false,
        instrument: 'Piano',
        phone: '204-555-1001',
        address: '123 Admin St',
        city: 'Winnipeg',
        province: 'MB',
        postalCode: 'R3C 1A1',
      },
    })
    testAdminPrivateTeacherId = adminPrivateTeacher.id

    const userPrivateTeacher = await globalThis.prisma.tbl_user.create({
      data: {
        email: 'test_teacher_user_private@test.com',
        firstName: 'TestTeacher',
        lastName: 'UserPrivate',
        privateTeacher: true,
        schoolTeacher: false,
        instrument: 'Voice',
        phone: '204-555-1002',
        address: '456 User Ave',
        city: 'Winnipeg',
        province: 'MB',
        postalCode: 'R3C 2B2',
      },
    })
    testUserPrivateTeacherId = userPrivateTeacher.id

    // Create test school teachers for both roles
    const adminSchoolTeacher = await globalThis.prisma.tbl_user.create({
      data: {
        email: 'test_teacher_admin_school@test.com',
        firstName: 'TestTeacher',
        lastName: 'AdminSchool',
        privateTeacher: false,
        schoolTeacher: true,
        instrument: 'Guitar',
        phone: '204-555-1003',
        address: '789 School Rd',
        city: 'Winnipeg',
        province: 'MB',
        postalCode: 'R3C 3C3',
      },
    })
    // Store for potential cleanup
    void adminSchoolTeacher.id

    const userSchoolTeacher = await globalThis.prisma.tbl_user.create({
      data: {
        email: 'test_teacher_user_school@test.com',
        firstName: 'TestTeacher',
        lastName: 'UserSchool',
        privateTeacher: false,
        schoolTeacher: true,
        instrument: 'Violin',
        phone: '204-555-1004',
        address: '321 Teacher Blvd',
        city: 'Winnipeg',
        province: 'MB',
        postalCode: 'R3C 4D4',
      },
    })
    // Store for potential cleanup
    void userSchoolTeacher.id
  }, 30000)

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_user.deleteMany({
      where: {
        OR: [
          { email: { startsWith: 'test_teacher_' } },
          { firstName: 'TestTeacher' },
        ],
      },
    })
  })

  describe('Teacher Queries', () => {
    it('Should list all private teachers for both roles', async () => {
      const results = await testWithBothRoles(
        'list private teachers',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTeachers($teacherType: String!) {
                teachers(teacherType: $teacherType) {
                  id
                  firstName
                  lastName
                  email
                  instrument
                  privateTeacher
                  schoolTeacher
                }
              }
            `)
            .variables({ teacherType: 'privateTeacher' })
            .expectNoErrors() as { data: { teachers: Teacher[] } }

          return {
            hasData: !!response.data.teachers,
            count: response.data.teachers?.length || 0,
            containsTestTeacher: response.data.teachers?.some(
              (t: Teacher) => t.firstName === 'TestTeacher',
            ),
            hasUnlistedTeacher: response.data.teachers?.some(
              (t: Teacher) => t.lastName === 'Unlisted',
            ),
          }
        },
      )

      // Both roles should successfully retrieve private teachers
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(2)
      expect(results.admin.containsTestTeacher).toBe(true)
      expect(results.admin.hasUnlistedTeacher).toBe(true)

      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBeGreaterThanOrEqual(2)
      expect(results.user.containsTestTeacher).toBe(true)
      expect(results.user.hasUnlistedTeacher).toBe(true)
    })

    it('Should list all school teachers for both roles', async () => {
      const results = await testWithBothRoles(
        'list school teachers',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTeachers($teacherType: String!) {
                teachers(teacherType: $teacherType) {
                  id
                  firstName
                  lastName
                  email
                  privateTeacher
                  schoolTeacher
                }
              }
            `)
            .variables({ teacherType: 'schoolTeacher' })
            .expectNoErrors() as { data: { teachers: Teacher[] } }

          return {
            hasData: !!response.data.teachers,
            count: response.data.teachers?.length || 0,
            containsTestTeacher: response.data.teachers?.some(
              (t: Teacher) => t.firstName === 'TestTeacher',
            ),
          }
        },
      )

      // Both roles should successfully retrieve school teachers
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThanOrEqual(2)
      expect(results.admin.containsTestTeacher).toBe(true)

      expect(results.user.hasData).toBe(true)
      expect(results.user.count).toBeGreaterThanOrEqual(2)
      expect(results.user.containsTestTeacher).toBe(true)
    })

    it('Should find specific teacher by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find teacher by ID',
        async (role) => {
          const teacherId = role === 'admin' ? testAdminPrivateTeacherId : testUserPrivateTeacherId

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTeacher($teacherID: Int) {
                teacher(teacherID: $teacherID) {
                  id
                  firstName
                  lastName
                  email
                  instrument
                  privateTeacher
                  schoolTeacher
                }
              }
            `)
            .variables({ teacherID: teacherId })
            .expectNoErrors() as { data: { teacher: Teacher } }

          return {
            hasData: !!response.data.teacher,
            teacher: response.data.teacher,
            correctId: response.data.teacher?.id === teacherId,
          }
        },
      )

      // Both roles should successfully retrieve their teacher
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.correctId).toBe(true)
      expect(results.admin.teacher?.firstName).toBe('TestTeacher')
      expect(results.admin.teacher?.lastName).toBe('AdminPrivate')

      expect(results.user.hasData).toBe(true)
      expect(results.user.correctId).toBe(true)
      expect(results.user.teacher?.firstName).toBe('TestTeacher')
      expect(results.user.teacher?.lastName).toBe('UserPrivate')
    })

    it('Should find specific teacher by email for both roles', async () => {
      const results = await testWithBothRoles(
        'find teacher by email',
        async (role) => {
          const teacherEmail = role === 'admin'
            ? 'test_teacher_admin_private@test.com'
            : 'test_teacher_user_private@test.com'

          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTeacher($teacherEmail: String) {
                teacher(teacherEmail: $teacherEmail) {
                  id
                  firstName
                  lastName
                  email
                }
              }
            `)
            .variables({ teacherEmail })
            .expectNoErrors() as { data: { teacher: Teacher } }

          return {
            hasData: !!response.data.teacher,
            teacher: response.data.teacher,
            correctEmail: response.data.teacher?.email === teacherEmail,
          }
        },
      )

      // Both roles should successfully retrieve teacher by email
      expect(results.admin.hasData).toBe(true)
      expect(results.admin.correctEmail).toBe(true)
      expect(results.admin.teacher?.firstName).toBe('TestTeacher')

      expect(results.user.hasData).toBe(true)
      expect(results.user.correctEmail).toBe(true)
      expect(results.user.teacher?.firstName).toBe('TestTeacher')
    })

    it('Should return null for non-existent teacher', async () => {
      const results = await testWithBothRoles(
        'find non-existent teacher',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTeacher($teacherID: Int) {
                teacher(teacherID: $teacherID) {
                  id
                  firstName
                }
              }
            `)
            .variables({ teacherID: 999999 }) as {
            data?: { teacher: Teacher }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            errorMessage: response.errors?.[0]?.message,
          }
        },
      )

      // Both roles should get errors for non-existent teacher
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.errorMessage).toBe(undefined)

      expect(results.user.hasErrors).toBe(false)
      expect(results.user.errorMessage).toBe(undefined)
    })

    it('Should require teacher type for teachers query', async () => {
      const results = await testWithBothRoles(
        'teachers query without type',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetTeachers($teacherType: String!) {
                teachers(teacherType: $teacherType) {
                  id
                }
              }
            `)
            .variables({ teacherType: null }) as {
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
          }
        },
      )

      // Both roles should get validation errors
      expect(results.admin.hasErrors).toBe(true)
      expect(results.user.hasErrors).toBe(true)
    })

    it('Should return correct data types for teacher fields', async () => {
      const response = await createAuthenticatedRequest('admin')
        .query(gql`
          query GetTeachers($teacherType: String!) {
            teachers(teacherType: $teacherType) {
              id
              firstName
              lastName
              email
              instrument
              phone
              address
              city
              province
              postalCode
            }
          }
        `)
        .variables({ teacherType: 'privateTeacher' })
        .expectNoErrors() as { data: { teachers: Teacher[] } }

      const firstTeacher = response.data.teachers.find(
        t => t.firstName === 'TestTeacher',
      )
      expect(firstTeacher).toBeTruthy()
      expect(typeof firstTeacher!.id).toBe('number')

      // Optional string fields
      if (firstTeacher!.firstName) {
        expect(typeof firstTeacher!.firstName).toBe('string')
      }
      if (firstTeacher!.email) {
        expect(typeof firstTeacher!.email).toBe('string')
      }
    })
  })

  describe('Teacher Create Tests', () => {
    it('Should enforce create authorization: both roles can create', async () => {
      const results = await testWithBothRoles(
        'create teacher',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateTeacher(
                $privateTeacher: Boolean!
                $schoolTeacher: Boolean!
                $teacherInput: TeacherInput!
              ) {
                teacherCreate(
                  privateTeacher: $privateTeacher
                  schoolTeacher: $schoolTeacher
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                    firstName
                    lastName
                    email
                    privateTeacher
                    schoolTeacher
                  }
                }
              }
            `)
            .variables({
              privateTeacher: true,
              schoolTeacher: false,
              teacherInput: {
                firstName: 'TestTeacher',
                lastName: `CreateTest${role}`,
                email: `test_teacher_create_${role}@test.com`,
                instrument: 'Piano',
              },
            }) as {
            data?: { teacherCreate: TeacherPayload }
            errors?: readonly any[]
          }

          // Clean up created teacher
          if (response.data?.teacherCreate?.teacher?.id) {
            await globalThis.prisma.tbl_user.delete({
              where: { id: response.data.teacherCreate.teacher.id },
            })
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            teacher: response.data?.teacherCreate?.teacher as Teacher | undefined,
            userErrors: response.data?.teacherCreate?.userErrors || [],
          }
        },
      )

      // Both roles should successfully create teachers
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.teacher).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.teacher?.privateTeacher).toBe(true)
      expect(results.admin.teacher?.schoolTeacher).toBe(false)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.teacher).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.teacher?.privateTeacher).toBe(true)
      expect(results.user.teacher?.schoolTeacher).toBe(false)
    })

    it('Should create school teacher for both roles', async () => {
      const results = await testWithBothRoles(
        'create school teacher',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateTeacher(
                $privateTeacher: Boolean!
                $schoolTeacher: Boolean!
                $teacherInput: TeacherInput!
              ) {
                teacherCreate(
                  privateTeacher: $privateTeacher
                  schoolTeacher: $schoolTeacher
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                    firstName
                    lastName
                    privateTeacher
                    schoolTeacher
                  }
                }
              }
            `)
            .variables({
              privateTeacher: false,
              schoolTeacher: true,
              teacherInput: {
                firstName: 'TestTeacher',
                lastName: `SchoolTest${role}`,
                email: `test_teacher_school_${role}@test.com`,
                instrument: 'Voice',
              },
            }) as { data?: { teacherCreate: TeacherPayload } }

          // Clean up
          if (response.data?.teacherCreate?.teacher?.id) {
            await globalThis.prisma.tbl_user.delete({
              where: { id: response.data.teacherCreate.teacher.id },
            })
          }

          return {
            teacher: response.data?.teacherCreate?.teacher as Teacher | undefined,
            userErrors: response.data?.teacherCreate?.userErrors || [],
          }
        },
      )

      // Both roles should create school teachers
      expect(results.admin.teacher).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.teacher?.privateTeacher).toBe(false)
      expect(results.admin.teacher?.schoolTeacher).toBe(true)

      expect(results.user.teacher).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.teacher?.privateTeacher).toBe(false)
      expect(results.user.teacher?.schoolTeacher).toBe(true)
    })

    it('Should require at least one teacher type', async () => {
      const results = await testWithBothRoles(
        'create without teacher type',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateTeacher(
                $privateTeacher: Boolean!
                $schoolTeacher: Boolean!
                $teacherInput: TeacherInput!
              ) {
                teacherCreate(
                  privateTeacher: $privateTeacher
                  schoolTeacher: $schoolTeacher
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                  }
                }
              }
            `)
            .variables({
              privateTeacher: false,
              schoolTeacher: false,
              teacherInput: {
                firstName: 'TestTeacher',
                lastName: 'NoType',
                email: `test_teacher_notype_${role}@test.com`,
              },
            }) as { data?: { teacherCreate: TeacherPayload } }

          return {
            userErrors: response.data?.teacherCreate?.userErrors || [],
            teacher: response.data?.teacherCreate?.teacher,
            hasTypeError: response.data?.teacherCreate?.userErrors?.some(
              e => e.message.includes('Must specify either private teacher or school teacher'),
            ),
          }
        },
      )

      // Both roles should get validation errors
      expect(results.admin.userErrors.length).toBeGreaterThan(0)
      expect(results.admin.hasTypeError).toBe(true)
      expect(results.admin.teacher).toBeNull()

      expect(results.user.userErrors.length).toBeGreaterThan(0)
      expect(results.user.hasTypeError).toBe(true)
      expect(results.user.teacher).toBeNull()
    })

    it('Should handle duplicate email error', async () => {
      const results = await testWithBothRoles(
        'create with duplicate email',
        async (role) => {
          const existingEmail = role === 'admin'
            ? 'test_teacher_admin_private@test.com'
            : 'test_teacher_user_private@test.com'

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateTeacher(
                $privateTeacher: Boolean!
                $schoolTeacher: Boolean!
                $teacherInput: TeacherInput!
              ) {
                teacherCreate(
                  privateTeacher: $privateTeacher
                  schoolTeacher: $schoolTeacher
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                  }
                }
              }
            `)
            .variables({
              privateTeacher: true,
              schoolTeacher: false,
              teacherInput: {
                firstName: 'TestTeacher',
                lastName: 'Duplicate',
                email: existingEmail,
              },
            }) as { data?: { teacherCreate: TeacherPayload } }

          return {
            userErrors: response.data?.teacherCreate?.userErrors || [],
            teacher: response.data?.teacherCreate?.teacher,
            hasEmailError: response.data?.teacherCreate?.userErrors?.some(
              e => e.message.includes('Email address is already taken'),
            ),
          }
        },
      )

      // Both roles should get unique constraint errors
      expect(results.admin.userErrors.length).toBeGreaterThan(0)
      expect(results.admin.hasEmailError).toBe(true)
      expect(results.admin.teacher).toBeNull()

      expect(results.user.userErrors.length).toBeGreaterThan(0)
      expect(results.user.hasEmailError).toBe(true)
      expect(results.user.teacher).toBeNull()
    })
  })

  describe('Teacher Update Tests', () => {
    let updateTestAdminTeacherId: number
    let updateTestUserTeacherId: number

    beforeAll(async () => {
      // Create teachers for update tests
      const adminTeacher = await globalThis.prisma.tbl_user.create({
        data: {
          email: 'test_teacher_update_admin@test.com',
          firstName: 'TestTeacher',
          lastName: 'UpdateAdmin',
          privateTeacher: true,
          schoolTeacher: false,
          instrument: 'Piano',
        },
      })
      updateTestAdminTeacherId = adminTeacher.id

      const userTeacher = await globalThis.prisma.tbl_user.create({
        data: {
          email: 'test_teacher_update_user@test.com',
          firstName: 'TestTeacher',
          lastName: 'UpdateUser',
          privateTeacher: true,
          schoolTeacher: false,
          instrument: 'Voice',
        },
      })
      updateTestUserTeacherId = userTeacher.id
    })

    afterAll(async () => {
      // Clean up update test teachers
      const idsToDelete = [updateTestAdminTeacherId, updateTestUserTeacherId].filter(
        id => id !== undefined,
      )
      if (idsToDelete.length > 0) {
        await globalThis.prisma.tbl_user.deleteMany({
          where: { id: { in: idsToDelete } },
        })
      }
    })

    it('Should successfully update teacher for both roles', async () => {
      const results = await testWithBothRoles(
        'update teacher',
        async (role) => {
          const teacherId = role === 'admin' ? updateTestAdminTeacherId : updateTestUserTeacherId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateTeacher(
                $teacherID: Int!
                $teacherInput: TeacherInput!
              ) {
                teacherUpdate(
                  teacherID: $teacherID
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                    firstName
                    lastName
                    instrument
                    phone
                  }
                }
              }
            `)
            .variables({
              teacherID: teacherId,
              teacherInput: {
                firstName: `Updated${role}`,
                lastName: 'UpdatedTeacher',
                instrument: 'Guitar',
                phone: '204-555-9999',
              },
            }) as {
            data?: { teacherUpdate: TeacherPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            teacher: response.data?.teacherUpdate?.teacher as Teacher | undefined,
            userErrors: response.data?.teacherUpdate?.userErrors || [],
            hasCorrectUpdates:
              response.data?.teacherUpdate?.teacher?.firstName === `Updated${role}`
              && response.data?.teacherUpdate?.teacher?.instrument === 'Guitar',
          }
        },
      )

      // Both roles should successfully update
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.teacher).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.hasCorrectUpdates).toBe(true)

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.teacher).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.hasCorrectUpdates).toBe(true)
    })

    it('Should update partial fields for both roles', async () => {
      const results = await testWithBothRoles(
        'update partial fields',
        async (role) => {
          const teacherId = role === 'admin' ? updateTestAdminTeacherId : updateTestUserTeacherId

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateTeacher(
                $teacherID: Int!
                $teacherInput: TeacherInput!
              ) {
                teacherUpdate(
                  teacherID: $teacherID
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                    city
                    province
                  }
                }
              }
            `)
            .variables({
              teacherID: teacherId,
              teacherInput: {
                city: 'Brandon',
                province: 'MB',
              },
            }) as { data?: { teacherUpdate: TeacherPayload } }

          return {
            userErrors: response.data?.teacherUpdate?.userErrors || [],
            city: response.data?.teacherUpdate?.teacher?.city,
            province: response.data?.teacherUpdate?.teacher?.province,
          }
        },
      )

      // Both roles should update partial fields
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.city).toBe('Brandon')
      expect(results.admin.province).toBe('MB')

      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.city).toBe('Brandon')
      expect(results.user.province).toBe('MB')
    })

    it('Should handle update with invalid teacher ID', async () => {
      const results = await testWithBothRoles(
        'update non-existent teacher',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateTeacher(
                $teacherID: Int!
                $teacherInput: TeacherInput!
              ) {
                teacherUpdate(
                  teacherID: $teacherID
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                  }
                }
              }
            `)
            .variables({
              teacherID: 999999,
              teacherInput: {
                firstName: 'NonExistent',
              },
            }) as { data?: { teacherUpdate: TeacherPayload } }

          return {
            userErrors: response.data?.teacherUpdate?.userErrors || [],
            teacher: response.data?.teacherUpdate?.teacher,
            hasNotFoundError: response.data?.teacherUpdate?.userErrors?.some(
              e => e.message.includes('Teacher not found'),
            ),
          }
        },
      )

      // Both roles should get not found errors
      expect(results.admin.userErrors.length).toBeGreaterThan(0)
      expect(results.admin.hasNotFoundError).toBe(true)
      expect(results.admin.teacher).toBeNull()

      expect(results.user.userErrors.length).toBeGreaterThan(0)
      expect(results.user.hasNotFoundError).toBe(true)
      expect(results.user.teacher).toBeNull()
    })
  })

  describe('Teacher Delete Tests', () => {
    it('Should enforce delete authorization: both roles can delete', async () => {
      const results = await testWithBothRoles(
        'delete teacher',
        async (role) => {
          // Create a teacher to delete
          const testTeacher = await globalThis.prisma.tbl_user.create({
            data: {
              email: `test_teacher_delete_${role}@test.com`,
              firstName: 'TestTeacher',
              lastName: `Delete${role}`,
              privateTeacher: true,
              schoolTeacher: false,
            },
          })

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteTeacher($teacherID: Int!) {
                teacherDelete(teacherID: $teacherID) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                    firstName
                    lastName
                  }
                }
              }
            `)
            .variables({ teacherID: testTeacher.id }) as {
            data?: { teacherDelete: TeacherPayload }
            errors?: readonly any[]
          }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            teacher: response.data?.teacherDelete?.teacher as Teacher | undefined,
            userErrors: response.data?.teacherDelete?.userErrors || [],
          }
        },
      )

      // Both roles should successfully delete
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.teacher).toBeTruthy()
      expect(results.admin.userErrors).toHaveLength(0)
      expect(results.admin.teacher?.lastName).toBe('Deleteadmin')

      expect(results.user.isAuthorized).toBe(true)
      expect(results.user.hasErrors).toBe(false)
      expect(results.user.teacher).toBeTruthy()
      expect(results.user.userErrors).toHaveLength(0)
      expect(results.user.teacher?.lastName).toBe('Deleteuser')
    })

    it('Should handle delete of non-existent teacher', async () => {
      const results = await testWithBothRoles(
        'delete non-existent teacher',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteTeacher($teacherID: Int!) {
                teacherDelete(teacherID: $teacherID) {
                  userErrors {
                    message
                    field
                  }
                  teacher {
                    id
                  }
                }
              }
            `)
            .variables({ teacherID: 999999 }) as {
            data?: { teacherDelete: TeacherPayload }
          }

          return {
            userErrors: response.data?.teacherDelete?.userErrors || [],
            teacher: response.data?.teacherDelete?.teacher,
            hasNotFoundError: response.data?.teacherDelete?.userErrors?.some(
              e => e.message.includes('Teacher not found'),
            ),
          }
        },
      )

      // Both roles should get not found errors
      expect(results.admin.userErrors.length).toBeGreaterThan(0)
      expect(results.admin.hasNotFoundError).toBe(true)
      expect(results.admin.teacher).toBeNull()

      expect(results.user.userErrors.length).toBeGreaterThan(0)
      expect(results.user.hasNotFoundError).toBe(true)
      expect(results.user.teacher).toBeNull()
    })
  })

  describe('Teacher Field Validation', () => {
    it('Should handle all optional fields correctly', async () => {
      const results = await testWithBothRoles(
        'create with all fields',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateTeacher(
                $privateTeacher: Boolean!
                $schoolTeacher: Boolean!
                $teacherInput: TeacherInput!
              ) {
                teacherCreate(
                  privateTeacher: $privateTeacher
                  schoolTeacher: $schoolTeacher
                  teacherInput: $teacherInput
                ) {
                  userErrors {
                    message
                  }
                  teacher {
                    id
                    firstName
                    lastName
                    email
                    instrument
                    phone
                    address
                    city
                    province
                    postalCode
                  }
                }
              }
            `)
            .variables({
              privateTeacher: true,
              schoolTeacher: true,
              teacherInput: {
                firstName: 'TestTeacher',
                lastName: `AllFields${role}`,
                email: `test_teacher_allfields_${role}@test.com`,
                instrument: 'Piano',
                phone: '204-555-1234',
                address: '123 Test St',
                city: 'Winnipeg',
                province: 'MB',
                postalCode: 'R3C 1A1',
              },
            }) as { data?: { teacherCreate: TeacherPayload } }

          // Clean up
          if (response.data?.teacherCreate?.teacher?.id) {
            await globalThis.prisma.tbl_user.delete({
              where: { id: response.data.teacherCreate.teacher.id },
            })
          }

          return {
            teacher: response.data?.teacherCreate?.teacher,
            hasAllFields:
              !!response.data?.teacherCreate?.teacher?.firstName
              && !!response.data?.teacherCreate?.teacher?.email
              && !!response.data?.teacherCreate?.teacher?.instrument
              && !!response.data?.teacherCreate?.teacher?.phone
              && !!response.data?.teacherCreate?.teacher?.address
              && !!response.data?.teacherCreate?.teacher?.city,
          }
        },
      )

      // Both roles should handle all fields
      expect(results.admin.hasAllFields).toBe(true)
      expect(results.admin.teacher?.firstName).toBe('TestTeacher')
      expect(results.admin.teacher?.city).toBe('Winnipeg')

      expect(results.user.hasAllFields).toBe(true)
      expect(results.user.teacher?.firstName).toBe('TestTeacher')
      expect(results.user.teacher?.city).toBe('Winnipeg')
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetTeachers($teacherType: String!) {
            teachers(teacherType: $teacherType) {
              id
            }
          }
        `)
        .variables({ teacherType: 'privateTeacher' }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0].message).toContain('Unauthorized')
    })
  })
})
