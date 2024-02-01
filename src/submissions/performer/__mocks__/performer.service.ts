import { Mock } from 'vitest'
import type { Performer } from '../entities/performer.entity'
import { performerStub } from '../stubs/performer.stub'
import { PerformerService } from '../performer.service'

export const performerService: Partial<PerformerService> = {
  create: vi.fn().mockReturnValue({
    userErrors: [],
    performer: performerStub(),
  }),
  findOne: vi.fn().mockReturnValue(performerStub()),
  update: vi.fn().mockReturnValue(performerStub()),
  remove: vi.fn().mockReturnValue(performerStub()),
}
