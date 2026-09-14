# Winnipeg Music Festival NestJS Backend

## Project Context

This workspace is a NestJS GraphQL backend for the Winnipeg Music Festival registration system. It uses PostgreSQL through Prisma and integrates authentication, CASL authorization, email, Stripe payments, and registration workflows.

Use the on-demand skills for detailed workflows:

- `nestjs-server`: NestJS architecture, GraphQL and REST patterns, errors, security, DataLoader, testing, and validation.
- `wmf-festival-domain`: festival hierarchy, performer types, registration invariants, class eligibility, selections, pricing, and relationships.
- `wmf-email-integration`: SMTP, email confirmation, password reset, JWT email tokens, and Handlebars/MJML templates.

## Always-On Project Rules

### Imports and structure

- Use absolute imports with the `@/` prefix.
- Keep code within the existing module boundaries: festival, submissions, auth/abilities, email, payment, and system modules.
- Preserve existing public APIs, GraphQL names, database names, and response shapes unless the task requires a contract change.
- Every service must have `private readonly logger = new Logger(ServiceName.name)`.

### GraphQL and authorization

- All resolvers use `@UseGuards(JwtAuthGuard)` at class level.
- Use CASL abilities with `AbilitiesGuard` and `@CheckAbilities` for protected operations.
- Use the established GraphQL payload pattern: `userErrors: UserError[]` plus a nullable entity for mutations.
- Keep top-level queries and mutations in resolvers; keep persistence and business rules in services.
- Use request-scoped DataLoaders for relationship field resolvers that would otherwise create N+1 queries. Follow the `nestjs-server` skill for batching, ordering, null handling, and deduplication.

### Persistence and errors

- Read operations throw appropriate NestJS exceptions: `BadRequestException`, `NotFoundException`, or `InternalServerErrorException`.
- Mutation operations return the established payload shape instead of exposing raw persistence exceptions.
- Handle relevant Prisma errors, especially `P2002` uniqueness conflicts, `P2003` foreign-key failures, and `P2025` missing records.
- Use transactions when related writes must succeed or fail together.
- Never log passwords, JWTs, cookies, SMTP credentials, payment secrets, or unnecessary personal data.

### Security and configuration

- JWT authentication uses the HTTP-only `diatonicToken` cookie flow.
- Keep secrets and external service settings in environment-backed configuration.
- Preserve Helmet, CORS, validation, and GraphQL middleware behavior when changing application bootstrap.
- Do not weaken authorization or validation to make a test pass.

## Testing Contract

- The project uses Vitest for unit and E2E tests.
- E2E tests must use `testWithBothRoles` from `src/test/testHelpers.ts` when authorization is relevant.
- Read tests should verify the roles that are expected to read; write tests should verify admin success and user denial where that is the project policy.
- Type GraphQL responses explicitly and use the shared authenticated request helpers.
- Isolate test data with `beforeAll`/`afterAll` or `beforeEach`/`afterEach`; clean up created records.
- Mock email delivery and external services in tests.
- Prefer focused tests first, then formatting, type/schema generation, build, or broader suites as the change warrants.

## Commands

```bash
pnpm start:dev
pnpm build
pnpm format:check
pnpm test
pnpm test:e2e
pnpm migrate:dev
pnpm seed:dev
pnpm prisma:generate
```

Environment files are `.env.development`, `.env.test`, and `.env.production`. Database access is configured through the repository's dotenvx and Prisma setup.

When a task touches a specialized area, load the relevant skill before editing and follow the nearby implementation and tests as the final local authority.
