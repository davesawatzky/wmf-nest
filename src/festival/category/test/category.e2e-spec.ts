import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {CategoryInput} from '../dto/category.input'
import {Category, CategoryPayload} from '../entities/category.entity'

import {log} from 'console'
import exp from 'constants'


describe('Category', () => {

  describe('Listing Categories', () => {
    let response: any

    it('Can provide a list of all cateogires', async () => {
      response = await request<{categories: Category[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Categories {
            categories {
              description
              id
              name 
              requiredComposer
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.categories).toBeTruthy()
    })

    it('Can provide a list of categories with SubdisciplineID', async () => {
      response = await request<{categories: Category[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Categories($levelId: Int, $subdisciplineId: Int){
            categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
              requiredComposer
            }
          }
        `)
        .variables({
        subdisciplineId: 194
        })
      expect(response.data.categories.length).toBeGreaterThanOrEqual(1)
    })

    it('Can provide a list of categories with LevelID', async () => {
      const response2:any = await request<{categories: Category[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Categories($levelId: Int, $subdisciplineId: Int){
            categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
              requiredComposer
            }
          }
        `)
        .variables({
        levelId: 49
        })
      expect(response.data.categories.length).toBeGreaterThanOrEqual(1)
      expect(response2.data.categories).not.toEqual(response.data.categories)
    })

    it('Can provide a list of categories with LevelID and SubdisciplineID', async () => {
      response = await request<{categories: Category[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Categories($levelId: Int, $subdisciplineId: Int){
            categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
              requiredComposer
            }
          }
        `)
        .variables({
          levelId: 49,
          subdisciplineId: 194
        })
      expect(response.data.categories.length).toBeGreaterThanOrEqual(1)
    })

    it('Returns empty array if nothing is found', async () => {
      response = await request<{categories: Category[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Categories($levelId: Int, $subdisciplineId: Int){
            categories(levelID: $levelId, subdisciplineID: $subdisciplineId) {
              description
              id
              name
              requiredComposer
            }
          }
        `)
        .variables({
          levelId: 100,
          subdisciplineId: 194
        })
      expect(response.data.categories.length).toBeLessThanOrEqual(0)
    })
  })

  describe('Individual Category', () => {
    let response: any

    it('Find category using proper ID', async () => {
      response = await request<{category: Category}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Category($categoryId: Int!) {
            category(id: $categoryId) {
              id
              name
              description
              requiredComposer
            }
          }
        `)
        .variables({
          categoryId: 23
        })
      expectTypeOf(response.data.category.name).toBeString
      expect(response.data.category.name).toBe('CANADIAN COMPOSERS')
    })

    it('Returns error when nothing found', async () => {
      response = await request<{category: Category}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query Category($categoryId: Int!) {
            category(id: $categoryId) {
              id
              name
              description
              requiredComposer
            }
          }
        `)
        .variables({
          categoryId: 123
        })
      expectTypeOf(response.errors[0].message).toBeString
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let categoryId: number

    afterAll(async () => {
      await global.prisma.tbl_category.delete({
        where: {
          id: categoryId
        }
      })
    })

    it('Successfully creates a category using CategoryInput', async () => {
      response = await request<{categoryCreate: CategoryPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateCategory($categoryInput: CategoryInput!) {
          categoryCreate(categoryInput: $categoryInput) {
            userErrors {
            message
          }
          category {
            id
            name
          }
        }
      }`)
        .variables({
          categoryInput: {
            name: "Cajun Swing",
            description: "Dance music from Louisianna"
        }
        })
      categoryId = response.data.categoryCreate.category.id
      expect(response.data.categoryCreate.category.name).toBe('Cajun Swing')
      expect(response.data.categoryCreate.category.id).toBeTruthy()

    })

    it('Improper input returns error', async () => {
      response = await request<{categoryCreate: CategoryPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateCategory($categoryInput: CategoryInput!) {
          categoryCreate(categoryInput: $categoryInput) {
            userErrors {
            message
          }
          category {
            id
            name
          }
        }
      }`)
        .variables({
          categoryInput: {
            name: null,
            description: "Dance music from Louisianna"
        }
        })
      expect(response.errors[0]).toBeTruthy()

    })
  })

  describe('Update', () => {
    let response: any
    let categoryId: number

    beforeEach(async () => {
      response = await request<{categoryCreate: CategoryPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateCategory($categoryInput: CategoryInput!) {
          categoryCreate(categoryInput: $categoryInput) {
            userErrors {
            message
          }
          category {
            id
            name
          }
        }
      }`)
        .variables({
          categoryInput: {
            name: "Cajun Swing",
            description: "Dance music from Louisianna"
        }
        })
      
      categoryId = response.data.categoryCreate.category.id
    })

    afterEach(async () => {
      await global.prisma.tbl_category.delete({
        where: {
          id: categoryId
        }
      })
    })

    it('Update details of existing category', async () => {
      response = await request<{categoryUpdate: CategoryPayload}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .mutate(gql`
        mutation CategoryUpdate($categoryId: Int!, $categoryInput: CategoryInput!){
          categoryUpdate(categoryID: $categoryId, categoryInput: $categoryInput) {
            userErrors {
              message
            }
            category {
              id
              name
              description
              requiredComposer
            }
          }
      }`)
        .variables({
          categoryId,
          categoryInput: {
            requiredComposer: 'Sammy Davis Jr.'
          }
        })
      
      expect(response.data.categoryUpdate.category.requiredComposer).toBe('Sammy Davis Jr.')
      expect(response.errors).not.toBeDefined()
    })
  })
})