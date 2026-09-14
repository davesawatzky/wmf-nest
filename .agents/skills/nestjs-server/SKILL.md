---
name: nestjs-server
description: Use when writing or extending NestJS server applications, modules, services, controllers, GraphQL resolvers, Prisma-backed APIs, authentication, authorization, validation, testing, or request-scoped DataLoaders. Follow this skill for NestJS architecture, error handling, security, and verification workflows.
license: UNLICENSED
metadata:
  author: wmf-nest
  version: '1.0.0'
---

# NestJS Server Applications

A practical workflow for building maintainable NestJS backend features. Apply the repository's existing conventions before introducing new abstractions. In this workspace, also follow `.github/copilot-instructions.md` and nearby module implementations.

## When to Apply

Use this skill when:

- Creating or extending a NestJS module, service, resolver, controller, guard, pipe, or provider
- Adding a GraphQL query, mutation, entity, payload, or field resolver
- Connecting application behavior to Prisma or another persistence layer
- Implementing authentication, CASL authorization, validation, logging, or email/payment integrations
- Fixing an N+1 query problem with a request-scoped DataLoader
- Adding unit or end-to-end coverage for a server feature

Do not use it for frontend-only work, Prisma CLI operations, or generic TypeScript questions unless the task also changes NestJS server behavior.

## Delivery Workflow

### 1. Establish the local contract

Before editing:

1. Locate the owning module, nearest service/resolver/controller, and a neighboring test.
2. Read the entity, input, payload, Prisma model, and module registration involved in the change.
3. Identify whether the behavior is a read, mutation, field resolver, background integration, or transport concern.
4. State one local hypothesis about the behavior and one focused check that could disprove it.
5. Preserve existing public APIs and naming unless the request requires a contract change.

Prefer the smallest module-local change. Step to a more direct abstraction only when the starting file merely forwards or registers behavior.

### 2. Choose the transport pattern

For GraphQL:

- Use `@Resolver(() => Entity)` and keep top-level queries and mutations in the resolver.
- Add `@UseGuards(JwtAuthGuard)` at resolver class level.
- If a resolver must expose a public operation, either place the public operation in a separate unguarded resolver or apply the repository's established public-access mechanism (e.g. a `@Public()` decorator) to that method only; never remove the class-level guard from a resolver that also contains protected operations.
- Protect operations with `@CheckAbilities({ action, subject })` and `AbilitiesGuard` where required.
- Model mutations with an `@ObjectType()` payload containing `userErrors` and a nullable result entity.
- Keep field resolvers focused on relationship resolution; use DataLoader for list results.

For REST:

- Keep controllers thin: parse transport input, delegate to a service, and return the service result.
- Use DTOs with `class-validator` for request validation.
- Apply authentication and authorization guards at the narrowest appropriate scope.
- Preserve consistent HTTP exception behavior and response shapes used by neighboring controllers.

### 3. Implement service behavior

Every service class should have a logger named after the service:

```typescript
private readonly logger = new Logger(ServiceName.name)
```

For read operations:

- Reject missing identifiers with `BadRequestException`.
- Throw `NotFoundException` when a required record does not exist.
- Preserve intentional NestJS exceptions while translating unexpected failures to `InternalServerErrorException`.
- Log successful retrievals and unexpected failures with useful identifiers.

For mutations:

- Return `{ userErrors, record }` or the established GraphQL payload shape.
- Return an empty `userErrors` array on success.
- Map expected Prisma failures such as `P2002` uniqueness conflicts, `P2003` foreign-key failures, and `P2025` missing records to actionable user errors.
- Keep the record nullable when the operation fails; do not return partially written data.
- Use a transaction when multiple writes must succeed or fail together.

Use absolute `@/` imports where the project supports them. Avoid putting authorization, transport formatting, or unrelated persistence logic into the service.

Example mutation service shape:

```typescript
async create(input: CreateEntityInput) {
  try {
    const record = await this.prisma.tbl_entity.create({ data: input })
    this.logger.log(`Successfully created record ID: ${record.id}`)
    return { userErrors: [], entity: record }
  } catch (error: any) {
    this.logger.error(`Failed to create entity: ${error.message}`, error.stack)

    if (error.code === 'P2002') {
      return { userErrors: [{ message: 'Entity already exists', field: ['name'] }], entity: null }
    }

    return { userErrors: [{ message: 'Cannot create entity', field: [] }], entity: null }
  }
}
```

### 4. Handle relationships without N+1 queries

