import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { RegistrationService } from '@/submissions/registration/registration.service.js'
import { TeacherResolver } from '../teacher.resolver.js'
import { TeacherService } from '../teacher.service.js'

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
