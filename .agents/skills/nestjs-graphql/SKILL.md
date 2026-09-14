---
name: nestjs-graphql
description: Use when creating or changing NestJS GraphQL APIs, code-first entities, input types, enums, payloads, resolvers, field resolvers, schema generation, GraphQL metadata, or GraphQL tests. Covers how NestJS decorators become the GraphQL type system.
license: UNLICENSED
metadata:
  author: wmf-nest
  version: '1.0.0'
---

# NestJS GraphQL and Schema Design

Use this skill for GraphQL-specific work in NestJS. Combine it with `nestjs-server` for module structure, service behavior, authorization, DataLoader, testing, and validation. In this workspace, the source of truth is the nearby resolver/entity implementation plus the generated `src/schema.gql`.

## Code-first model

NestJS GraphQL code-first APIs define the GraphQL schema from TypeScript classes and decorators. The decorators provide runtime metadata that Nest uses to generate GraphQL object types, input types, fields, arguments, enums, queries, mutations, and field resolvers.

The main mapping is:

| NestJS code                   | GraphQL schema                   |
| ----------------------------- | -------------------------------- |
| `@ObjectType()` class         | `type`                           |
| `@InputType()` class          | `input`                          |
| `@ArgsType()` class           | reusable argument object         |
| `@Field(() => Type)`          | field on an object or input      |
| `@Query(() => Type)`          | root `Query` field               |
| `@Mutation(() => Type)`       | root `Mutation` field            |
| `@ResolveField(() => Type)`   | field resolver on an object type |
| `registerEnumType(Enum, ...)` | GraphQL `enum`                   |
| `nullable: true`              | nullable field or argument       |
| `() => [Type]`                | list of `Type`                   |

TypeScript reflection cannot reliably infer every GraphQL type. Be explicit for integers, enums, lists, nullable values, unions, interfaces, and circular relationships.

## Configure schema generation

The application configures the Apollo driver with code-first schema generation:

```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  buildSchemaOptions: { numberScalarMode: 'integer' },
})
```

In this repository:

- `src/schema.gql` is generated output; do not edit it manually.
- `src/metadata.ts` is generated metadata used during schema construction.
- `pnpm run generate:metadata` runs Nest’s type-check build and metadata sanitization.
- `pnpm start:dev` runs the metadata generation hook before watch mode.
- `pnpm build` regenerates Prisma, metadata, and the Nest build.

After changing GraphQL decorators, run `pnpm run generate:metadata` followed by `pnpm build` (do not use `pnpm start:dev`, which is a watch process) and then inspect the regenerated `src/schema.gql`.

## Define the GraphQL type system

### Object types

Use `@ObjectType()` for values returned by queries and mutations. Use explicit field factories when reflection is ambiguous or when the schema contract matters. This repository uses the NestJS GraphQL CLI plugin (via `generate:metadata`), so plain `string`/`boolean`/`Date` properties and `?` optional properties are inferred automatically. Add `@Field()` explicitly only for `Int`, enums, lists, unions, relationships, and any field whose nullability differs from its TypeScript optionality:

```typescript
@ObjectType()
export class Category {
  @Field(() => Int)
  id: number

  name: string
  description?: string
}
```

For nullable fields, declare GraphQL nullability explicitly. For lists, choose whether the list itself and its items are nullable:

```typescript
@ObjectType()
export class Registration {
  @Field(() => [Performer], { nullable: 'itemsAndList' })
  performers: Array<Performer | null>

  @Field(() => Teacher, { nullable: true })
  teacher?: Teacher | null
}
```

Use the repository’s established entity and payload naming. Do not expose Prisma models directly when an existing GraphQL entity defines the public contract.

### Inputs and payloads

Inputs are separate GraphQL types from output objects. Keep validation decorators on input classes and return the project’s payload shape for mutations:

```typescript
@InputType()
export class CategoryInput {
  @Field()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string
}

@ObjectType()
export class CategoryPayload {
  @Field(() => [UserError])
  userErrors: UserError[]

  @Field(() => Category, { nullable: true })
  category?: Category | null
}
```

A payload should make failure explicit: return `userErrors` and a nullable entity rather than leaking a persistence exception through the GraphQL response.

### Enums and scalars

Register TypeScript enums before using them in fields or arguments:

