# E2E-Specific NestJS Testing Utilities

Reference for the NestJS/Vitest machinery that powers this project's `*.e2e-spec.ts` suite. See [SKILL.md](../SKILL.md) for the conventions to follow when *writing* e2e tests; this file explains how the shared infrastructure underneath those conventions works.

## Two-phase e2e bootstrap

The e2e config ([vitest.config.e2e.mts](../../../../vitest.config.e2e.mts)) wires two distinct lifecycle hooks, run in this order:

1. **`globalSetup`** — [globalSetup_e2e.ts](../../../../src/test/globalSetup_e2e.ts), runs exactly once for the whole process (not per file, not per worker). It builds its own throwaway `TestingModule`/`INestApplication` from `AppModule`, uses the real `AuthService` to seed persistent `admin`/`user` accounts in the test database, then closes that app. `teardown()` deletes those users at the very end of the run.
2. **`setupFiles`** — [integrationTestSetup.ts](../../../../src/test/integrationTestSetup.ts), runs once before the shared test run (`isolate: false` + `fileParallelism: false` in the config means all `*.e2e-spec.ts` files share one worker and one `beforeAll`/`afterAll`). It builds the *real* app used by every test via `overrideProvider(EmailConfirmationService).useValue(mockEmailConfirmationService)`, applies the same middleware as `main.ts` (`cookie-parser`, `helmet`, CORS, global `ValidationPipe`), calls `app.init()`, and stores `globalThis.httpServer`, `globalThis.prisma`, and `globalThis.testContext` (JWTs signed directly via `JwtService`, bypassing the login mutation for speed).

Because `isolate: false` shares one process across every e2e-spec file, never mutate shared singletons like `globalThis.prisma` or call `app.close()` from within an individual spec — only the global `afterAll` in `integrationTestSetup.ts` does that.

## `overrideProvider` for external services

`Test.createTestingModule({ imports: [AppModule] }).overrideProvider(Token).useValue(mock).compile()` swaps a single provider's implementation while keeping the rest of `AppModule`'s real DI graph (guards, resolvers, Prisma, other services) intact. This project uses it once, centrally, for `EmailConfirmationService` — do not re-mock it per spec file. If a new spec needs to stub a different external integration (e.g. Stripe), follow the same pattern:

```typescript
export function createMockStripeService(): Partial<StripeService> {
  return {
    createPaymentIntent: vi.fn().mockResolvedValue({ id: 'pi_test', client_secret: 'secret' }),
  }
}
```

then add `.overrideProvider(StripeService).useValue(createMockStripeService())` alongside the existing `EmailConfirmationService` override in `integrationTestSetup.ts` — don't create a second, competing `TestingModule` in a spec file, since the app is shared.

For a globally-registered enhancer (an `APP_GUARD`/`APP_INTERCEPTOR`/`APP_FILTER` multi-provider), `overrideProvider` only works if that enhancer was registered with `useExisting` rather than `useClass` in its module; check the target module's providers array before assuming an override will take effect.

## Driving requests through the shared app

- `globalThis.httpServer` is the raw HTTP server (`app.getHttpServer()`) from the one shared `INestApplication`. [testHelpers.ts](../../../../src/test/testHelpers.ts)'s `createAuthenticatedRequest(role)` wraps it with `supertest-graphql`'s `request<T>(httpServer)` and attaches the `diatonicToken` cookie for the given role — this is the only supported way to issue GraphQL operations in e2e specs.
- Because auth here is cookie-based, requests never go through a real `/auth/login` mutation in tests; tokens are minted directly with `JwtService.sign()` in `integrationTestSetup.ts`, which is faster and avoids coupling every e2e run to the login flow.
- `expectAuthorized`/`expectUnauthorized` in `testHelpers.ts` assert on top-level GraphQL `errors`, which is what `JwtAuthGuard`/`AbilitiesGuard` failures surface as — this is distinct from the `userErrors` payload pattern used for domain-rule mutation failures (see SKILL.md).

## Extending shared setup vs. per-spec setup

- Add to `integrationTestSetup.ts` only for infrastructure every spec needs (a new global mock, new middleware). Keep it minimal — it runs for the entire suite.
- Add to a spec file's own `beforeAll`/`afterAll` for anything scoped to that file's fixtures (records, `privateTeacher`/`schoolTeacher` accounts created via `AuthService.signup` directly against `globalThis.prisma`).
- Never call `app.init()`, build a new `TestingModule`, or import `AppModule` inside an individual `*.e2e-spec.ts` file — the shared app from `integrationTestSetup.ts` already exists on `globalThis` by the time specs run.

## Further reading

- [NestJS end-to-end testing docs](https://docs.nestjs.com/fundamentals/testing#end-to-end-testing) — `overrideProvider`/`overrideGuard`/`overrideModule`, `createNestApplication()`, request-scoped provider resolution via `ContextIdFactory`.
- [Vitest `globalSetup` config](https://vitest.dev/config/#globalsetup) and [`setupFiles` config](https://vitest.dev/config/#setupfiles) for the distinction this project relies on.
