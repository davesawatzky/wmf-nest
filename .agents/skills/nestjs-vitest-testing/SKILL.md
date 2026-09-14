---
name: nestjs-vitest-testing
description: Use when writing or changing unit tests (*.spec.ts) or integration/e2e tests (*.e2e-spec.ts) with Vitest in this NestJS GraphQL backend, including PrismaService mocking, resolver tests, supertest-graphql queries/mutations, testWithBothRoles, and test setup infrastructure.
license: UNLICENSED
metadata:
  author: wmf-nest
  version: '1.0.0'
---

# NestJS Testing with Vitest

This backend already has extensive test coverage. Match the existing patterns below instead of inventing new ones.

## Two test types

- **Unit tests**: `*.spec.ts`, colocated in a `test/` folder next to the module they cover (e.g. `src/festival/discipline/test/discipline.service.spec.ts`). Run with `pnpm test`. Config: [vitest.config.mts](../../../vitest.config.mts).
- **Integration/e2e tests**: `*.e2e-spec.ts`, colocated the same way (e.g. `src/festival/discipline/test/discipline.e2e-spec.ts`). Run with `pnpm test:e2e`. Config: [vitest.config.e2e.mts](../../../vitest.config.e2e.mts). These boot the real `AppModule` against the test database and exercise the app over `supertest-graphql`.

Both configs use `globals: false`, so import `describe`, `it`, `expect`, `beforeEach`, `beforeAll`, `afterEach`, `afterAll` from `'vitest'` explicitly in every test file. `vi` is available without an import.

## Unit tests (`*.spec.ts`)

Build the module with `Test.createTestingModule` and the real `PrismaService`/dependencies as providers — do not create a full deep mock of `PrismaService`. Instead, stub individual Prisma methods per test with `vi.fn()`:

```typescript
import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'

import { PrismaService } from '@/prisma/prisma.service.js'

import { AuthService } from '../auth.service.js'

describe('authService', () => {
  let authService: AuthService
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
    prisma = moduleRef.get<PrismaService>(PrismaService)
  })

  it('should return error message if the user already exists', async () => {
    prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(existingUser)
    const result = await authService.signup(credentials)
    expect(result.user).toBeNull()
    expect(result.userErrors[0].message).toBeTruthy()
  })
})
```

Resolver unit tests build the module with the resolver plus its real service/DataLoader dependencies and `PrismaService`, then assert `expect(resolver).toBeDefined()` at minimum, adding method-level tests the same way as service tests when the resolver has logic beyond delegation.

Guard, pipe, and filter unit tests instantiate the class directly (`new SomeGuard()`) without a testing module when they have no injected dependencies. Use [gqlMockFactory.ts](../../../src/test/gqlMockFactory.ts)'s `mockContext()` to build a fake `GqlExecutionContext` when a guard needs one.

Every unit test file should include at minimum an `it('should be defined', ...)` smoke test, then add behavior-specific tests for branches, error paths, and edge cases in the service/resolver being changed.

## Integration/e2e tests (`*.e2e-spec.ts`)

The e2e suite shares one NestJS app instance across all e2e-spec files via:

- [globalSetup_e2e.ts](../../../src/test/globalSetup_e2e.ts): runs once before the whole e2e run, boots `AppModule`, and seeds persistent `admin`/`user` accounts via `AuthService.signup`.
- [integrationTestSetup.ts](../../../src/test/integrationTestSetup.ts): `beforeAll`/`afterAll` per file, mocks `EmailConfirmationService` (via [createMockEmailConfirmationService](../../../src/email-confirmation/test/mocks/index.ts)) so no real SMTP is sent, applies the same middleware as `main.ts` (cookie-parser, helmet, CORS, `ValidationPipe`), and populates `globalThis.testContext` with authenticated `admin`/`user` tokens.
- [testHelpers.ts](../../../src/test/testHelpers.ts): `createAuthenticatedRequest(role)` returns a `supertest-graphql` request signed in as `'admin' | 'user' | 'privateTeacher' | 'schoolTeacher'`; `testWithBothRoles(name, fn)` runs `fn` once per role and returns `{ admin, user }`.
  The `privateTeacher` and `schoolTeacher` accounts are not seeded globally; create them in the spec's `beforeAll` via `AuthService.signup`, delete them in `afterAll`, and sign in with `createAuthenticatedRequest(role)`. `testWithBothRoles` only covers `admin` and `user`; write separate `it` blocks for teacher roles.

Write GraphQL operations with the `gql` tag from `graphql-tag` and send them through `createAuthenticatedRequest`:

```typescript
import { gql } from 'graphql-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAuthenticatedRequest, testWithBothRoles } from '@/test/testHelpers.js'

describe('Discipline E2E Tests', () => {
  it('Should list all disciplines for both roles', async () => {
    const results = await testWithBothRoles('list disciplines', async (role) => {
      const response = (await createAuthenticatedRequest(role)
        .query(gql`
          query GetDisciplines($performerType: PerformerType) {
            disciplines(performerType: $performerType) {
              id
              name
            }
          }
        `)
        .variables({ performerType: null })
        .expectNoErrors()) as { data: { disciplines: Discipline[] } }

      return { count: response.data.disciplines?.length || 0 }
    })

    expect(results.admin.count).toBeGreaterThan(0)
    expect(results.user.count).toBe(results.admin.count)
  })
})
```

For mutations, follow the `userErrors` payload pattern instead of `.expectNoErrors()`, since business-rule failures are returned as data, not GraphQL errors:

```typescript
const response = await createAuthenticatedRequest(role)
  .mutate(gql`
    mutation CreateRegistration($performerType: PerformerType!, $label: String!) {
      registrationCreate(performerType: $performerType, label: $label) {
        userErrors {
          message
        }
        registration {
          id
        }
      }
    }
  `)
  .variables({ performerType: 'SOLO', label: 'Test' })

expect(response.data?.registrationCreate?.userErrors).toHaveLength(0)
```

When a test expects an authorization failure or invalid input, assert on GraphQL `errors` (`response.errors`) with `expectUnauthorized`/`expectAuthorized` from [testHelpers.ts](../../../src/test/testHelpers.ts), and on the `userErrors` array for domain-rule failures.

### Data isolation

- Create and clean up e2e fixture data in `beforeAll`/`afterAll` scoped to the test file; never rely on data from another `*.e2e-spec.ts` file.
- Prefix fixture records so they're identifiable and safe to bulk-delete, e.g. `name: 'E2E Test Discipline'` plus `deleteMany({ where: { name: { startsWith: 'E2E Test' } } })` in both `beforeAll` and `afterAll`.
- Access the shared Prisma client and app via `globalThis.prisma` and `globalThis.testContext` inside e2e specs — do not instantiate a new `PrismaService` or `AppModule` per e2e-spec file.
- Never call real SMTP/Stripe endpoints; rely on the existing `EmailConfirmationService` mock and mock other external services the same way when adding new ones.

## Commands

```bash
pnpm test              # unit tests
pnpm test:watch        # unit tests, watch mode
pnpm test:coverage     # unit tests with coverage
pnpm test:e2e          # integration/e2e tests
pnpm test:e2e:watch    # integration/e2e tests, watch mode
```

Run the focused spec/e2e-spec file(s) for the change first; before finishing a task, run both `pnpm test` and `pnpm test:e2e` in full.
