# General Vitest & NestJS Testing Concepts

Background reference for the underlying Vitest and `@nestjs/testing` APIs. The main [SKILL.md](../SKILL.md) describes this project's actual conventions — use this file when you need to know *how* an underlying API behaves (mock lifecycle, override methods, coverage) rather than *what pattern* to follow.

## Vitest mock/spy APIs

- `vi.fn(implementation?)` — creates a standalone mock function. Without an implementation it returns `undefined` when called.
- `vi.spyOn(object, 'method')` — wraps an existing method on an object/class instance, keeping the original implementation unless you chain `.mockImplementation()` / `.mockReturnValue()` / `.mockResolvedValue()`. Use this for `PrismaService` methods and other real service methods in this project's unit tests (e.g. `prisma.tbl_user.findUnique = vi.fn().mockResolvedValue(...)` is equivalent to a direct assignment, but `vi.spyOn` is preferred when you need to restore the original afterward).
- `vi.mock('./module.js', factory?)` — replaces an entire module's exports for every import in the file. Hoisted to the top of the file automatically, so it runs before any `import` statements. Don't reference outer-scope variables inside the factory unless declared via `vi.hoisted()`.
- `vi.mocked(fn)` — type-only helper for TypeScript; makes the compiler treat an imported function as a `Mock`.
- Mock cleanup methods, called in `afterEach` or via config:
  - `mockClear()` / `vi.clearAllMocks()` — clears call history only.
  - `mockReset()` / `vi.resetAllMocks()` — clears history **and** removes any custom implementation.
  - `mockRestore()` / `vi.restoreAllMocks()` — only applies to `vi.spyOn` mocks; restores the original method implementation entirely.
- Config equivalents: `test.clearMocks`, `test.mockReset`, `test.restoreMocks` in `vitest.config.mts` apply the corresponding cleanup automatically before each test. This project does not set these, so tests must build fresh `TestingModule`s per `beforeEach` (see SKILL.md) or manually reset mocks.

## Fake timers

`vi.useFakeTimers()` mocks `setTimeout`, `setInterval`, and `Date`. Advance time with `vi.advanceTimersByTime(ms)` or `vi.runAllTimers()`, and restore with `vi.useRealTimers()`. Use `vi.setSystemTime(date)` to freeze `Date.now()` for token-expiry or scheduling tests without mocking all timers.

## Hooks and execution order

`beforeAll` → (`beforeEach` → test → `afterEach`)* → `afterAll`, per `describe` block, outer-to-inner for `beforeAll`/`beforeEach` and inner-to-outer for `afterEach`/`afterAll`. All are imported explicitly from `'vitest'` in this project (`globals: false`).

## `@nestjs/testing` module building

- `Test.createTestingModule({ providers, controllers, imports }).compile()` returns a `TestingModule` that mimics a real Nest DI container. `moduleRef.get(Token)` retrieves a static (singleton-scoped) instance.
- `moduleRef.resolve(Token)` retrieves request/transient-scoped providers; each call returns a new instance from its own DI sub-tree. Needed for testing request-scoped `DataLoader` providers directly (rare in this project — e2e tests exercise these through real GraphQL requests instead).
- `useMocker((token) => mockImpl)` — auto-mocks any provider not explicitly listed, useful for controllers/resolvers with many dependencies you don't want to hand-provide. Prefer explicit providers per this project's SKILL.md guidance unless a class has an unusually large dependency graph.
- Override methods (unit or e2e), all chainable before `.compile()`:
  - `overrideProvider(Token).useValue(...)` / `.useClass(...)` / `.useFactory(...)`
  - `overrideGuard(Guard).useValue(...)` / `.useClass(...)`
  - `overrideInterceptor(...)`, `overrideFilter(...)`, `overridePipe(...)`
  - `overrideModule(Module).useModule(AlternateModule)`
  - Globally-registered enhancers (e.g. an `APP_GUARD` provider) can only be overridden if registered with `useExisting` instead of `useClass` — otherwise Nest can't resolve the token to swap it.
- `moduleRef.createNestApplication()` + `await app.init()` boots a full Nest runtime (needed for e2e tests that go through HTTP/GraphQL); `moduleRef.get()`/`.compile()` alone is enough for unit tests that only need DI-resolved instances.

## Coverage

- `pnpm test:coverage` runs with `--coverage`; provider defaults to V8 (`@vitest/coverage-v8`), which requires no source pre-instrumentation and is generally faster than the `istanbul` provider.
- Configure `coverage.include` / `coverage.exclude` in `vitest.config.mts` to control which source files appear in the report (only imported-during-test files show by default).
- Ignore specific lines from coverage with `/* v8 ignore next */` or `/* v8 ignore start -- @preserve */` ... `/* v8 ignore stop -- @preserve */` comments — add `-- @preserve` so `esbuild` doesn't strip the comment before Vitest can read it.

## Further reading

- [Vitest mocking guide](https://vitest.dev/guide/mocking.html)
- [Vitest `vi` API reference](https://vitest.dev/api/vi.html)
- [Vitest coverage guide](https://vitest.dev/guide/coverage.html)
- [NestJS testing fundamentals](https://docs.nestjs.com/fundamentals/testing)
