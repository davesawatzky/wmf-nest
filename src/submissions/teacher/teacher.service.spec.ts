import { Test, TestingModule } from '@nestjs/testing'
import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  it,
  expect,
} from 'vitest'
import { TeacherService } from './teacher.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('TeacherService', () => {
  let service: TeacherService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherService, PrismaService],
    }).compile()

    service = module.get<TeacherService>(TeacherService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
