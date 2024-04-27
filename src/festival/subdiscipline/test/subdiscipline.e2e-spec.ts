import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Subdiscipline, SubdisciplinePayload } from '../entities/subdiscipline.entity'

describe('Subdiscipline', () => {
  describe('Listing Subdisciplines', () => {
    let response: any

    it('Can provide a list of all subdisciplines when no arguments given', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int, ) {
            subdisciplines(performerType:$performerType, disciplineID: $disciplineId ) {
              id
              name 
            }
          }
        `)
        .variables({
          disciplineId: null,
          performerType: null,
        })
        // .expectNoErrors()
      expect(response.data.subdisciplines.length).toBeGreaterThan(1)
      expect(response.data.subdisciplines[0].name).toBeTruthy()
    })

    it('Can provide a list of subdisciplines with disciplineID arg', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int){
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
          disciplineId: 2,
        })
      expect(response.data.subdisciplines.length).toBeGreaterThanOrEqual(1)
    })

    it('Can provide a list of subdisciplines with given performerType arg', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int){
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: 'GROUP',
        })
      expect(response.data.subdisciplines[0].name).toBeTruthy()
      expect(response.data.subdisciplines.length).toBeGreaterThan(1)
    })

    it('Can provide a list of subdisciplines with performerType and disciplineID args', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int){
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: 'SOLO',
          disciplineId: 3,
        })
      expect(response.data.subdisciplines[0].name).toBeTruthy()
      expect(response.data.subdisciplines[0].name).toContain('GUITAR')
    })

    it('Can return a list of subdisciplines with associated categories', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int) {
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              categories {
                id
                name
              }
            }
          }
        `)
      expect(response.data.subdisciplines[0].categories[0].name).toBeTruthy()
    })

    it('Can return a list of subdisciplines with associated levels', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int) {
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              levels {
                id
                name
              }
            }
          }
        `)
      expect(response.data.subdisciplines[0].levels[0].name).toBeTruthy()
    })

    it('Can return festivalClasses in the subdisciplines list with no args', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int) {
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              festivalClasses {
                classNumber
                description
              }
            }
          }
        `)
      expect(response.data.subdisciplines[0].festivalClasses[2].classNumber).toBeTruthy()
    })

    it('Can return festivalClasses in the subdisciplines list with level', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int) {
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              festivalClasses {
                classNumber
                description
                level {
                  id
                  name
                }
              }
            }
          }
        `)
        .variables({
          disciplineId: 1,
        })
      expect(response.data.subdisciplines[0].festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.subdisciplines[0].festivalClasses[0].level.name).toBeTruthy()
    })

    it('Can return festivalClasses in the subdisciplines list with category', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int) {
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              festivalClasses {
                classNumber
                description
                category {
                  id
                  name
                }
              }
            }
          }
        `)
        .variables({
          disciplineId: 1,
        })
      expect(response.data.subdisciplines[0].festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.subdisciplines[0].festivalClasses[0].category.name).toBeTruthy()
    })

    it('Can return festivalClasses in the subdisciplines list with classType', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int) {
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              festivalClasses {
                classNumber
                description
                classType {
                  name
                }
              }
            }
          }
        `)
        .variables({
          disciplineId: 1,
        })
      expect(response.data.subdisciplines[0].festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.subdisciplines[0].festivalClasses[0].classType.name).toBeTruthy()
    })

    it('Can return discipline in the subdisciplines list', async () => {
      response = await request<{ subdisciplines: Subdiscipline[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdisciplines($performerType: PerformerType, $disciplineId: Int) {
            subdisciplines(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              discipline {
                name
              }
            }
          }
        `)
        .variables({
          disciplineId: 1,
        })
      expect(response.data.subdisciplines[0].discipline.name).toBeTruthy()
    })
  })

  describe('Individual Subdiscipline', () => {
    let response: any

    it('Find subdiscipline using proper ID', async () => {
      response = await request<{ subdiscipline: Subdiscipline }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdiscipline($subdisciplineId: Int!) {
            subdiscipline(subdisciplineID: $subdisciplineId) {
              id
              name
              maxPerformers
              minPerformers
            }
          }
        `)
        .variables({
          subdisciplineId: 155,
        })
      expectTypeOf(response.data.subdiscipline.name).toBeString
      expect(response.data.subdiscipline.name).toBeTruthy()
    })

    it('Returns error when nothing found', async () => {
      response = await request<{ subdiscipline: Subdiscipline }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Subdiscipline($subdisciplineId: Int!) {
            subdiscipline(subdisciplineID: $subdisciplineId) {
              id
              name
              maxPerformers
              minPerformers
            }
          }
        `)
        .variables({
          subdisciplineId: 10000,
        })
      expectTypeOf(response.errors[0].message).toBeString
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let subdisciplineId: number

    afterAll(async () => {
      await globalThis.prisma.tbl_subdiscipline.delete({
        where: {
          id: subdisciplineId,
        },
      })
    })

    it('Successfully creates a subdiscipline using disciplineID and subdisciplineInput', async () => {
      response = await request<{ subdisciplineCreate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateSubdiscipline($subdisciplineInput: SubdisciplineInput!) {
            subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
              userErrors {
                message
                field
              }
              subdiscipline {
                id
                name
              }
            }
      }`)
        .variables({
          subdisciplineInput: {
            disciplineID: 1,
            name: 'Bird Calls',
            performerType: 'SOLO',
          },
        })
      subdisciplineId = response.data.subdisciplineCreate.subdiscipline.id
      expect(response.data.subdisciplineCreate.subdiscipline.name).toBe('Bird Calls')
      expect(response.data.subdisciplineCreate.subdiscipline.id).toBeTruthy()
    })

    it('Returns error if trying to add duplicate subdiscipline name', async () => {
      response = await request<{ subdisciplineCreate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateSubdiscipline($subdisciplineInput: SubdisciplineInput!) {
          subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
            userErrors {
            message
          }
          subdiscipline {
            id
            name
          }
        }
      }`)
        .variables({
          subdisciplineInput: {
            disciplineID: 2,
            name: 'Bird Calls',
            performerType: 'GROUP',
          },
        })
      expect(response.data.subdisciplineCreate.userErrors[0]).toBeTruthy()
      expect(response.data.subdisciplineCreate.subdiscipline).toBeNull()
    })

    it('Improper input returns error', async () => {
      response = await request<{ subdisciplineCreate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateSubdiscipline($subdisciplineInput: SubdisciplineInput!) {
          subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
            userErrors {
            message
          }
          subdiscipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineId: null,
          subdisciplineInput: {
            name: null,
          },
        })
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Update', () => {
    let response: any
    let subdisciplineId: number

    beforeEach(async () => {
      response = await request<{ subdisciplineCreate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateSubdiscipline($subdisciplineInput: SubdisciplineInput!) {
          subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
            userErrors {
            message
          }
          subdiscipline {
            id
            name
          }
        }
      }`)
        .variables({
          subdisciplineInput: {
            name: 'Bird Calls',
            performerType: 'SOLO',
            disciplineID: 1,
          },
        })
      subdisciplineId = await response.data.subdisciplineCreate.subdiscipline.id
    })

    afterEach(async () => {
      await globalThis.prisma.tbl_subdiscipline.delete({
        where: {
          id: subdisciplineId,
        },
      })
    })

    it('Update details of existing subdiscipline', async () => {
      response = await request<{ subdisciplineUpdate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation SubdisciplineUpdate($subdisciplineId: Int!, $subdisciplineInput: SubdisciplineInput!){
          subdisciplineUpdate(subdisciplineID: $subdisciplineId, subdisciplineInput: $subdisciplineInput) {
            userErrors {
              message
            }
            subdiscipline {
              id
              name
            }
          }
      }`)
        .variables({
          subdisciplineId,
          subdisciplineInput: {
            name: 'Stones',
            performerType: 'SOLO',
            disciplineID: 1,
          },
        })
      expect(response.data.subdisciplineUpdate.subdiscipline.name).toBe('Stones')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if subdiscipline not found', async () => {
      response = await request<{ subdisciplineUpdate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation SubdisciplineUpdate($subdisciplineId: Int!, $subdisciplineInput: SubdisciplineInput!){
          subdisciplineUpdate(subdisciplineID: $subdisciplineId, subdisciplineInput: $subdisciplineInput) {
            userErrors {
              message
            }
            subdiscipline {
              id
              name
            }
          }
      }`)
        .variables({
          subdisciplineId: subdisciplineId + 1,
          subdisciplineInput: {
            name: 'Bird Calls',
            performerType: 'SOLO',
            disciplineID: 1,
          },
        })
      expect(response.data.subdisciplineUpdate.subdiscipline).toBeNull()
      expect(response.data.subdisciplineUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null or undefined in update', async () => {
      response = await request<{ subdisciplineUpdate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation SubdisciplineUpdate($subdisciplineId: Int!, $subdisciplineInput: SubdisciplineInput!){
          subdisciplineUpdate(subdisciplineID: $subdisciplineId, subdisciplineInput: $subdisciplineInput) {
            userErrors {
              message
            }
            subdiscipline {
              id
              name
            }
          }
      }`)
        .variables({
          subdisciplineId,
          subdisciplineInput: {
            name: null,
          },
        })
      expect(response.data).toBeFalsy()
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let subdisciplineId: number

    beforeEach(async () => {
      response = await request<{ subdisciplineCreate: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateSubdiscipline($subdisciplineInput: SubdisciplineInput!) {
          subdisciplineCreate(subdisciplineInput: $subdisciplineInput) {
            userErrors {
            message
          }
          subdiscipline {
            id
            name
          }
        }
      }`)
        .variables({
          subdisciplineInput: {
            name: 'Bird Calls',
            performerType: 'SOLO',
            disciplineID: 1,
          },
        })
      subdisciplineId = await response.data.subdisciplineCreate.subdiscipline.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_subdiscipline.delete({
          where: {
            id: subdisciplineId,
          },
        })
      }
      catch (error) {}
    })

    it('Deletes a subdiscipline using the subdisciplineID', async () => {
      response = await request<{ subdisciplineDelete: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation SubdisciplineDelete($subdisciplineId: Int!) {
          subdisciplineDelete(subdisciplineID: $subdisciplineId) {
            userErrors {
              message
            }
              subdiscipline {
            id
            name
          }
        }
      }`)
        .variables({
          subdisciplineId,
        })
      const deleteCheck = await globalThis.prisma.tbl_subdiscipline.findUnique({
        where: { id: subdisciplineId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.subdisciplineDelete.subdiscipline.name).toBe('Bird Calls')
    })

    it('Returns error message if subdiscipline not found', async () => {
      response = await request<{ subdisciplineDelete: SubdisciplinePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation SubdisciplineDelete($subdisciplineId: Int!) {
          subdisciplineDelete(subdisciplineID: $subdisciplineId) {
            userErrors {
              message
            }
              subdiscipline {
            id
            name
          }
        }
      }`)
        .variables({
          subdisciplineId: subdisciplineId + 1,
        })
      expect(response.data.subdisciplineDelete.subdiscipline).toBeNull()
      expect(response.data.subdisciplineDelete.userErrors[0].message).toBeTruthy()
    })
  })
})
