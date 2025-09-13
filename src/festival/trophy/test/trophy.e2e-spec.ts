import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Trophy, TrophyPayload } from '../entities/trophy.entity'

describe('Trophy', () => {
  describe('Read Trophy Lists', () => {
    let response: any

    it('Can provide a list of all trophies', async () => {
      response = await request<{ trophies: Trophy[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        query Trophies {
          trophies {
            id
            name
            description
            festivalClasses {
              id
              classNumber
            }
           }
        }`,
        )
        .expectNoErrors()
      expect(response.data.trophies).toBeTruthy()
      expect(response.data.trophies[0].festivalClasses[0]).toBeTruthy()
    })

    it('Can provide a single trophy with proper ID', async () => {
      response = await request<{ trophy: Trophy }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        query Trophy($trophyId: Int!) {
          trophy(id: $trophyId) {
            name
            description
            festivalClasses {
              id
              classNumber
            }
          }
        }`)
        .variables({
          trophyId: 10,
        })
        .expectNoErrors()

      expect(response.data.trophy).toBeTruthy()
      expect(response.data.trophy.festivalClasses[0]).toBeTruthy()
    })

    it('Returns error if nothing found', async () => {
      response = await request<{ trophy: Trophy }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
        query Trophy($trophyId: Int!) {
          trophy(id: $trophyId) {
            name
            description
            festivalClasses {
              id
              classNumber
            }
          }
        }`)
        .variables({
          trophyId: 0,
        })
      expect(response.data).toBeFalsy()
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create Trophy', () => {
    let response: any

    afterAll(async () => {
      await globalThis.prisma.tbl_trophy.delete({
        where: {
          name: 'Best in Show',
        },
      })
    })

    it('Successfully creates a trophy with TrophyInput', async () => {
      response = await request<{ trophyCreate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
          trophyCreate(trophyInput: $trophyInput) {
            userErrors {
            message
            field
          }
          trophy {
            id
            name
            description
          }
        }
      }`)
        .variables({
          trophyInput: {
            name: 'Best in Show',
            description: 'Amazing Snickers',
          },
        })

      expect(response.data.trophyCreate.trophy.name).toBe('Best in Show')
      expect(response.data.trophyCreate.trophy.id).toBeTruthy()
    })

    it('Returns error if trying to add duplicate Trophy name', async () => {
      response = await request<{ trophyCreate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
          trophyCreate(trophyInput: $trophyInput) {
            userErrors {
            message
            field
          }
          trophy {
            id
            name
            description
          }
        }
      }`)
        .variables({
          trophyInput: {
            name: 'Best in Show',
            description: 'Amazing Snickers',
          },
        })

      expect(response.data.trophyCreate.userErrors[0]).toBeTruthy()
      expect(response.data.trophyCreate.trophy).toBeNull()
    })

    it('Improper trophy input returns error', async () => {
      response = await request<{ trophyCreate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
          trophyCreate(trophyInput: $trophyInput) {
            userErrors {
            message
            field
          }
          trophy {
            id
            name
            description
          }
        }
      }`)
        .variables({
          trophyInput: {
            name: null,
            description: 'Amazing Snickers',
          },
        })

      expect(response.errors).toBeTruthy()
    })
  })

  describe('Update Trophy', () => {
    let response: any
    let trophyId: number

    beforeEach(async () => {
      response = await request<{ trophyCreate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
          trophyCreate(trophyInput: $trophyInput) {
            userErrors {
            message
          }
          trophy {
            id
            name
          }
        }
      }`)
        .variables({
          trophyInput: {
            name: 'Really Old',
            description: 'Over 90',
          },
        })
      trophyId = response.data.trophyCreate.trophy.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_trophy.delete({
          where: {
            id: trophyId,
          },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Update details of existing trophy', async () => {
      response = await request<{ trophyUpdate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation TrophyUpdate($trophyId: Int!, $trophyInput: TrophyInput!){
          trophyUpdate(trophyID: $trophyId, trophyInput: $trophyInput) {
            userErrors {
              message
            }
            trophy {
              id
              name
              description
            }
          }
      }`)
        .variables({
          trophyId,
          trophyInput: {
            name: 'Really Old',
            description: 'Young at heart',
          },
        })
      expect(response.data.trophyUpdate.trophy.description).toBe('Young at heart')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if trophy not found', async () => {
      response = await request<{ trophyUpdate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation TrophyUpdate($trophyId: Int!, $trophyInput: TrophyInput!){
          trophyUpdate(trophyID: $trophyId, trophyInput: $trophyInput) {
            userErrors {
              message
            }
            trophy {
              id
              name
              description
            }
          }
      }`)
        .variables({
          trophyId: trophyId + 1,
          trophyInput: {
            name: 'Really Old',
          },
        })
      expect(response.data.trophyUpdate.trophy).toBeNull()
      expect(response.data.trophyUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null or undefined in update', async () => {
      response = await request<{ trophyUpdate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation TrophyUpdate($trophyId: Int!, $trophyInput: TrophyInput!){
          trophyUpdate(trophyID: $trophyId, trophyInput: $trophyInput) {
            userErrors {
              message
            }
            trophy {
              id
              name
              description
            }
          }
      }`)
        .variables({
          trophyId,
          trophyInput: {
            name: null,
            description: 'Testing if null works in update',
          },
        })
      expect(response.data).toBeFalsy()
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let trophyId: number

    beforeEach(async () => {
      response = await request<{ trophyCreate: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateTrophy($trophyInput: TrophyInput!) {
          trophyCreate(trophyInput: $trophyInput) {
            userErrors {
            message
          }
          trophy {
            id
            name
          }
        }
      }`)
        .variables({
          trophyInput: {
            name: 'Best in Show',
            description: 'Amazing Snickers',
          },
        })
      trophyId = response.data.trophyCreate.trophy.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_trophy.delete({
          where: {
            name: 'Best in Show',
          },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Deletes a trophy using the trophyID', async () => {
      response = await request<{ trophyDelete: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation TrophyDelete($trophyDeleteId: Int!) {
          trophyDelete(trophyID: $trophyDeleteId) {
            userErrors {
              message
            }
              trophy {
            id
            name
            description
          }
        }
      }`)
        .variables({
          trophyDeleteId: trophyId,
        })
      const deleteCheck = await globalThis.prisma.tbl_trophy.findUnique({
        where: { id: trophyId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.trophyDelete.trophy.name).toBe('Best in Show')
    })

    it('Returns error message if trophy not found', async () => {
      response = await request<{ trophyDelete: TrophyPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation TrophyDelete($trophyDeleteId: Int!) {
          trophyDelete(trophyID: $trophyDeleteId) {
            userErrors {
              message
            }
              trophy {
            id
            name
            description
          }
        }
      }`)
        .variables({
          trophyDeleteId: trophyId + 1,
        })
      expect(response.data.trophyDelete.trophy).toBeNull()
      expect(response.data.trophyDelete.userErrors[0].message).toBeTruthy()
    })
  })
})
