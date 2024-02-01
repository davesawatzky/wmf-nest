import { Performer } from '../entities/performer.entity'

export const performerStub = (): Performer => {
  return {
    id: 1,
    firstName: 'John',
    lastName: 'Malkovich',
    age: 18,
    apartment: null,
    streetNumber: '354',
    streetName: 'Beamont Ave',
    city: 'Virgil',
    province: 'ON',
    postalCode: 'L0S 1T0',
    email: 'performer@test.com',
    instrument: 'clarinet',
    level: '8th level',
    otherClasses: null,
    phone: '(204) 243-6875',
  }
}