When a GraphQL field resolver loads related records for a list of parents:

1. Create or reuse a request-scoped provider with `@Injectable({ scope: Scope.REQUEST })`.
2. Batch IDs into one or a small number of Prisma queries.
3. Group one-to-many results by parent ID.
4. Return results in exactly the same order as the input IDs.
5. Return `null` for missing singular relations and `[]` for missing collection relations.
6. Deduplicate indirect many-to-many results.
7. Log batch size, result count, and duration at appropriate levels.
8. Remove service dependencies that were only used by the field resolver.

Do not use DataLoader for top-level queries, scalar fields, or relationships already loaded by the owning query.

Example request-scoped one-to-one loader:

```typescript
@Injectable({ scope: Scope.REQUEST })
export class EntityDataLoader {
  constructor(private readonly prisma: PrismaService) {}

  public readonly ownerLoader = new DataLoader<number, User | null>(async (ids) => {
    const owners = await this.prisma.tbl_user.findMany({ where: { id: { in: [...ids] } } })
    const ownersById = new Map(owners.map((owner) => [owner.id, owner]))
    return ids.map((id) => ownersById.get(id) ?? null)
  })
}
```

### 5. Apply security and validation

- Require authentication for protected operations.
- Enforce authorization at the resolver/controller boundary and do not rely only on client-side visibility.
- Validate input before persistence and reject impossible domain states explicitly.
- Never log passwords, tokens, cookies, payment secrets, or complete personal data.
- Keep JWTs in the established HTTP-only cookie flow when working in this repository.
- Use configuration services and environment variables for secrets and external service settings.
- Treat webhook signatures, email tokens, and payment identifiers as security-sensitive inputs.

When changing registration behavior, preserve the domain invariants implemented in the submissions/festival modules (e.g. `src/submissions/registration/`, `src/submissions/performer/`, `src/submissions/selection/`, `src/festival/festival-class/`): a registration's performer type must match its selections, selected classes must be eligible for the performer type, selection counts must respect the class limits, pricing must follow the existing pricing service, and related records must remain referentially consistent. Read those implementations before modifying related code.

### 6. Register the feature completely

When adding a provider or resolver, update the owning module's `providers`, `imports`, `exports`, and GraphQL/entity registrations as needed. Check that:

- The provider can be constructed by Nest's dependency injection container.
- Request-scoped providers are not accidentally used from incompatible singleton contexts.
- New entities, inputs, enums, and payloads are discoverable by the GraphQL schema generation process.
- New persistence fields have the required Prisma schema and migration changes.
- Existing module boundaries remain intact.

### 7. Test the behavior

Add or update focused tests at the same layer as the change.

Unit tests should cover:

- Successful behavior and returned shape
- Missing or invalid input
- Not-found behavior for reads
- Expected Prisma error mappings for mutations
- Authorization decisions where guards or abilities are part of the feature
- Relationship ordering and null/empty handling for DataLoaders

End-to-end GraphQL tests in this repository should use `testWithBothRoles`:

- Read operations should verify both admin and user access where applicable.
- Write operations should verify admin success and user denial.
- Type GraphQL responses explicitly.
- Clean up test records in `afterAll` or `afterEach`.
- Use the shared authenticated request helpers instead of hand-built authentication state.

Do not weaken tests merely to make an implementation pass. If a test exposes an unrelated pre-existing failure, report it separately.

### 8. Validate in increasing scope

After the first edit, run the cheapest focused check available:

1. The relevant unit or integration test
2. A narrow TypeScript, lint, or schema-generation check
3. The module or package test suite
4. The full build or test suite only when the change has wider impact

For this workspace, useful commands include:

```bash
pnpm test -- path/to/relevant.spec.ts
pnpm test:e2e -- path/to/relevant.e2e-spec.ts
pnpm format:check
pnpm build
```

Use the repository's actual script and test configuration. Report what was run, what passed, and any environmental blocker such as a missing database or service.

## Completion Checklist

Before finishing, confirm:

- The owning module registers every new provider and dependency.
- Authentication and authorization match neighboring operations.
- Reads throw appropriate NestJS exceptions; mutations return the established payload shape.
- Prisma and external integration errors are handled without leaking sensitive details.
- GraphQL field resolvers do not introduce an avoidable N+1 query pattern.
- Inputs and domain invariants are validated before writes.
- Focused tests cover success, failure, and authorization behavior.
- Formatting, type checking, schema generation, or focused tests were run where available.
- The final summary names changed files, validation performed, and any remaining risk.
