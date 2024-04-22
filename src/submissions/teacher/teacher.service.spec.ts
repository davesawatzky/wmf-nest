import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { TeacherService } from './teacher.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('teacherService', () => {
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
