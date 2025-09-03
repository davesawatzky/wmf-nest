import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Level, LevelPayload } from '../entities/level.entity'

describe('Level', () => {
  describe('Listing Levels', () => {
    let response: any

    it('Can provide a list of all levels', async () => {
      response = await request<{ levels: Level[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Levels {
            levels {
              id
              description
              name 
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.levels).toBeTruthy()
    })

    it('Can provide a list of levels with SubdisciplineID', async () => {
      response = await request<{ levels: Level[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Levels($categoryId: Int, $subdisciplineId: Int){
            levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
            }
          }
        `)
        .variables({
          subdisciplineId: 194,
        })
      expect(response.data.levels.length).toBeGreaterThanOrEqual(1)
    })

    it('Can provide a list of levels with CategoryID', async () => {
      const response2: any = await request<{ levels: Level[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Levels($categoryId: Int, $subdisciplineId: Int){
            levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
            }
          }
        `)
        .variables({
          categoryId: 43,
        })
      expect(response.data.levels.length).toBeGreaterThanOrEqual(1)
      expect(response2.data.levels).not.toEqual(response.data.levels)
    })

    it('Can provide a list of levels with CategoryID and SubdisciplineID', async () => {
      response = await request<{ levels: Level[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Levels($categoryId: Int, $subdisciplineId: Int){
            levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
            }
          }
        `)
        .variables({
          categoryId: 40,
          subdisciplineId: 219,
        })
      expect(response.data.levels.length).toBeGreaterThanOrEqual(1)
    })

    it('Returns empty array if nothing is found', async () => {
      response = await request<{ levels: Level[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Levels($categoryId: Int, $subdisciplineId: Int){
            levels(categoryID: $categoryId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
            }
          }
        `)
        .variables({
          categoryId: 1000,
          subdisciplineId: 194,
        })
      expect(response.data.levels.length).toBeLessThanOrEqual(0)
    })
  })

  describe('Individual Level', () => {
    let response: any

    it('Find level using proper ID', async () => {
      response = await request<{ level: Level }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Level($levelId: Int!) {
            level(id: $levelId) {
              id
              name
              description
            }
          }
        `)
        .variables({
          levelId: 37,
        })
      expect(response.data.level.name).toBe('GRADE C')
    })

    it('Returns error when nothing found', async () => {
      response = await request<{ level: Level }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Level($levelId: Int!) {
            level(id: $levelId) {
              id
              name
              description
            }
          }
        `)
        .variables({
          levelId: 10000,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let levelId: number

    afterAll(async () => {
      await globalThis.prisma.tbl_level.delete({
        where: {
          id: levelId,
        },
      })
    })

    it('Successfully creates a level using LevelInput', async () => {
      response = await request<{ levelCreate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
          levelCreate(levelInput: $levelInput) {
            userErrors {
            message
          }
          level {
            id
            name
          }
        }
      }`)
        .variables({
          levelInput: {
            name: 'Really Old',
            description: 'Over 90',
          },
        })
      levelId = response.data.levelCreate.level.id
      expect(response.data.levelCreate.level.name).toBe('Really Old')
      expect(response.data.levelCreate.level.id).toBeTruthy()
    })

    it('Returns error if trying to add duplicate level name', async () => {
      response = await request<{ levelCreate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
          levelCreate(levelInput: $levelInput) {
            userErrors {
            message
          }
          level {
            id
            name
          }
        }
      }`)
        .variables({
          levelInput: {
            name: 'Really Old',
            description: 'Over 90',
          },
        })
      expect(response.data.levelCreate.userErrors[0]).toBeTruthy()
      expect(response.data.levelCreate.level).toBeNull()
    })

    it('Improper input returns error', async () => {
      response = await request<{ levelCreate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
          levelCreate(levelInput: $levelInput) {
            userErrors {
            message
          }
          level {
            id
            name
          }
        }
      }`)
        .variables({
          levelInput: {
            name: null,
            description: 'Those young at heart',
          },
        })
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Update', () => {
    let response: any
    let levelId: number

    beforeEach(async () => {
      response = await request<{ levelCreate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
          levelCreate(levelInput: $levelInput) {
            userErrors {
            message
          }
          level {
            id
            name
          }
        }
      }`)
        .variables({
          levelInput: {
            name: 'Really Old',
            description: 'Over 90',
          },
        })
      levelId = response.data.levelCreate.level.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_level.delete({
          where: {
            id: levelId,
          },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Update details of existing level', async () => {
      response = await request<{ levelUpdate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation LevelUpdate($levelId: Int!, $levelInput: LevelInput!){
          levelUpdate(levelID: $levelId, levelInput: $levelInput) {
            userErrors {
              message
            }
            level {
              id
              name
              description
            }
          }
      }`)
        .variables({
          levelId,
          levelInput: {
            name: 'Really Old',
            description: 'Young at heart',
          },
        })
      expect(response.data.levelUpdate.level.description).toBe('Young at heart')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if level not found', async () => {
      response = await request<{ levelUpdate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation LevelUpdate($levelId: Int!, $levelInput: LevelInput!){
          levelUpdate(levelID: $levelId, levelInput: $levelInput) {
            userErrors {
              message
            }
            level {
              id
              name
              description
            }
          }
      }`)
        .variables({
          levelId: levelId + 1,
          levelInput: {
            name: 'Really Old',
          },
        })
      expect(response.data.levelUpdate.level).toBeNull()
      expect(response.data.levelUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null or undefined in update', async () => {
      response = await request<{ levelUpdate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation LevelUpdate($levelId: Int!, $levelInput: LevelInput!){
          levelUpdate(levelID: $levelId, levelInput: $levelInput) {
            userErrors {
              message
            }
            level {
              id
              name
              description
            }
          }
      }`)
        .variables({
          levelId,
          levelInput: {
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
    let levelId: number

    beforeEach(async () => {
      response = await request<{ levelCreate: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateLevel($levelInput: LevelInput!) {
          levelCreate(levelInput: $levelInput) {
            userErrors {
            message
          }
          level {
            id
            name
          }
        }
      }`)
        .variables({
          levelInput: {
            name: 'Really Old',
            description: 'Over 90',
          },
        })
      levelId = response.data.levelCreate.level.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_level.delete({
          where: {
            id: levelId,
          },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Deletes a level using the levelID', async () => {
      response = await request<{ levelDelete: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation LevelDelete($levelDeleteId: Int!) {
          levelDelete(levelID: $levelDeleteId) {
            userErrors {
              message
            }
              level {
            id
            name
            description
          }
        }
      }`)
        .variables({
          levelDeleteId: levelId,
        })
      const deleteCheck = await globalThis.prisma.tbl_level.findUnique({
        where: { id: levelId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.levelDelete.level.name).toBe('Really Old')
    })

    it('Returns error message if level not found', async () => {
      response = await request<{ levelDelete: LevelPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation LevelDelete($levelDeleteId: Int!) {
          levelDelete(levelID: $levelDeleteId) {
            userErrors {
              message
            }
              level {
            id
            name
            description
          }
        }
      }`)
        .variables({
          levelDeleteId: levelId + 1,
        })
      expect(response.data.levelDelete.level).toBeNull()
      expect(response.data.levelDelete.userErrors[0].message).toBeTruthy()
    })
  })
})
