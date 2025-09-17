import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { PrismaService } from '@/prisma/prisma.service'
import { CommunityService } from '@/submissions/community/community.service'
import { GroupService } from '@/submissions/group/group.service'
import { PerformerService } from '@/submissions/performer/performer.service'
import { RegisteredClassService } from '@/submissions/registered-class/registered-class.service'
import { SchoolService } from '@/submissions/school/school.service'
import { TeacherService } from '@/submissions/teacher/teacher.service'
import { UserService } from '@/user/user.service'
import { RegistrationResolver } from '../registration.resolver'
import { RegistrationService } from '../registration.service'

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
