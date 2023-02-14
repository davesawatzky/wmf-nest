import { Test, TestingModule } from '@nestjs/testing'
import { SubdisciplineService } from './subdiscipline.service'

describe('SubdisciplineService', () => {
  let service: SubdisciplineService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdisciplineService],
    }).compile()

    service = module.get<SubdisciplineService>(SubdisciplineService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
