import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { IntegrationTestManager } from '../../../test/integrationTestManager'
import {CategoryInput} from '../dto/category.input'
import { Category } from '../entities/category.entity'


describe('Category', () => {
  const integrationTestManager = new IntegrationTestManager()

  beforeAll(async () => {
    await integrationTestManager.beforeAll()
  })

  afterAll(async () => {
    await integrationTestManager.afterAll()
  })

  describe('Listing Categories', () => {
    let response: any

    it('Can provide a list of all cateogires', async () => {
      response = await request<{categories: Category}>(integrationTestManager.httpServer)
        .set('Cookie', `diatonicToken=${integrationTestManager.getDiatonicToken()}`)
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
  })
})