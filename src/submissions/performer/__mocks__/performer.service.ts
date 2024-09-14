import { PerformerService } from '../performer.service'
import { performerStub } from '../stubs/performer.stub'

export const performerService: Partial<PerformerService> = {
  create: vi.fn().mockReturnValue({
    userErrors: [],
    performer: performerStub(),
  }),
  findOne: vi.fn().mockReturnValue(performerStub()),
  update: vi.fn().mockReturnValue(performerStub()),
  remove: vi.fn().mockReturnValue(performerStub()),
}
