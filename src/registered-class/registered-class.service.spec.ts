import { Test, TestingModule } from '@nestjs/testing'
import { RegisteredClassService } from './registered-class.service'

describe('RegisteredClassService', () => {
  let service: RegisteredClassService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisteredClassService],
    }).compile()

    service = module.get<RegisteredClassService>(RegisteredClassService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
