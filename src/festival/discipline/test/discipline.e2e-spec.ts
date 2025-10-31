import gql from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  createAuthenticatedRequest,
  testWithBothRoles,
} from '@/test/testHelpers'
import { Discipline, DisciplinePayload } from '../entities/discipline.entity'

describe('Discipline E2E Tests', () => {
  let testDisciplineId: number
  let queryTestDisciplineId: number

  // Mock data for testing
  const mockDiscipline = {
    name: 'E2E Test Discipline',
  }

  beforeAll(async () => {
    // Wait for test context to be available
    if (!globalThis.testContext) {
      throw new Error('Test context not initialized. Check integrationTestSetup.')
    }

    // Clean up any existing test data
    await globalThis.prisma.tbl_discipline.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })

    // Create a persistent discipline for query tests
    const testDiscipline = await globalThis.prisma.tbl_discipline.create({
      data: mockDiscipline,
    })
    queryTestDisciplineId = testDiscipline.id
  }, 30000) // 30 second timeout for setup

  afterAll(async () => {
    // Final cleanup
    await globalThis.prisma.tbl_discipline.deleteMany({
      where: { name: { startsWith: 'E2E Test' } },
    })
  })

  describe('Discipline Queries (Both Roles)', () => {
    it('Should list all disciplines for both roles', async () => {
      const results = await testWithBothRoles(
        'list disciplines',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDisciplines(
                $performerType: PerformerType
                $instrument: String
              ) {
                disciplines(
                  performerType: $performerType
                  instrument: $instrument
                ) {
                  id
                  name
                }
              }
            `)
            .variables({
              performerType: null,
              instrument: null,
            })
            .expectNoErrors() as { data: { disciplines: Discipline[] } }

          const disciplines = response.data.disciplines
          const firstDiscipline = disciplines[0]

          return {
            hasData: !!disciplines,
            isArray: Array.isArray(disciplines),
            count: disciplines?.length || 0,
            hasValidTypes: typeof firstDiscipline?.id === 'number'
              && typeof firstDiscipline?.name === 'string',
          }
        },
      )

      // Both roles should successfully retrieve disciplines
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.isArray).toBe(true)
      expect(results.user.isArray).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
      expect(results.admin.hasValidTypes).toBe(true)
      expect(results.user.hasValidTypes).toBe(true)
    })

    it('Should filter disciplines by performerType for both roles', async () => {
      const results = await testWithBothRoles(
        'filter disciplines by performerType',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDisciplines(
                $performerType: PerformerType
                $instrument: String
              ) {
                disciplines(
                  performerType: $performerType
                  instrument: $instrument
                ) {
                  id
                  name
                }
              }
            `)
            .variables({
              performerType: 'COMMUNITY',
              instrument: null,
            })
            .expectNoErrors() as { data: { disciplines: Discipline[] } }

          return {
            hasData: !!response.data.disciplines,
            count: response.data.disciplines?.length || 0,
          }
        },
      )

      // Both roles should get same filtered results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBeGreaterThan(0)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter disciplines by instrument for both roles', async () => {
      const results = await testWithBothRoles(
        'filter disciplines by instrument',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDisciplines(
                $performerType: PerformerType
                $instrument: String
              ) {
                disciplines(
                  performerType: $performerType
                  instrument: $instrument
                ) {
                  id
                  name
                }
              }
            `)
            .variables({
              performerType: null,
              instrument: 'Trumpet',
            })
            .expectNoErrors() as { data: { disciplines: Discipline[] } }

          return {
            hasData: !!response.data.disciplines,
            count: response.data.disciplines?.length || 0,
            firstDiscipline: response.data.disciplines[0],
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.count).toBe(1)
      expect(results.user.count).toBe(results.admin.count)
    })

    it('Should filter disciplines by both performerType and instrument for both roles', async () => {
      const results = await testWithBothRoles(
        'filter disciplines by both filters',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDisciplines(
                $performerType: PerformerType
                $instrument: String
              ) {
                disciplines(
                  performerType: $performerType
                  instrument: $instrument
                ) {
                  id
                  name
                }
              }
            `)
            .variables({
              performerType: 'SOLO',
              instrument: 'Clarinet',
            })
            .expectNoErrors() as { data: { disciplines: Discipline[] } }

          return {
            hasData: !!response.data.disciplines,
            count: response.data.disciplines?.length || 0,
            disciplineName: response.data.disciplines[0]?.name,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.disciplineName).toBe('WOODWINDS')
      expect(results.user.disciplineName).toBe(results.admin.disciplineName)
    })

    it('Should return empty array when no matches found for both roles', async () => {
      const results = await testWithBothRoles(
        'return empty array for no matches',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDisciplines(
                $performerType: PerformerType
                $instrument: String
              ) {
                disciplines(
                  performerType: $performerType
                  instrument: $instrument
                ) {
                  id
                  name
                }
              }
            `)
            .variables({
              performerType: 'SCHOOL',
              instrument: 'Clarinet',
            })
            .expectNoErrors() as { data: { disciplines: Discipline[] } }

          return {
            count: response.data.disciplines?.length || 0,
          }
        },
      )

      // Both roles should get empty results
      expect(results.admin.count).toBe(0)
      expect(results.user.count).toBe(0)
    })

    it('Should return instruments in the disciplines list for both roles', async () => {
      const results = await testWithBothRoles(
        'list disciplines with instruments',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDisciplines(
                $performerType: PerformerType
                $instrument: String
              ) {
                disciplines(
                  performerType: $performerType
                  instrument: $instrument
                ) {
                  id
                  name
                  instruments {
                    name
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { disciplines: Discipline[] } }

          const disciplineWithInstruments = response.data.disciplines.find(
            d => d.instruments && d.instruments.length > 0,
          )

          return {
            hasData: !!response.data.disciplines,
            hasInstruments: !!disciplineWithInstruments,
            firstInstrumentName: disciplineWithInstruments?.instruments?.[0]?.name,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      if (results.admin.hasInstruments) {
        expect(results.user.hasInstruments).toBe(true)
        expect(results.admin.firstInstrumentName).toBeTruthy()
        expect(results.user.firstInstrumentName).toBe(results.admin.firstInstrumentName)
      }
    })

    it('Should return subdisciplines in the disciplines list for both roles', async () => {
      const results = await testWithBothRoles(
        'list disciplines with subdisciplines',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDisciplines(
                $performerType: PerformerType
                $instrument: String
              ) {
                disciplines(
                  performerType: $performerType
                  instrument: $instrument
                ) {
                  id
                  name
                  subdisciplines {
                    name
                  }
                }
              }
            `)
            .expectNoErrors() as { data: { disciplines: Discipline[] } }

          const disciplineWithSubdisciplines = response.data.disciplines.find(
            d => d.subdisciplines && d.subdisciplines.length > 0,
          )

          return {
            hasData: !!response.data.disciplines,
            hasSubdisciplines: !!disciplineWithSubdisciplines,
            firstSubdisciplineName: disciplineWithSubdisciplines?.subdisciplines?.[0]?.name,
          }
        },
      )

      // Both roles should get same results
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      if (results.admin.hasSubdisciplines) {
        expect(results.user.hasSubdisciplines).toBe(true)
        expect(results.admin.firstSubdisciplineName).toBeTruthy()
        expect(results.user.firstSubdisciplineName).toBe(results.admin.firstSubdisciplineName)
      }
    })

    it('Should find specific discipline by ID for both roles', async () => {
      const results = await testWithBothRoles(
        'find discipline by ID',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDiscipline($disciplineId: Int!) {
                discipline(id: $disciplineId) {
                  id
                  name
                }
              }
            `)
            .variables({ disciplineId: queryTestDisciplineId })
            .expectNoErrors() as { data: { discipline: Discipline } }

          return {
            hasData: !!response.data.discipline,
            discipline: response.data.discipline,
          }
        },
      )

      // Both roles should find the discipline
      expect(results.admin.hasData).toBe(true)
      expect(results.user.hasData).toBe(true)
      expect(results.admin.discipline.name).toBe(mockDiscipline.name)
      expect(results.user.discipline.name).toBe(mockDiscipline.name)
    })

    it('Should return error when discipline not found for both roles', async () => {
      const results = await testWithBothRoles(
        'discipline not found',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .query(gql`
              query GetDiscipline($disciplineId: Int!) {
                discipline(id: $disciplineId) {
                  id
                  name
                }
              }
            `)
            .variables({ disciplineId: 999999 }) as { errors?: readonly any[] }

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

  describe('Discipline Mutations', () => {
    it('Should enforce create authorization: admin succeeds, user fails', async () => {
      const results = await testWithBothRoles(
        'create discipline',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
                disciplineCreate(disciplineInput: $disciplineInput) {
                  userErrors {
                    message
                    field
                  }
                  discipline {
                    id
                    name
                  }
                }
              }
            `, {
              disciplineInput: {
                name: `E2E Test ${role} Discipline Create`,
              },
            }) as { data?: { disciplineCreate: DisciplinePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            discipline: response.data?.disciplineCreate?.discipline as Discipline | undefined,
            userErrors: response.data?.disciplineCreate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.discipline).toBeTruthy()
      expect(results.admin.discipline?.name).toBe('E2E Test admin Discipline Create')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.discipline).toBeUndefined()

      // Cleanup admin's created discipline
      if (results.admin.discipline?.id) {
        await globalThis.prisma.tbl_discipline.delete({
          where: { id: results.admin.discipline.id },
        })
      }
    })

    it('Should return validation error for duplicate discipline name', async () => {
      // Create initial discipline
      const initialDiscipline = await globalThis.prisma.tbl_discipline.create({
        data: {
          name: 'E2E Test Duplicate Discipline',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
            disciplineCreate(disciplineInput: $disciplineInput) {
              userErrors {
                message
                field
              }
              discipline {
                id
                name
              }
            }
          }
        `, {
          disciplineInput: {
            name: 'E2E Test Duplicate Discipline',
          },
        }) as { data: { disciplineCreate: DisciplinePayload } }

      expect(response.data.disciplineCreate.userErrors).toHaveLength(1)
      expect(response.data.disciplineCreate.userErrors[0].message).toBeTruthy()
      expect(response.data.disciplineCreate.discipline).toBeNull()

      // Cleanup
      await globalThis.prisma.tbl_discipline.delete({
        where: { id: initialDiscipline.id },
      })
    })

    it('Should return error for null name in create', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
            disciplineCreate(disciplineInput: $disciplineInput) {
              userErrors {
                message
                field
              }
              discipline {
                id
                name
              }
            }
          }
        `, {
          disciplineInput: {
            name: null,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()
    })

    it('Should enforce update authorization: admin succeeds, user fails', async () => {
      // Create discipline for testing
      const testDiscipline = await globalThis.prisma.tbl_discipline.create({
        data: {
          name: 'E2E Test Update Discipline',
        },
      })

      const results = await testWithBothRoles(
        'update discipline',
        async (role) => {
          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation UpdateDiscipline(
                $disciplineId: Int!
                $disciplineInput: DisciplineInput!
              ) {
                disciplineUpdate(
                  disciplineID: $disciplineId
                  disciplineInput: $disciplineInput
                ) {
                  userErrors {
                    message
                    field
                  }
                  discipline {
                    id
                    name
                  }
                }
              }
            `, {
              disciplineId: testDiscipline.id,
              disciplineInput: {
                name: 'E2E Test Updated Discipline',
              },
            }) as { data?: { disciplineUpdate: DisciplinePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            discipline: response.data?.disciplineUpdate?.discipline as Discipline | undefined,
            userErrors: response.data?.disciplineUpdate?.userErrors,
          }
        },
      )

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.discipline).toBeTruthy()
      expect(results.admin.discipline?.name).toBe('E2E Test Updated Discipline')
      expect(results.admin.userErrors).toHaveLength(0)

      // User should be forbidden
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.discipline).toBeUndefined()

      // Cleanup
      await globalThis.prisma.tbl_discipline.delete({
        where: { id: testDiscipline.id },
      })
    })

    it('Should return error when updating non-existent discipline', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateDiscipline(
            $disciplineId: Int!
            $disciplineInput: DisciplineInput!
          ) {
            disciplineUpdate(
              disciplineID: $disciplineId
              disciplineInput: $disciplineInput
            ) {
              userErrors {
                message
                field
              }
              discipline {
                id
                name
              }
            }
          }
        `, {
          disciplineId: 999999,
          disciplineInput: {
            name: 'Non-existent Discipline',
          },
        }) as { data: { disciplineUpdate: DisciplinePayload } }

      expect(response.data.disciplineUpdate.discipline).toBeNull()
      expect(response.data.disciplineUpdate.userErrors).toHaveLength(1)
      expect(response.data.disciplineUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Should return error for null name in update', async () => {
      // Create discipline for testing
      const testDiscipline = await globalThis.prisma.tbl_discipline.create({
        data: {
          name: 'E2E Test Null Update Discipline',
        },
      })

      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation UpdateDiscipline(
            $disciplineId: Int!
            $disciplineInput: DisciplineInput!
          ) {
            disciplineUpdate(
              disciplineID: $disciplineId
              disciplineInput: $disciplineInput
            ) {
              userErrors {
                message
                field
              }
              discipline {
                id
                name
              }
            }
          }
        `, {
          disciplineId: testDiscipline.id,
          disciplineInput: {
            name: null,
          },
        }) as { errors?: readonly any[] }

      expect(response.errors).toBeTruthy()
      expect(response.errors![0]).toBeTruthy()

      // Cleanup
      await globalThis.prisma.tbl_discipline.delete({
        where: { id: testDiscipline.id },
      })
    })

    it('Should enforce delete authorization: admin succeeds, user fails', async () => {
      // Create disciplines for both roles to attempt deletion
      const adminDiscipline = await globalThis.prisma.tbl_discipline.create({
        data: {
          name: 'E2E Test Delete Admin Discipline',
        },
      })

      const userDiscipline = await globalThis.prisma.tbl_discipline.create({
        data: {
          name: 'E2E Test Delete User Discipline',
        },
      })

      const results = await testWithBothRoles(
        'delete discipline',
        async (role) => {
          const disciplineId = role === 'admin' ? adminDiscipline.id : userDiscipline.id

          const response = await createAuthenticatedRequest(role)
            .mutate(gql`
              mutation DeleteDiscipline($disciplineId: Int!) {
                disciplineDelete(disciplineID: $disciplineId) {
                  userErrors {
                    message
                    field
                  }
                  discipline {
                    id
                    name
                  }
                }
              }
            `, {
              disciplineId,
            }) as { data?: { disciplineDelete: DisciplinePayload }, errors?: readonly any[] }

          return {
            hasErrors: !!response.errors,
            isAuthorized: !response.errors,
            discipline: response.data?.disciplineDelete?.discipline as Discipline | undefined,
            userErrors: response.data?.disciplineDelete?.userErrors,
          }
        },
      )

      // User should be forbidden (test first since admin will delete)
      expect(results.user.isAuthorized).toBe(false)
      expect(results.user.hasErrors).toBe(true)
      expect(results.user.discipline).toBeUndefined()

      // Admin should succeed
      expect(results.admin.isAuthorized).toBe(true)
      expect(results.admin.hasErrors).toBe(false)
      expect(results.admin.discipline).toBeTruthy()
      expect(results.admin.discipline?.name).toBe('E2E Test Delete Admin Discipline')
      expect(results.admin.userErrors).toHaveLength(0)

      // Verify admin's discipline was actually deleted
      const deletedCheck = await globalThis.prisma.tbl_discipline.findUnique({
        where: { id: adminDiscipline.id },
      })
      expect(deletedCheck).toBeNull()

      // Cleanup user's discipline (wasn't deleted)
      await globalThis.prisma.tbl_discipline.delete({
        where: { id: userDiscipline.id },
      })
    })

    it('Should return error when deleting non-existent discipline', async () => {
      const response = await createAuthenticatedRequest('admin')
        .mutate(gql`
          mutation DeleteDiscipline($disciplineId: Int!) {
            disciplineDelete(disciplineID: $disciplineId) {
              userErrors {
                message
                field
              }
              discipline {
                id
                name
              }
            }
          }
        `, {
          disciplineId: 999999,
        }) as { data: { disciplineDelete: DisciplinePayload } }

      expect(response.data.disciplineDelete.discipline).toBeNull()
      expect(response.data.disciplineDelete.userErrors).toHaveLength(1)
      expect(response.data.disciplineDelete.userErrors[0].message).toBeTruthy()
    })
  })

  describe('Authentication and Authorization', () => {
    it('Should require authentication for all operations', async () => {
      const response = await createAuthenticatedRequest('user')
        .set('Cookie', '') // Remove authentication
        .query(gql`
          query GetDisciplines {
            disciplines {
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
