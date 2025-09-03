import { Performer } from '../entities/performer.entity'

export function performerStub(): Performer {
  return {
    id: 1,
    pronouns: 'He/Him',
    firstName: 'John',
    lastName: 'Malkovich',
    age: 18,
    address: '354 Beamont Ave',
    city: 'Virgil',
    province: 'ON',
    postalCode: 'L0S 1T0',
    email: 'performer@test.com',
    instrument: 'clarinet',
    level: '8th level',
    unavailable: null,
    otherClasses: null,
    phone: '(204) 243-6875',
  }
}
