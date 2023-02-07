import { Test, TestingModule } from '@nestjs/testing'
import { TrophyResolver } from './trophy.resolver'
import { TrophyService } from './trophy.service'

describe('TrophyResolver', () => {
  let resolver: TrophyResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrophyResolver, TrophyService],
    }).compile()

    resolver = module.get<TrophyResolver>(TrophyResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
