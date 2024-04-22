import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Discipline, DisciplinePayload } from '../entities/discipline.entity'

describe('Discipline', () => {
  describe('Listing Disciplines', () => {
    let response: any

    it('Can provide a list of all disciplines when no arguments given', async () => {
      response = await request<{ disciplines: Discipline[] }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Disciplines($performerType: PerformerType, $instrument: String, ) {
            disciplines(performerType:$performerType, instrument: $instrument ) {
              id
              name 
            }
          }
        `)
        .variables({
          performerType: null,
          instrument: null,
        })
        // .expectNoErrors()
      expect(response.data.disciplines.length).toBe(17)
    })

    it('Can provide a list of disciplines with given PerformerType', async () => {
      response = await request<{ disciplines: Discipline[] }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Disciplines($performerType: PerformerType, $instrument: String){
            disciplines(performerType: $performerType, instrument: $instrument) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: 'COMMUNITY',
        })
      expect(response.data.disciplines.length).toBeGreaterThanOrEqual(1)
    })

    it('Can provide a list of disciplines with given instrument', async () => {
      const response2: any = await request<{ disciplines: Discipline[] }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Disciplines($performerType: PerformerType, $instrument: String){
            disciplines(performerType: $performerType, instrument: $instrument) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: null,
          instrument: 'Trumpet',
        })
      expect(response2.data.disciplines.length).toBe(1)
      expect(response2.data.disciplines).not.toEqual(response.data.disciplines)
    })

    it('Can provide a list of disciplines with performerType and instrument arguments', async () => {
      response = await request<{ disciplines: Discipline[] }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Disciplines($performerType: PerformerType, $instrument: String){
            disciplines(performerType: $performerType, instrument: $instrument) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: 'SOLO',
          instrument: 'Clarinet',
        })
      expect(response.data.disciplines[0].name).toBe('WOODWINDS')
    })

    it('Can return instruments in the disciplines list', async () => {
      response = await request<{ disciplines: Discipline[] }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Disciplines($instrument: String, $performerType: PerformerType) {
            disciplines(instrument: $instrument, performerType: $performerType) {
              id
              name
              instruments {
                name
              }
            }
          }
        `)
      expect(response.data.disciplines[0].instruments[0].name).toBeTruthy()
    })

    it('Can return subdisciplines in the disciplines list', async () => {
      response = await request<{ disciplines: Discipline[] }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Disciplines($instrument: String, $performerType: PerformerType) {
            disciplines(instrument: $instrument, performerType: $performerType) {
              id
              name
              subdisciplines {
                name
              }
            }
          }
        `)
      expect(response.data.disciplines[0].subdisciplines[0].name).toBeTruthy()
    })

    it('Returns empty array if nothing is found', async () => {
      response = await request<{ disciplines: Discipline[] }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Disciplines($performerType: PerformerType, $instrument: String){
            disciplines(performerType: $performerType, instrument: $instrument) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: 'SCHOOL',
          instrument: 'Clarinet',
        })
      expect(response.data.disciplines.length).toBe(0)
    })
  })

  describe('Individual Discipline', () => {
    let response: any

    it('Find discipline using proper ID', async () => {
      response = await request<{ discipline: Discipline }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Discipline($disciplineId: Int!) {
            discipline(id: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
          disciplineId: 9,
        })
      expectTypeOf(response.data.discipline.name).toBeString
      expect(response.data.discipline.name).toBeTruthy()
    })

    it('Returns error when nothing found', async () => {
      response = await request<{ discipline: Discipline }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Discipline($disciplineId: Int!) {
            discipline(id: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
          disciplineId: 10000,
        })
      expectTypeOf(response.errors[0].message).toBeString
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let disciplineId: number

    afterAll(async () => {
      await global.prisma.tbl_discipline.delete({
        where: {
          name: 'Sticks',
        },
      })
    })

    it('Successfully creates a discipline using DisciplineInput', async () => {
      response = await request<{ disciplineCreate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
          disciplineCreate(disciplineInput: $disciplineInput) {
            userErrors {
            message
          }
          discipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineInput: {
            name: 'Sticks',
          },
        })
      disciplineId = response.data.disciplineCreate.discipline.id
      expect(response.data.disciplineCreate.discipline.name).toBe('Sticks')
      expect(response.data.disciplineCreate.discipline.id).toBeTruthy()
    })

    it('Returns error if trying to add duplicate discipline name', async () => {
      response = await request<{ disciplineCreate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
          disciplineCreate(disciplineInput: $disciplineInput) {
            userErrors {
            message
          }
          discipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineInput: {
            name: 'Sticks',
          },
        })
      expect(response.data.disciplineCreate.userErrors[0]).toBeTruthy()
      expect(response.data.disciplineCreate.discipline).toBeNull()
    })

    it('Improper input returns error', async () => {
      response = await request<{ disciplineCreate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
          disciplineCreate(disciplineInput: $disciplineInput) {
            userErrors {
            message
          }
          discipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineInput: {
            name: null,
          },
        })
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Update', () => {
    let response: any
    let disciplineId: number

    beforeEach(async () => {
      response = await request<{ disciplineCreate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
          disciplineCreate(disciplineInput: $disciplineInput) {
            userErrors {
            message
          }
          discipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineInput: {
            name: 'Sticks',
          },
        })
      disciplineId = await response.data.disciplineCreate.discipline.id
    })

    afterEach(async () => {
      await global.prisma.tbl_discipline.delete({
        where: {
          id: disciplineId,
        },
      })
    })

    it('Update details of existing discipline', async () => {
      response = await request<{ disciplineUpdate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation DisciplineUpdate($disciplineId: Int!, $disciplineInput: DisciplineInput!){
          disciplineUpdate(disciplineID: $disciplineId, disciplineInput: $disciplineInput) {
            userErrors {
              message
            }
            discipline {
              id
              name
            }
          }
      }`)
        .variables({
          disciplineId,
          disciplineInput: {
            name: 'Stones',
          },
        })
      expect(response.data.disciplineUpdate.discipline.name).toBe('Stones')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if discipline not found', async () => {
      response = await request<{ disciplineUpdate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation DisciplineUpdate($disciplineId: Int!, $disciplineInput: DisciplineInput!){
          disciplineUpdate(disciplineID: $disciplineId, disciplineInput: $disciplineInput) {
            userErrors {
              message
            }
            discipline {
              id
              name
            }
          }
      }`)
        .variables({
          disciplineId: disciplineId + 1,
          disciplineInput: {
            name: 'Sticks',
          },
        })
      expect(response.data.disciplineUpdate.discipline).toBeNull()
      expect(response.data.disciplineUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null or undefined in update', async () => {
      response = await request<{ disciplineUpdate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation DisciplineUpdate($disciplineId: Int!, $disciplineInput: DisciplineInput!){
          disciplineUpdate(disciplineID: $disciplineId, disciplineInput: $disciplineInput) {
            userErrors {
              message
            }
            discipline {
              id
              name
            }
          }
      }`)
        .variables({
          disciplineId,
          disciplineInput: {
            name: null,
          },
        })
      expect(response.data).toBeFalsy()
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let disciplineId: number

    beforeEach(async () => {
      response = await request<{ disciplineCreate: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateDiscipline($disciplineInput: DisciplineInput!) {
          disciplineCreate(disciplineInput: $disciplineInput) {
            userErrors {
            message
          }
          discipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineInput: {
            name: 'Sticks',
          },
        })
      disciplineId = await response.data.disciplineCreate.discipline.id
    })

    afterEach(async () => {
      try {
        await global.prisma.tbl_discipline.delete({
          where: {
            id: disciplineId,
          },
        })
      }
      catch (error) {}
    })

    it('Deletes a discipline using the disciplineID', async () => {
      response = await request<{ disciplineDelete: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation DisciplineDelete($disciplineId: Int!) {
          disciplineDelete(disciplineID: $disciplineId) {
            userErrors {
              message
            }
              discipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineId,
        })
      const deleteCheck = await global.prisma.tbl_discipline.findUnique({
        where: { id: disciplineId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.disciplineDelete.discipline.name).toBe('Sticks')
    })

    it('Returns error message if discipline not found', async () => {
      response = await request<{ disciplineDelete: DisciplinePayload }>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation DisciplineDelete($disciplineId: Int!) {
          disciplineDelete(disciplineID: $disciplineId) {
            userErrors {
              message
            }
              discipline {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineId: disciplineId + 1,
        })
      expect(response.data.disciplineDelete.discipline).toBeNull()
      expect(response.data.disciplineDelete.userErrors[0].message).toBeTruthy()
    })
  })
})
