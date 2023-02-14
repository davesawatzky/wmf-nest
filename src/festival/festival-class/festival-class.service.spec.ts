import { Test, TestingModule } from '@nestjs/testing'
import { FestivalClassService } from './festival-class.service'

describe('FestivalClassService', () => {
  let service: FestivalClassService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FestivalClassService],
    }).compile()

    service = module.get<FestivalClassService>(FestivalClassService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
