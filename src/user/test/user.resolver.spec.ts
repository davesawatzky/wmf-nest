import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { AbilityFactory } from '@/ability/ability.factory'
import { PrismaService } from '@/prisma/prisma.service'
import { RegistrationService } from '@/submissions/registration/registration.service'
import { UserResolver } from '../user.resolver'
import { UserService } from '../user.service'

describe('userResolver', () => {
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
