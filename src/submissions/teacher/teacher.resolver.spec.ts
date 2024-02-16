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
import { TeacherResolver } from './teacher.resolver'
import { TeacherService } from './teacher.service'
import { RegistrationService } from '../registration/registration.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('TeacherResolver', () => {
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
