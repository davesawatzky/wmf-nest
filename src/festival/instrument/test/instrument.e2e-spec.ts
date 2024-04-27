import gql from 'graphql-tag'
import request from 'supertest-graphql'
import { Instrument, InstrumentPayload } from '../entities/instrument.entity'

describe('Instrument', () => {
  describe('Listing Instruments', () => {
    let response: any

    it('Can provide a list of all instruments', async () => {
      response = await request<{ instruments: Instrument[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Instruments {
            instruments {
              id
              name 
              mozart
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.instruments).toBeTruthy()
    })

    it('Can provide a list of all instruments with associated discipline', async () => {
      response = await request<{ instruments: Instrument[] }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Instruments {
            instruments {
              id
              name 
              mozart
              discipline {
                name
              }
            }
          }
        `)
        .expectNoErrors()
      expect(response.data.instruments).toBeTruthy()
      expect(response.data.instruments[0].discipline.name).toBeTruthy()
    })
  })

  describe('Individual Instrument', () => {
    let response: any

    it('Find instrument using proper ID', async () => {
      response = await request<{ instrument: Instrument }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Instrument($instrumentId: Int!) {
            instrument(id: $instrumentId) {
              id
              name
              mozart
            }
          }
        `)
        .variables({
          instrumentId: 2,
        })
      expect(response.data.instrument.name).toBeTruthy()
    })

    it('Returns error when no individual class type found', async () => {
      response = await request<{ instrument: Instrument }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .query(gql`
          query Instrument($instrumentId: Int!) {
            instrument(id: $instrumentId) {
              id
              name
              mozart
            }
          }
        `)
        .variables({
          instrumentId: 10000,
        })
      expect(response.errors).toBeTruthy()
    })
  })

  describe('Create', () => {
    let response: any
    let instrumentId: number

    afterAll(async () => {
      await globalThis.prisma.tbl_instruments.delete({
        where: {
          id: instrumentId,
        },
      })
    })

    it('Successfully creates a instrument using InstrumentInput', async () => {
      response = await request<{ instrumentCreate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
          instrumentCreate(instrumentInput: $instrumentInput) {
            userErrors {
            message
          }
          instrument {
            id
            name
            mozart
          }
        }
      }`)
        .variables({
          instrumentInput: {
            name: 'Kazoo',
            mozart: true,
          },
        })
      instrumentId = response.data.instrumentCreate.instrument.id
      expect(response.data.instrumentCreate.instrument.name).toBe('Kazoo')
      expect(response.data.instrumentCreate.instrument.id).toBeTruthy()
    })

    it('Returns error if trying to add duplicate instrument name', async () => {
      response = await request<{ instrumentCreate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
          instrumentCreate(instrumentInput: $instrumentInput) {
            userErrors {
            message
          }
          instrument {
            id
            name
            mozart
          }
        }
      }`)
        .variables({
          instrumentInput: {
            name: 'Kazoo',
            mozart: true,
          },
        })
      expect(response.data.instrumentCreate.userErrors[0]).toBeTruthy()
      expect(response.data.instrumentCreate.instrument).toBeNull()
    })

    it('Improper input returns error', async () => {
      response = await request<{ instrumentCreate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
          instrumentCreate(instrumentInput: $instrumentInput) {
            userErrors {
            message
          }
          instrument {
            id
            name
            mozart
          }
        }
      }`)
        .variables({
          instrumentInput: {
            name: null,
          },
        })
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Update', () => {
    let response: any
    let instrumentID: number

    beforeEach(async () => {
      response = await request<{ instrumentCreate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
          instrumentCreate(instrumentInput: $instrumentInput) {
            userErrors {
            message
          }
          instrument {
            id
            name
            mozart
          }
        }
      }`)
        .variables({
          instrumentInput: {
            name: 'Kazoo',
            mozart: true,
          },
        })
      instrumentID = await response.data.instrumentCreate.instrument.id
    })

    afterEach(async () => {
      await globalThis.prisma.tbl_instruments.delete({
        where: {
          id: instrumentID,
        },
      })
    })

    it('Update details of existing instrument', async () => {
      response = await request<{ instrumentUpdate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation InstrumentUpdate($instrumentId: Int!, $instrumentInput: InstrumentInput!){
          instrumentUpdate(instrumentID: $instrumentId, instrumentInput: $instrumentInput) {
            userErrors {
              message
            }
            instrument {
              id
              name
              mozart
            }
          }
      }`)
        .variables({
          instrumentId: instrumentID,
          instrumentInput: {
            name: 'Didjouridoo',
          },
        })
      expect(response.data.instrumentUpdate.instrument.name).toBe('Didjouridoo')
      expect(response.errors).not.toBeDefined()
    })

    it('Returns error if instrument not found', async () => {
      response = await request<{ instrumentUpdate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation InstrumentUpdate($instrumentId: Int!, $instrumentInput: InstrumentInput!){
          instrumentUpdate(instrumentID: $instrumentId, instrumentInput: $instrumentInput) {
            userErrors {
              message
            }
            instrument {
              id
              name
              mozart
            }
          }
      }`)
        .variables({
          instrumentId: instrumentID + 1,
          instrumentInput: {
            name: 'Kazoo',
          },
        })
      expect(response.data.instrumentUpdate.instrument).toBeNull()
      expect(response.data.instrumentUpdate.userErrors[0].message).toBeTruthy()
    })

    it('Returns error if name is null in update', async () => {
      response = await request<{ instrumentUpdate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation InstrumentUpdate($instrumentId: Int!, $instrumentInput: InstrumentInput!){
          instrumentUpdate(instrumentID: $instrumentId, instrumentInput: $instrumentInput) {
            userErrors {
              message
            }
            instrument {
              id
              name
              mozart
            }
          }
      }`)
        .variables({
          instrumentId: instrumentID,
          instrumentInput: {
            name: null,
          },
        })
      expect(response.data).toBeFalsy()
      expect(response.errors[0]).toBeTruthy()
    })
  })

  describe('Delete', () => {
    let response: any
    let instrumentId: number
    beforeEach(async () => {
      response = await request<{ instrumentCreate: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
          mutation CreateInstrument($instrumentInput: InstrumentInput!) {
          instrumentCreate(instrumentInput: $instrumentInput) {
            userErrors {
            message
          }
          instrument {
            id
            name
            mozart
          }
        }
      }`)
        .variables({
          instrumentInput: {
            name: 'Kazoo',
            mozart: true,

          },
        })
      instrumentId = response.data.instrumentCreate.instrument.id
    })

    afterEach(async () => {
      try {
        await globalThis.prisma.tbl_instruments.delete({
          where: {
            id: instrumentId,
          },
        })
      }
      catch (error) {}
    })

    it('Deletes an instrument using the instrumentID', async () => {
      response = await request<{ instrumentDelete: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation InstrumentDelete($instrumentDeleteId: Int!) {
          instrumentDelete(instrumentID: $instrumentDeleteId) {
            userErrors {
              message
            }
              instrument {
            id
            name
            mozart
          }
        }
      }`)
        .variables({
          instrumentDeleteId: instrumentId,
        })
      const deleteCheck = await globalThis.prisma.tbl_instruments.findUnique({
        where: { id: instrumentId },
      })
      expect(deleteCheck).toBeNull()
      expect(response.data.instrumentDelete.instrument.name).toBe('Kazoo')
    })

    it('Returns error message if instrument not found', async () => {
      response = await request<{ instrumentDelete: InstrumentPayload }>(globalThis.httpServer)
        .set('Cookie', `diatonicToken=${globalThis.diatonicToken}`)
        .mutate(gql`
        mutation InstrumentDelete($instrumentDeleteId: Int!) {
          instrumentDelete(instrumentID: $instrumentDeleteId) {
            userErrors {
              message
            }
            instrument {
              id
              name
              mozart
              }
            }
          }`)
        .variables({
          instrumentDeleteId: instrumentId + 1,
        })
      expect(response.data.instrumentDelete.instrument).toBeNull()
      expect(response.data.instrumentDelete.userErrors[0].message).toBeTruthy()
    })
  })
})
