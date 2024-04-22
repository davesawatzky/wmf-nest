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
import { RegistrationResolver } from '../registration.resolver'
import { RegistrationService } from '../registration.service'
import { PerformerService } from '@/submissions/performer/performer.service'
import { UserService } from '@/user/user.service'
import { RegisteredClassService } from '@/submissions/registered-class/registered-class.service'
import { GroupService } from '@/submissions/group/group.service'
import { CommunityService } from '@/submissions/community/community.service'
import { SchoolService } from '@/submissions/school/school.service'
import { TeacherService } from '@/submissions/teacher/teacher.service'
import { PrismaService } from '@/prisma/prisma.service'

describe('RegistrationResolver', () => {
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
