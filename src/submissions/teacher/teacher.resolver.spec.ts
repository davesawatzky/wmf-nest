import { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { TeacherResolver } from './teacher.resolver'
import { TeacherService } from './teacher.service'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('teacherResolver', () => {
  let resolver: TeacherResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherResolver,
        TeacherService,
        RegistrationService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<TeacherResolver>(TeacherResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
