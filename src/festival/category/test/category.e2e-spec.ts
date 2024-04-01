import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {CategoryInput} from '../dto/category.input'
import {Category, CategoryPayload} from '../entities/category.entity'


describe('Category', () => {

  describe('Listing Categories', () => {
    let response: any

    it('Can provide a list of all categories', async () => {
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
          categoryId: 10000
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

    it('Returns error if trying to add duplicate category name', async () => {
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
      expect(response.data.categoryCreate.userErrors[0]).toBeTruthy()
      expect(response.data.categoryCreate.category).toBeNull()
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
    let categoryID: number

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
      categoryID = response.data.categoryCreate.category.id
    })

    afterEach(async () => {
      await global.prisma.tbl_category.delete({
        where: {
          id: categoryID
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
          categoryId: categoryID,
          categoryInput: {
            name: 'Cajun Swing',
            requiredComposer: 'Sammy Davis Jr.'
          }
        })
      expect(response.data.categoryUpdate.category.requiredComposer).toBe('Sammy Davis Jr.')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if category not found', async () => {
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
          categoryId: categoryID + 1,
          categoryInput: {
            name: 'Cajun Swing',
          }
        })
      expect(response.data.categoryUpdate.category).toBeNull()
      expect(response.data.categoryUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null or undefined in update', async () => {
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
          categoryId: categoryID,
          categoryInput: {
            name: null,
            description: 'Testing if null works in update'
          }
        })
      expect(response.data).toBeFalsy()
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Delete', () => {
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
      try {
        await global.prisma.tbl_category.delete({
          where: {
            id: categoryId
          }
        })
      } catch (error) {}
    })

    it('Deletes a category using the categoryID', async() => {
      response = await request<{categoryDelete: CategoryPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation CategoryDelete($categoryDeleteId: Int!) {
          categoryDelete(categoryID: $categoryDeleteId) {
            userErrors {
              message
            }
              category {
            id
            name
            description
          }
        }
      }`)
        .variables({
        categoryDeleteId: categoryId
        })
      const deleteCheck = await global.prisma.tbl_category.findUnique({
        where: {id: categoryId}
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.categoryDelete.category.name).toBe('Cajun Swing')
    })

    it('Returns error message if category not found', async() => {
      response = await request<{categoryDelete: CategoryPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation CategoryDelete($categoryDeleteId: Int!) {
          categoryDelete(categoryID: $categoryDeleteId) {
            userErrors {
              message
            }
              category {
            id
            name
            description
          }
        }
      }`)
        .variables({
        categoryDeleteId: categoryId + 1
        })
      expect(response.data.categoryDelete.category).toBeNull()
      expect(response.data.categoryDelete.userErrors[0].message).toBeTruthy()
    })
  })
})