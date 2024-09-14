import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { ClassType, ClassTypePayload } from '../entities/class-type.entity'

describe('ClassType', () => {
  describe('Listing ClassTypes', () => {
    let response: any

    it('Can provide a list of all classTypes', async () => {
      response = await request<{ classTypes: ClassType[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query ClassTypes {
            classTypes {
              description
              id
              name 
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.classTypes).toBeTruthy()
    })

    it('Can provide a list of all classTypes with associated festival classes', async () => {
      response = await request<{ classTypes: ClassType[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query ClassTypes {
            classTypes {
              description
              id
              name 
              festivalClasses {
                classNumber
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.classTypes).toBeTruthy()
      expect(response.data.classTypes[0].festivalClasses[0].classNumber).toBeTruthy()
    })
  })

  describe('Individual ClassType', () => {
    let response: any

    it('Find classType using proper ID', async () => {
      response = await request<{ classType: ClassType }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query ClassType($classTypeId: Int!) {
            classType(id: $classTypeId) {
              id
              name
              description
            }
          }
        `)
        .variables({
          classTypeId: 2,
        })
      expect(response.data.classType.name).toBe('(E) CLASS')
    })

    it('Returns error when no individual class type found', async () => {
      response = await request<{ classType: ClassType }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query ClassType($classTypeId: Int!) {
            classType(id: $classTypeId) {
              id
              name
              description
            }
          }
        `)
        .variables({
          classTypeId: 10000,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let classTypeId: number

    afterAll(async () => {
      await globalThis.prisma.tbl_class_type.delete({
        where: {
          id: classTypeId,
        },
      })
    })

    it('Successfully creates a classType using ClassTypeInput', async () => {
      response = await request<{ classTypeCreate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateClassType($classTypeInput: ClassTypeInput!) {
          classTypeCreate(classTypeInput: $classTypeInput) {
            userErrors {
            message
          }
          classType {
            id
            name
            description
          }
        }
      }`)
        .variables({
          classTypeInput: {
            name: 'Brand New Class',
            description: 'Really Brand New Class',
          },
        })
      classTypeId = response.data.classTypeCreate.classType.id
      expect(response.data.classTypeCreate.classType.name).toBe('Brand New Class')
      expect(response.data.classTypeCreate.classType.id).toBeTruthy()
    })

    it('Returns error if trying to add duplicate classType name', async () => {
      response = await request<{ classTypeCreate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateClassType($classTypeInput: ClassTypeInput!) {
          classTypeCreate(classTypeInput: $classTypeInput) {
            userErrors {
            message
          }
          classType {
            id
            name
          }
        }
      }`)
        .variables({
          classTypeInput: {
            name: 'Brand New Class',
            description: '2nd times the charm',
          },
        })
      expect(response.data.classTypeCreate.userErrors[0]).toBeTruthy()
      expect(response.data.classTypeCreate.classType).toBeNull()
    })

    it('Improper input returns error', async () => {
      response = await request<{ classTypeCreate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateClassType($classTypeInput: ClassTypeInput!) {
          classTypeCreate(classTypeInput: $classTypeInput) {
            userErrors {
            message
          }
          classType {
            id
            name
          }
        }
      }`)
        .variables({
          classTypeInput: {
            name: null,
            description: 'Really Brand New Class',
          },
        })
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Update', () => {
    let response: any
    let classTypeID: number

    beforeEach(async () => {
      response = await request<{ classTypeCreate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateClassType($classTypeInput: ClassTypeInput!) {
          classTypeCreate(classTypeInput: $classTypeInput) {
            userErrors {
            message
          }
          classType {
            id
            name
            description
          }
        }
      }`)
        .variables({
          classTypeInput: {
            name: 'Brand New Class',
            description: 'Really Brand New Class',
          },
        })
      classTypeID = await response.data.classTypeCreate.classType.id
    })

    afterEach(async () => {
      await globalThis.prisma.tbl_class_type.delete({
        where: {
          id: classTypeID,
        },
      })
    })

    it('Update details of existing classType', async () => {
      response = await request<{ classTypeUpdate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation ClassTypeUpdate($classTypeId: Int!, $classTypeInput: ClassTypeInput!){
          classTypeUpdate(classTypeID: $classTypeId, classTypeInput: $classTypeInput) {
            userErrors {
              message
            }
            classType {
              id
              name
              description
            }
          }
      }`)
        .variables({
          classTypeId: classTypeID,
          classTypeInput: {
            name: 'Updated Class',
          },
        })
      expect(response.data.classTypeUpdate.classType.name).toBe('Updated Class')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if classType not found', async () => {
      response = await request<{ classTypeUpdate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation ClassTypeUpdate($classTypeId: Int!, $classTypeInput: ClassTypeInput!){
          classTypeUpdate(classTypeID: $classTypeId, classTypeInput: $classTypeInput) {
            userErrors {
              message
            }
            classType {
              id
              name
              description
            }
          }
      }`)
        .variables({
          classTypeId: classTypeID + 1,
          classTypeInput: {
            name: 'Brand New Class',
          },
        })
      expect(response.data.classTypeUpdate.classType).toBeNull()
      expect(response.data.classTypeUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null in update', async () => {
      response = await request<{ classTypeUpdate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation ClassTypeUpdate($classTypeId: Int!, $classTypeInput: ClassTypeInput!){
          classTypeUpdate(classTypeID: $classTypeId, classTypeInput: $classTypeInput) {
            userErrors {
              message
            }
            classType {
              id
              name
              description
            }
          }
      }`)
        .variables({
          classTypeId: classTypeID,
          classTypeInput: {
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
    let classTypeId: number
    beforeEach(async () => {
      response = await request<{ classTypeCreate: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateClassType($classTypeInput: ClassTypeInput!) {
          classTypeCreate(classTypeInput: $classTypeInput) {
            userErrors {
            message
          }
          classType {
            id
            name
          }
        }
      }`)
        .variables({
          classTypeInput: {
            name: 'Brand New Class',
            description: 'Really Brand New Class',
          },
        })
      classTypeId = response.data.classTypeCreate.classType.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_class_type.delete({
          where: {
            id: classTypeId,
          },
        })
      }
      catch (error) {}
    })

    it('Deletes a classType using the classTypeID', async () => {
      response = await request<{ classTypeDelete: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation ClassTypeDelete($classTypeDeleteId: Int!) {
          classTypeDelete(classTypeID: $classTypeDeleteId) {
            userErrors {
              message
            }
              classType {
            id
            name
            description
          }
        }
      }`)
        .variables({
          classTypeDeleteId: classTypeId,
        })
      const deleteCheck = await globalThis.prisma.tbl_class_type.findUnique({
        where: { id: classTypeId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.classTypeDelete.classType.name).toBe('Brand New Class')
    })

    it('Returns error message if classType not found', async () => {
      response = await request<{ classTypeDelete: ClassTypePayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation ClassTypeDelete($classTypeDeleteId: Int!) {
          classTypeDelete(classTypeID: $classTypeDeleteId) {
            userErrors {
              message
            }
              classType {
            id
            name
            description
          }
        }
      }`)
        .variables({
          classTypeDeleteId: classTypeId + 1,
        })
      expect(response.data.classTypeDelete.classType).toBeNull()
      expect(response.data.classTypeDelete.userErrors[0].message).toBeTruthy()
    })
  })
})
