import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {CategoryInput} from '../dto/category.input'
import { Category } from '../entities/category.entity'


describe('Category', () => {

  describe('Listing Categories', () => {
    let response: any

    it('Can provide a list of all cateogires', async () => {
      response = await request<{categories: Category}>(global.httpServer)
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
  })
})