```typescript
export enum PerformerType {
  SOLO = 'SOLO',
  GROUP = 'GROUP',
  SCHOOL = 'SCHOOL',
  COMMUNITY = 'COMMUNITY',
}

registerEnumType(PerformerType, {
  name: 'PerformerType',
  description: 'SOLO, GROUP, SCHOOL, COMMUNITY',
})
```

Use `@Field(() => PerformerType)` for enum fields and `@Args('performerType', { type: () => PerformerType })` for enum arguments. Match the repository’s scalar configuration; this application uses integer number scalars and registers the Prisma Decimal resolver explicitly.

## Build resolvers

Resolvers define the GraphQL entry points and delegate business behavior to services. Keep authentication at class level and CASL checks at operation level:

```typescript
@Resolver(() => Category)
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Category })
  async categories(@Args('levelID', { type: () => Int, nullable: true }) levelID?: number) {
    return this.categoryService.findAll(levelID)
  }

  @Mutation(() => CategoryPayload)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Category })
  async categoryCreate(@Args('categoryInput') categoryInput: CategoryInput) {
    return this.categoryService.create(categoryInput)
  }
}
```

Rules:

- Use `@Resolver(() => Entity)` for the entity being returned or extended.
- Use explicit return factories for lists and nullable results.
- Keep queries and mutations thin; put persistence and domain rules in services.
- Use stable GraphQL names and argument names unless the contract intentionally changes.
- Do not add a resolver field without adding the corresponding return type to the schema through decorators.

## Field resolvers and relationships

Use `@ResolveField` for computed or relationship fields that are not loaded in the parent object. Use `@Parent()` to access the parent identifier and `@Args()` for field-specific filters:

```typescript
@ResolveField(() => [FestivalClass])
@UseGuards(AbilitiesGuard)
@CheckAbilities({ action: Action.Read, subject: FestivalClass })
async festivalClasses(
  @Parent() category: tbl_category,
  @Args('performerType', { type: () => PerformerType }) performerType: PerformerType,
  @Args('levelID', { type: () => Int }) levelID: number,
) {
  return this.festivalClassService.findAll(performerType, undefined, levelID, category.id)
}
```

For list queries, use the request-scoped DataLoader pattern from `nestjs-server` when a field resolver fetches related records. Preserve result ordering, return `null` for a missing singular object, return `[]` for a missing list, and avoid calling a separate service once per parent.

## Schema evolution workflow

When adding or changing a GraphQL field:

1. Find a neighboring entity, input, payload, resolver, and test.
2. Decide whether the change is an output field, input field, argument, root operation, enum, scalar, or relationship field.
3. Add the decorator and explicit type/nullability metadata.
4. Register enums or custom scalars if needed.
5. Add or update the resolver and service without changing unrelated schema names.
6. Update module providers/imports and metadata inputs if the project’s generator requires it.
7. Regenerate the schema through the repository command; never edit `src/schema.gql` by hand.
8. Verify the generated SDL and run focused GraphQL tests.

If a field is missing from the generated schema, check that its class is imported into the metadata graph, has the appropriate GraphQL decorator, and is reachable from a registered resolver or module.

## Testing examples

Type GraphQL responses explicitly and test authorization according to the repository contract:

```typescript
const response = (await createAuthenticatedRequest('admin')
  .mutate(gql`
    mutation CreateCategory($categoryInput: CategoryInput!) {
      categoryCreate(categoryInput: $categoryInput) {
        userErrors { message field }
        category { id name }
      }
    }
  `, { categoryInput: { name: 'Test category' } }) as {
    data?: { categoryCreate: CategoryPayload }
    errors?: readonly any[]
  }

expect(response.errors).toBeUndefined()
expect(response.data?.categoryCreate.userErrors).toHaveLength(0)
```

For authorization-sensitive E2E tests, use `testWithBothRoles`: queries should verify the roles allowed to read, while writes should verify admin success and user denial. Clean up created records and mock external services.

## Completion checklist

Before finishing GraphQL work, confirm:

- The generated SDL contains the intended type, field, argument, enum, scalar, nullability, and list shape.
- Inputs and outputs use distinct GraphQL types where appropriate.
- Resolver-level authentication and operation-level authorization are present.
- Services own persistence and domain logic; resolvers remain transport-focused.
- Relationship fields do not introduce an avoidable N+1 query pattern.
- GraphQL tests cover success, validation, nullability, and authorization behavior.
- `src/schema.gql` and generated metadata were refreshed through commands rather than manual edits.
