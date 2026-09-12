import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service.js'
import { CommunityService } from '@/submissions/community/community.service.js'
import { GroupService } from '@/submissions/group/group.service.js'
import { PerformerService } from '@/submissions/performer/performer.service.js'
import { RegisteredClassService } from '@/submissions/registered-class/registered-class.service.js'
import { SchoolService } from '@/submissions/school/school.service.js'
import { TeacherService } from '@/submissions/teacher/teacher.service.js'
import { UserService } from '@/user/user.service.js'
import { RegistrationResolver } from '../registration.resolver.js'
import { RegistrationService } from '../registration.service.js'

describe('registrationResolver', () => {
  let resolver: RegistrationResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationResolver,
        RegistrationService,
        PerformerService,
        UserService,
        RegisteredClassService,
        GroupService,
        CommunityService,
        SchoolService,
        TeacherService,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<RegistrationResolver>(RegistrationResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
