import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { AbilityFactory } from '@/ability/ability.factory.js'
import { PrismaService } from '@/prisma/prisma.service.js'
import { RegistrationService } from '@/submissions/registration/registration.service.js'
import { UserResolver } from '../user.resolver.js'
import { UserService } from '../user.service.js'

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
