import { Test, TestingModule } from '@nestjs/testing'
import { FestivalClassResolver } from './festival-class.resolver'
import { FestivalClassService } from './festival-class.service'

describe('FestivalClassResolver', () => {
  let resolver: FestivalClassResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FestivalClassResolver, FestivalClassService],
    }).compile()

    resolver = module.get<FestivalClassResolver>(FestivalClassResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
