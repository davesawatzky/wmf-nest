import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {FestivalClass, FestivalClassPayload} from '../entities/festival-class.entity'
import {FestivalClassInput} from '../dto/festival-class.input'



describe('FestivalClass', () => {

  describe('Listing FestivalClasses', () => {
    let response: any

    it('Can provide a list of all festivalClasses when no arguments given', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int, ) {
            festivalClasses(performerType:$performerType, disciplineID: $disciplineId ) {
              id
              name 
            }
          }
        `)
        .variables({
          disciplineId: null,
          performerType: null
        })
        // .expectNoErrors()
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
      expect(response.data.festivalClasses[0].name).toBeTruthy()
      
    })

    it('Can provide a list of festivalClasses with disciplineID arg', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int){
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
        disciplineId: 2
        })
      expect(response.data.festivalClasses.length).toBeGreaterThanOrEqual(1)
    })

    it('Can provide a list of festivalClasses with given performerType arg', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int){
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: 'GROUP'
        })
      expect(response.data.festivalClasses[0].name).toBeTruthy()
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
    })

    it('Can provide a list of festivalClasses with performerType and disciplineID args', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int){
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
            }
          }
        `)
        .variables({
          performerType: "SOLO",
          disciplineId: 3
        })
      expect(response.data.festivalClasses[0].name).toBeTruthy()
      expect(response.data.festivalClasses[0].name).toContain('GUITAR')
    })

    it('Can return a list of festivalClasses with associated categories', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int) {
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              categories {
                id
                name
              }
            }
          }
        `)
      expect(response.data.festivalClasses[0].categories[0].name).toBeTruthy()
    })

    it('Can return a list of festivalClasses with associated levels', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int) {
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              levels {
                id
                name
              }
            }
          }
        `)
      expect(response.data.festivalClasses[0].levels[0].name).toBeTruthy()
    })

    it('Can return festivalClasses in the festivalClasses list with no args', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int) {
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              festivalClasses {
                classNumber
                description
              }
            }
          }
        `)
      expect(response.data.festivalClasses[0].festivalClasses[2].classNumber).toBeTruthy()
    })

    it('Can return festivalClasses in the festivalClasses list with level', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int) {
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
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
        disciplineId: 1
      })
      expect(response.data.festivalClasses[0].festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].festivalClasses[0].level.name).toBeTruthy()
    })

    it('Can return festivalClasses in the festivalClasses list with category', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int) {
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
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
        disciplineId: 1
      })
      expect(response.data.festivalClasses[0].festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].festivalClasses[0].category.name).toBeTruthy()
    })

    it('Can return festivalClasses in the festivalClasses list with classType', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int) {
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
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
        disciplineId: 1
      })
      expect(response.data.festivalClasses[0].festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].festivalClasses[0].classType.name).toBeTruthy()
    })

    it('Can return discipline in the festivalClasses list', async () => {
      response = await request<{festivalClasses: FestivalClass[]}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType, $disciplineId: Int) {
            festivalClasses(performerType: $performerType, disciplineID: $disciplineId) {
              id
              name
              discipline {
                name
              }
            }
          }
        `)
        .variables({
        disciplineId: 1
      })
      expect(response.data.festivalClasses[0].discipline.name).toBeTruthy()
    })
  })

  describe('Individual FestivalClass', () => {
    let response: any

    it('Find festivalClass using proper ID', async () => {
      response = await request<{festivalClass: FestivalClass}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClass($festivalClassId: Int!) {
            festivalClass(festivalClassID: $festivalClassId) {
              id
              name
              maxPerformers
              minPerformers
            }
          }
        `)
        .variables({
          festivalClassId: 155
        })
      expectTypeOf(response.data.festivalClass.name).toBeString
      expect(response.data.festivalClass.name).toBeTruthy()
    })

    it('Returns error when nothing found', async () => {
      response = await request<{festivalClass: FestivalClass}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .query(gql`
          query FestivalClass($festivalClassId: Int!) {
            festivalClass(festivalClassID: $festivalClassId) {
              id
              name
              maxPerformers
              minPerformers
            }
          }
        `)
        .variables({
          festivalClassId: 10000
        })
      expectTypeOf(response.errors[0].message).toBeString
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let festivalClassId: number

    afterAll(async () => {
      await global.prisma.tbl_classlist.delete({
        where: {
          id: festivalClassId
        }
      })
    })

    it('Successfully creates a festivalClass using disciplineID and festivalClassInput', async () => {
      response = await request<{festivalClassCreate: FestivalClassPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                name
              }
            }
      }`)
        .variables({
          festivalClassInput: {
            disciplineID: 1,
            name: "Bird Calls",
            performerType:"SOLO"
          }
        })
      festivalClassId = response.data.festivalClassCreate.festivalClass.id
      expect(response.data.festivalClassCreate.festivalClass.name).toBe('Bird Calls')
      expect(response.data.festivalClassCreate.festivalClass.id).toBeTruthy()
    })

    it('Returns error if trying to add duplicate festivalClass name', async () => {
      response = await request<{festivalClassCreate: FestivalClassPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
          festivalClassCreate(festivalClassInput: $festivalClassInput) {
            userErrors {
            message
          }
          festivalClass {
            id
            name
          }
        }
      }`)
        .variables({
          festivalClassInput: {
            disciplineID: 2,
            name: "Bird Calls",
            performerType: "GROUP"
        }
        })
      console.log(response.errors)
      expect(response.data.festivalClassCreate.userErrors[0]).toBeTruthy()
      expect(response.data.festivalClassCreate.festivalClass).toBeNull()
    })

    it('Improper input returns error', async () => {
      response = await request<{festivalClassCreate: FestivalClassPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
          festivalClassCreate(festivalClassInput: $festivalClassInput) {
            userErrors {
            message
          }
          festivalClass {
            id
            name
          }
        }
      }`)
        .variables({
          disciplineId: null,
          festivalClassInput: {
            name: null,
        }
        })
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Update', () => {
    let response: any
    let festivalClassId: number

    beforeEach(async () => {
      response = await request<{festivalClassCreate: FestivalClassPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
          festivalClassCreate(festivalClassInput: $festivalClassInput) {
            userErrors {
            message
          }
          festivalClass {
            id
            name
          }
        }
      }`)
        .variables({
          festivalClassInput: {
            name: "Bird Calls",
            performerType: "SOLO",
            disciplineID: 1
        }
        })
      festivalClassId = await response.data.festivalClassCreate.festivalClass.id

    })

    afterEach(async () => {
      await global.prisma.tbl_classlist.delete({
        where: {
          id: festivalClassId
        }
      })
    })

    it('Update details of existing festivalClass', async () => {
      response = await request<{festivalClassUpdate: FestivalClassPayload}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .mutate(gql`
        mutation FestivalClassUpdate($festivalClassId: Int!, $festivalClassInput: FestivalClassInput!){
          festivalClassUpdate(festivalClassID: $festivalClassId, festivalClassInput: $festivalClassInput) {
            userErrors {
              message
            }
            festivalClass {
              id
              name
            }
          }
      }`)
        .variables({
          festivalClassId,
          festivalClassInput: {
            name: 'Stones',
            performerType: 'SOLO',
            disciplineID: 1
          }
        })
      expect(response.data.festivalClassUpdate.festivalClass.name).toBe('Stones')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if festivalClass not found', async () => {
      response = await request<{festivalClassUpdate: FestivalClassPayload}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .mutate(gql`
        mutation FestivalClassUpdate($festivalClassId: Int!, $festivalClassInput: FestivalClassInput!){
          festivalClassUpdate(festivalClassID: $festivalClassId, festivalClassInput: $festivalClassInput) {
            userErrors {
              message
            }
            festivalClass {
              id
              name
            }
          }
      }`)
        .variables({
          festivalClassId: festivalClassId + 1,
          festivalClassInput: {
            name: 'Bird Calls',
            performerType: 'SOLO',
            disciplineID: 1
          }
        })
      expect(response.data.festivalClassUpdate.festivalClass).toBeNull()
      expect(response.data.festivalClassUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null or undefined in update', async () => {
      response = await request<{festivalClassUpdate: FestivalClassPayload}>(global.httpServer)
      .set('Cookie', `diatonicToken=${global.diatonicToken}`)
      .mutate(gql`
        mutation FestivalClassUpdate($festivalClassId: Int!, $festivalClassInput: FestivalClassInput!){
          festivalClassUpdate(festivalClassID: $festivalClassId, festivalClassInput: $festivalClassInput) {
            userErrors {
              message
            }
            festivalClass {
              id
              name
            }
          }
      }`)
        .variables({
          festivalClassId,
          festivalClassInput: {
            name: null,
          }
        })
      expect(response.data).toBeFalsy()
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let festivalClassId: number

    beforeEach(async () => {
      response = await request<{festivalClassCreate: FestivalClassPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass($festivalClassInput: FestivalClassInput!) {
          festivalClassCreate(festivalClassInput: $festivalClassInput) {
            userErrors {
            message
          }
          festivalClass {
            id
            name
          }
        }
      }`)
        .variables({
          festivalClassInput: {
            name: "Bird Calls",
            performerType: "SOLO",
            disciplineID: 1
        }
        })
      festivalClassId = await response.data.festivalClassCreate.festivalClass.id
    })

    afterEach(async () => {
      try {
        await global.prisma.tbl_classlist.delete({
          where: {
            id: festivalClassId
          }
        })
      } catch(error) {}
    })

    it('Deletes a festivalClass using the festivalClassID', async() => {
      response = await request<{festivalClassDelete: FestivalClassPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation FestivalClassDelete($festivalClassId: Int!) {
          festivalClassDelete(festivalClassID: $festivalClassId) {
            userErrors {
              message
            }
              festivalClass {
            id
            name
          }
        }
      }`)
        .variables({
        festivalClassId
        })
      const deleteCheck = await global.prisma.tbl_classlist.findUnique({
        where: {id: festivalClassId}
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.festivalClassDelete.festivalClass.name).toBe('Bird Calls')
    })

    it('Returns error message if festivalClass not found', async() => {
      response = await request<{festivalClassDelete: FestivalClassPayload}>(global.httpServer)
        .set('Cookie', `diatonicToken=${global.diatonicToken}`)
        .mutate(gql`
        mutation FestivalClassDelete($festivalClassId: Int!) {
          festivalClassDelete(festivalClassID: $festivalClassId) {
            userErrors {
              message
            }
              festivalClass {
            id
            name
          }
        }
      }`)
        .variables({
        festivalClassId: festivalClassId + 1
        })
      expect(response.data.festivalClassDelete.festivalClass).toBeNull()
      expect(response.data.festivalClassDelete.userErrors[0].message).toBeTruthy()
    })
  })
})