import gql from 'graphql-tag'
import request from 'supertest-graphql'
import {
  FestivalClass,
  FestivalClassPayload,
} from '../entities/festival-class.entity'

describe('FestivalClass', () => {
  describe('Listing FestivalClasses', () => {
    let response: any

    it('Can return a full list of all festival classes', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses {
            festivalClasses {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].performerType).toBeTruthy()
      expect(response.data.festivalClasses[0].price).toBeTruthy()
      expect(response.data.festivalClasses[0]).toHaveProperty(
        'requiredSelection',
      )
    })

    it('Can return a list of all festival classes with performerType arg', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($performerType: PerformerType) {
            festivalClasses(performerType: $performerType) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
            }
          }
        `)
        .expectNoErrors()
        .variables({
          performerType: 'COMMUNITY',
        })
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].performerType).toBe('COMMUNITY')
      expect(response.data.festivalClasses[0].price).toBeTruthy()
      expect(response.data.festivalClasses[0]).toHaveProperty(
        'requiredSelection',
      )
    })

    it('Can return a list of all festival classes with subdisciplineID', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
              subdiscipline {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassSearch: {
            subdisciplineID: 160,
          },
        })
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].performerType).toBeTruthy()
      expect(response.data.festivalClasses[0].price).toBeTruthy()
      expect(response.data.festivalClasses[0].subdiscipline.name).toBeTruthy()
      expect(response.data.festivalClasses[0]).toHaveProperty(
        'requiredSelection',
      )
    })

    it('Can return a list of all festival classes with levelID', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
              level {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassSearch: {
            levelID: 1,
          },
        })
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].performerType).toBeTruthy()
      expect(response.data.festivalClasses[0].price).toBeTruthy()
      expect(response.data.festivalClasses[0].level.name).toBeTruthy()
      expect(response.data.festivalClasses[0]).toHaveProperty(
        'requiredSelection',
      )
    })

    it('Can return a list of all festival classes with categoryID', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
              category {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassSearch: {
            categoryID: 1,
          },
        })
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].performerType).toBeTruthy()
      expect(response.data.festivalClasses[0].price).toBeTruthy()
      expect(response.data.festivalClasses[0].category.name).toBeTruthy()
      expect(response.data.festivalClasses[0]).toHaveProperty(
        'requiredSelection',
      )
    })

    it('Can return a list of all festival classes with 2 arguments', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
              category {
                name
              }
              level {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassSearch: {
            categoryID: 23,
            levelID: 49,
          },
        })
      expect(response.data.festivalClasses.length).toBeGreaterThan(1)
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].performerType).toBeTruthy()
      expect(response.data.festivalClasses[0].price).toBeTruthy()
      expect(response.data.festivalClasses[0].category.name).toBeTruthy()
      expect(response.data.festivalClasses[0].level.name).toBeTruthy()
      expect(response.data.festivalClasses[0]).toHaveProperty(
        'requiredSelection',
      )
    })

    it('Can return a list of all festival classes with all 3 arguments', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
              category {
                name
              }
              level {
                name
              }
              subdiscipline {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassSearch: {
            categoryID: 23,
            levelID: 49,
            subdisciplineID: 190,
          },
        })
      expect(response.data.festivalClasses.length).toBe(1)
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].performerType).toBeTruthy()
      expect(response.data.festivalClasses[0].price).toBeTruthy()
      expect(response.data.festivalClasses[0].category.name).toBeTruthy()
      expect(response.data.festivalClasses[0].level.name).toBeTruthy()
      expect(response.data.festivalClasses[0]).toHaveProperty(
        'requiredSelection',
      )
    })

    it('Will return an empty array if nothing is found.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses(
            $festivalClassSearch: FestivalClassSearchArgs
            $performerType: PerformerType
          ) {
            festivalClasses(
              festivalClassSearch: $festivalClassSearch
              performerType: $performerType
            ) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
              category {
                name
              }
              level {
                name
              }
              subdiscipline {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          performerType: 'COMMUNITY',
          festivalClassSearch: {
            categoryID: 1,
            levelID: 1,
            subdisciplineID: 1,
          },
        })
      expect(response.data.festivalClasses.length).toBe(0)
      expect(response.data.festivalClasses).toBeDefined()
      expect(response.data.festivalClasses[0]).toBeFalsy()
    })

    it('Will return an error if input is invalid.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses(
            $festivalClassSearch: FestivalClassSearchArgs
            $performerType: PerformerType
          ) {
            festivalClasses(
              festivalClassSearch: $festivalClassSearch
              performerType: $performerType
            ) {
              id
              classNumber
              description
              maxSelections
              minSelections
              performerType
              price
              requiredSelection
              category {
                name
              }
              level {
                name
              }
              subdiscipline {
                name
              }
            }
          }
        `)
        .variables({
          performerType: 'C',
          festivalClassSearch: {
            categoryID: 1000,
            levelID: 1,
            subdisciplineID: 1,
          },
        })
      expect(response.errors[0].message).toBeDefined()
    })

    it('Can return associated levels in list.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              level {
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].level.name).toBeTruthy()
    })
    it('Can return associated subdisciplines in list.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              subdiscipline {
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].subdiscipline.name).toBeTruthy()
    })

    it('Can return associated trophies in list.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              trophies {
                id
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].trophies[0].name).toBeTruthy()
    })

    it('Can return associated categories in list.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              category {
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].category.name).toBeTruthy()
    })

    it('Can return associated class types in list.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClasses($festivalClassSearch: FestivalClassSearchArgs) {
            festivalClasses(festivalClassSearch: $festivalClassSearch) {
              id
              classNumber
              classType {
                id
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.festivalClasses[0].id).toBeTruthy()
      expect(response.data.festivalClasses[0].classNumber).toBeTruthy()
      expect(response.data.festivalClasses[0].classType.name).toBeTruthy()
    })
  })

  describe('Festival Class by Number', () => {
    let response: any

    it('Can provide a single festival by festivalClassNumber.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClass($festivalClassNumber: String!) {
            festivalClassByNumber(festivalClassNumber: $festivalClassNumber) {
              id
              classNumber
              description
              performerType
              subdiscipline {
                name
              }
              category {
                name
              }
              level {
                name
              }
              trophies {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassNumber: '1056',
        })
      expect(response.data.festivalClassByNumber.classNumber).toBe('1056')
      expect(response.data.festivalClassByNumber.description).toBeTruthy()
      expect(response.data.festivalClassByNumber.level.name).toBeTruthy()
    })

    it('Will return error if number does not exist.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClass($festivalClassNumber: String!) {
            festivalClassByNumber(festivalClassNumber: $festivalClassNumber) {
              id
              classNumber
              description
              performerType
              subdiscipline {
                name
              }
              category {
                name
              }
              level {
                name
              }
              trophies {
                name
              }
            }
          }
        `)
        .variables({
          festivalClassNumber: '1060',
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Festival Class by ID', () => {
    let response: any

    it('Can provide a single festival by ID.', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClass($festivalClassId: Int!) {
            festivalClass(id: $festivalClassId) {
              id
              classNumber
              description
              performerType
              subdiscipline {
                name
              }
              category {
                name
              }
              level {
                name
              }
              trophies {
                name
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassId: 1094,
        })
      expect(response.data.festivalClass.classNumber).toBeTruthy()
      expect(response.data.festivalClass.classNumber).not.toBe(1094)
    })
    it('Returns error when no festivalClass is found', async () => {
      response = await request<{ festivalClasses: FestivalClass[] }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query FestivalClass($festivalClassId: Int!) {
            festivalClass(id: $festivalClassId) {
              id
              classNumber
              description
              performerType
              subdiscipline {
                name
              }
              category {
                name
              }
              level {
                name
              }
              trophies {
                name
              }
            }
          }
        `)
        .variables({
          festivalClassId: 4000,
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let festivalClassId: number

    afterAll(async () => {
      await globalThis.prisma.tbl_classlist.delete({
        where: { id: festivalClassId },
      })
    })

    it('Successfully creates a festivalClass using FestivalClassInput', async () => {
      response = await request<{ festivalClassCreate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass(
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
                performerType
                price
                subdiscipline {
                  name
                }
                category {
                  name
                }
                level {
                  name
                }
                classType {
                  name
                }
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassInput: {
            classNumber: 'testNumber',
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 152,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 120.0,
            requiredSelection: 'Test Selection',
          },
        })

      festivalClassId
        = await response.data.festivalClassCreate.festivalClass.id
      expect(response.data.festivalClassCreate.festivalClass.classNumber).toBe(
        'testNumber',
      )
      expect(response.data.festivalClassCreate.festivalClass.description).toBe(
        'Test description for grade 10 honours bassoon',
      )
    })

    it('Returns error if trying to add duplicate festivalClass number', async () => {
      response = await request<{ festivalClassCreate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass(
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
                performerType
                price
                subdiscipline {
                  name
                }
                category {
                  name
                }
                level {
                  name
                }
                classType {
                  name
                }
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassInput: {
            classNumber: 'testNumber',
            categoryID: 23,
            levelID: 39,
            subdisciplineID: 152,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 120.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(
        response.data.festivalClassCreate.userErrors[0].message,
      ).toBeTruthy()
      expect(response.data.festivalClassCreate.festivalClass).toBeNull()
    })

    it('Returns error if trying to add different number with duplicate category/level/discipline', async () => {
      response = await request<{ festivalClassCreate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass(
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
                performerType
                price
                subdiscipline {
                  name
                }
                category {
                  name
                }
                level {
                  name
                }
                classType {
                  name
                }
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassInput: {
            classNumber: 'testNumber with duplicate category/level/discipline',
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 152,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 120.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(
        response.data.festivalClassCreate.userErrors[0].message,
      ).toBeTruthy()
      expect(response.data.festivalClassCreate.festivalClass).toBeNull()
    })

    it('Returns error if trying to add class with missing input fields', async () => {
      response = await request<{ festivalClassCreate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass(
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
                performerType
                price
                subdiscipline {
                  name
                }
                category {
                  name
                }
                level {
                  name
                }
                classType {
                  name
                }
              }
            }
          }
        `)
        .variables({
          festivalClassInput: {
            classNumber: 'testNumber with missing input fields',
            categoryID: 23,
            levelID: 40,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 120.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns error if trying to add class with improper data', async () => {
      response = await request<{ festivalClassCreate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass(
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
                performerType
                price
                subdiscipline {
                  name
                }
                category {
                  name
                }
                level {
                  name
                }
                classType {
                  name
                }
              }
            }
          }
        `)
        .variables({
          festivalClassInput: {
            classNumber: 'testNumber with improper data',
            categoryID: 23,
            levelID: 10101010,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 120.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })
  })

  describe('Updating', () => {
    let response: any
    let festClassId: number

    beforeEach(async () => {
      response = await request<{ festivalClassCreate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass(
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
                performerType
                price
                subdiscipline {
                  name
                }
                category {
                  name
                }
                level {
                  name
                }
                classType {
                  name
                }
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassInput: {
            classNumber: 'testNumber',
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 152,
            classTypeID: 1,
            description: 'Test updatedescription for grade 10 honours bassoon',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 120.0,
            requiredSelection: 'Test Selection',
          },
        })
      festClassId = await response.data.festivalClassCreate.festivalClass.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_classlist.delete({
          where: { id: festClassId },
        })
      }
      catch (error: any) {
        if (error.code === 'P2025') {
          console.error(error)
        }
      }
    })

    it('Can update details of existing festival class', async () => {
      response = await request<{ festivalClassUpdate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation FestivalClassUpdate(
            $festivalClassId: Int!
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassUpdate(
              festivalClassID: $festivalClassId
              festivalClassInput: $festivalClassInput
            ) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassId: festClassId,
          festivalClassInput: {
            classNumber: 'testUpdate',
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 153,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 1,
            minSelections: 1,
            performerType: 'GROUP',
            price: 60.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(response.data.festivalClassUpdate.festivalClass.classNumber).toBe(
        'testUpdate',
      )
      expect(
        response.data.festivalClassUpdate.festivalClass.description,
      ).toBeTruthy()
    })

    it('Returns error when removing required field', async () => {
      response = await request<{ festivalClassUpdate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation FestivalClassUpdate(
            $festivalClassId: Int!
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassUpdate(
              festivalClassID: $festivalClassId
              festivalClassInput: $festivalClassInput
            ) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
              }
            }
          }
        `)
        .variables({
          festivalClassId: festClassId,
          festivalClassInput: {
            classNumber: 'testUpdate',
            categoryID: null,
            levelID: 40,
            subdisciplineID: 153,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 1,
            minSelections: 1,
            performerType: 'GROUP',
            price: 60.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns error when entering empty class number', async () => {
      response = await request<{ festivalClassUpdate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation FestivalClassUpdate(
            $festivalClassId: Int!
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassUpdate(
              festivalClassID: $festivalClassId
              festivalClassInput: $festivalClassInput
            ) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
              }
            }
          }
        `)
        .variables({
          festivalClassId: festClassId,
          festivalClassInput: {
            classNumber: '',
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 153,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 1,
            minSelections: 1,
            performerType: 'GROUP',
            price: 60.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(response.errors[0].message).toBeTruthy()
    })

    it('Returns error if festival class not found', async () => {
      response = await request<{ festivalClassUpdate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation FestivalClassUpdate(
            $festivalClassId: Int!
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassUpdate(
              festivalClassID: $festivalClassId
              festivalClassInput: $festivalClassInput
            ) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
              }
            }
          }
        `)
        .variables({
          festivalClassId: festClassId + 1,
          festivalClassInput: {
            classNumber: 'testUpdate',
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 153,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 1,
            minSelections: 1,
            performerType: 'GROUP',
            price: 60.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(
        response.data.festivalClassUpdate.userErrors[0].message,
      ).toBeTruthy()
    })

    it('Improper input returns error', async () => {
      response = await request<{ festivalClassUpdate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation FestivalClassUpdate(
            $festivalClassId: Int!
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassUpdate(
              festivalClassID: $festivalClassId
              festivalClassInput: $festivalClassInput
            ) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
              }
            }
          }
        `)
        .variables({
          festivalClassId: festClassId,
          festivalClassInput: {
            classNumber: 'testUpdate',
            categoryID: 23,
            levelID: 400000,
            subdisciplineID: 153,
            classTypeID: 1,
            description: 'Test description for grade 10 honours bassoon',
            maxSelections: 1,
            minSelections: 1,
            performerType: 'GROUP',
            price: 60.0,
            requiredSelection: 'Test Selection',
          },
        })
      expect(
        response.data.festivalClassUpdate.userErrors[0].message,
      ).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let festClassId: number

    beforeEach(async () => {
      response = await request<{ festivalClassCreate: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateFestivalClass(
            $festivalClassInput: FestivalClassInput!
          ) {
            festivalClassCreate(festivalClassInput: $festivalClassInput) {
              userErrors {
                message
                field
              }
              festivalClass {
                id
                classNumber
                description
                performerType
                price
                subdiscipline {
                  name
                }
                category {
                  name
                }
                level {
                  name
                }
                classType {
                  name
                }
              }
            }
          }
        `)
        .expectNoErrors()
        .variables({
          festivalClassInput: {
            classNumber: 'testNumber',
            categoryID: 23,
            levelID: 40,
            subdisciplineID: 152,
            classTypeID: 1,
            description: 'Test updatedescription for grade 10 honours bassoon',
            maxSelections: 3,
            minSelections: 2,
            performerType: 'SOLO',
            price: 120.0,
            requiredSelection: 'Test Selection',
          },
        })
      festClassId = await response.data.festivalClassCreate.festivalClass.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_classlist.delete({
          where: { id: festClassId },
        })
      }
      catch (error: any) {
        if (error.code !== 'P2025') {
          console.error(error)
        }
      }
    })

    it('Deletes a festival class using the festivalClassID', async () => {
      response = await request<{ festivalClassDelete: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation FestivalClassDelete($festivalClassId: Int!) {
            festivalClassDelete(festivalClassID: $festivalClassId) {
              userErrors {
                message
              }
              festivalClass {
                id
                classNumber
                description
              }
            }
          }
        `)
        .variables({
          festivalClassId: festClassId,
        })
      const deleteCheck = await globalThis.prisma.tbl_classlist.findUnique({
        where: { id: festClassId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.festivalClassDelete.festivalClass.classNumber).toBe(
        'testNumber',
      )
    })

    it('Return error message is festival class not found', async () => {
      response = await request<{ festivalClassDelete: FestivalClassPayload }>(
        globalThis.httpServer,
      )
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation FestivalClassDelete($festivalClassId: Int!) {
            festivalClassDelete(festivalClassID: $festivalClassId) {
              userErrors {
                message
              }
              festivalClass {
                id
                classNumber
                description
              }
            }
          }
        `)
        .variables({
          festivalClassId: festClassId + 1,
        })
      expect(
        response.data.festivalClassDelete.userErrors[0].message,
      ).toBeTruthy()
      expect(response.data.festivalClassDelete.festivalClass).toBeNull()
    })
  })
})
