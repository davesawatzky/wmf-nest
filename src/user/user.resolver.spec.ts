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
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { RegistrationService } from 'src/submissions/registration/registration.service'
import { AbilityFactory } from 'src/ability/ability.factory'
import { PrismaService } from 'src/prisma/prisma.service'

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        RegistrationService,
        AbilityFactory,
        PrismaService,
      ],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
